#!/usr/bin/env bash
# 包装：实际逻辑在 switch_dns.py（纯标准库，不依赖 jq）。
#   export CF_API_TOKEN=xxx            # 或写进 ~/.cf-token
#   ./deploy/switch-dns.sh --check  www paper
#   ./deploy/switch-dns.sh --to-oracle www paper
#   ./deploy/switch-dns.sh --rollback www paper
set -euo pipefail
exec python3 "$(cd "$(dirname "$0")" && pwd)/switch_dns.py" "$@"
