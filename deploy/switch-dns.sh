#!/usr/bin/env bash
# 把 btchao.com 的分站从 Cloudflare Pages 切到甲骨文源站（或切回来）。
#
#   export CF_API_TOKEN=xxx          # 权限只要 Zone.DNS:Edit（btchao.com 这一条）
#   ./deploy/switch-dns.sh --check  www paper          # 只看现状，不改
#   ./deploy/switch-dns.sh --to-oracle www paper       # 切到甲骨文
#   ./deploy/switch-dns.sh --rollback www paper        # 切回原来的 CNAME
#
# 每次切换前会把原记录存进 deploy/.dns-backup.json（已在 .gitignore），
# 所以 --rollback 不依赖 Pages 那边还记着旧值。
set -euo pipefail

ZONE_NAME="${CF_ZONE_NAME:-btchao.com}"
ORACLE_IP="${ORACLE_IP:-167.234.216.40}"
API="https://api.cloudflare.com/client/v4"
BACKUP="$(cd "$(dirname "$0")" && pwd)/.dns-backup.json"

say() { printf '\033[36m[dns]\033[0m %s\n' "$*"; }
die() { printf '\033[31m[dns] %s\033[0m\n' "$*" >&2; exit 1; }

[ -n "${CF_API_TOKEN:-}" ] || die "先 export CF_API_TOKEN=...（Zone.DNS:Edit 权限即可）"
command -v jq >/dev/null || die "需要 jq：brew install jq"

cf() { # cf METHOD PATH [BODY]
  local method="$1" path="$2" body="${3:-}"
  if [ -n "$body" ]; then
    curl -sS -X "$method" -H "Authorization: Bearer $CF_API_TOKEN" \
      -H "Content-Type: application/json" --data "$body" "$API$path"
  else
    curl -sS -X "$method" -H "Authorization: Bearer $CF_API_TOKEN" "$API$path"
  fi
}

ZONE_ID="$(cf GET "/zones?name=$ZONE_NAME" | jq -r '.result[0].id // empty')"
[ -n "$ZONE_ID" ] || die "找不到 zone $ZONE_NAME（token 权限或拼写）"

record_of() { # record_of <fqdn> → 返回 0 条/1 条记录的 JSON
  cf GET "/zones/$ZONE_ID/dns_records?name=$1" | jq -c '.result'
}

backup_add() { # backup_add <fqdn> <record-json>
  local fqdn="$1" rec="$2"
  python3 - "$BACKUP" "$fqdn" "$rec" <<'PY'
import json, os, sys
path, fqdn, rec = sys.argv[1], sys.argv[2], json.loads(sys.argv[3])
data = {}
if os.path.exists(path):
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
data.setdefault(fqdn, {
    "id": rec["id"], "type": rec["type"], "content": rec["content"],
    "proxied": rec.get("proxied", False), "ttl": rec.get("ttl", 1),
})
with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
PY
}

MODE="${1:-}"
shift || true
NAMES=("$@")
[ ${#NAMES[@]} -gt 0 ] || die "用法：$0 --check|--to-oracle|--rollback <子域名...>（不带 .btchao.com）"

for n in "${NAMES[@]}"; do
  fqdn="$n.$ZONE_NAME"
  cur="$(record_of "$fqdn")"
  cnt="$(printf '%s' "$cur" | jq 'length')"

  case "$MODE" in
    --check)
      if [ "$cnt" = "0" ]; then
        say "$fqdn  没有记录"
      else
        printf '%s' "$cur" | jq -r --arg f "$fqdn" '.[] | "[dns] \($f)  \(.type) \(.content) proxied=\(.proxied)"'
      fi
      ;;
    --to-oracle)
      [ "$cnt" = "1" ] || die "$fqdn 有 $cnt 条记录，先手动收敛到 1 条"
      rid="$(printf '%s' "$cur" | jq -r '.[0].id')"
      cur_type="$(printf '%s' "$cur" | jq -r '.[0].type')"
      cur_content="$(printf '%s' "$cur" | jq -r '.[0].content')"
      if [ "$cur_type" = "A" ] && [ "$cur_content" = "$ORACLE_IP" ]; then
        say "$fqdn  已经是 $ORACLE_IP，跳过"
        continue
      fi
      backup_add "$fqdn" "$(printf '%s' "$cur" | jq -c '.[0]')"
      body="$(jq -n --arg n "$fqdn" --arg ip "$ORACLE_IP" \
        '{type:"A", name:$n, content:$ip, proxied:true, ttl:1, comment:"btchao-mono 自托管（甲骨文）"}')"
      cf PATCH "/zones/$ZONE_ID/dns_records/$rid" "$body" | jq -e '.success' >/dev/null \
        && say "$fqdn  →  $ORACLE_IP（橙云），原值已备份"
      ;;
    --rollback)
      [ -f "$BACKUP" ] || die "没有备份文件 $BACKUP"
      saved="$(jq -c --arg n "$fqdn" '.[$n] // empty' "$BACKUP")"
      [ -n "$saved" ] || die "$fqdn 不在备份里"
      body="$(printf '%s' "$saved" | jq -c '{type, content, proxied, ttl}')"
      cf PUT "/zones/$ZONE_ID/dns_records/$(printf '%s' "$saved" | jq -r '.id')" \
        "$(printf '%s' "$body" | jq -c --arg n "$fqdn" '. + {name:$n}')" | jq -e '.success' >/dev/null \
        && say "$fqdn  已回滚到 $(printf '%s' "$saved" | jq -r '.type + " " + .content')"
      ;;
    *)
      die "未知模式 $MODE（--check / --to-oracle / --rollback）"
      ;;
  esac
done

if [ "$MODE" != "--check" ]; then
  say "生效后验证：curl -sI https://${NAMES[0]}.$ZONE_NAME/ 的 server / cf-ray 会有变化；源站日志在 /opt/1panel/apps/openresty/openresty/log/access.log"
fi
