# 构建上下文是仓库根（见 docker-compose.yml），因为要同时打包
# 站点侧的共用查询层 sites/draw/functions/_lib/draw-api.js
FROM node:20-alpine

WORKDIR /app

COPY deploy/api/server.js ./server.js
COPY sites/draw/functions/_lib/draw-api.js ./lib/draw-api.js

ENV NODE_ENV=production
EXPOSE 8801
CMD ["node", "server.js"]
