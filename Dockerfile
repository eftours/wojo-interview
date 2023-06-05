FROM library/node:16-alpine
USER root
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm pkg delete scripts.prepare
RUN npm ci --omit=dev

COPY . .

CMD ["node_modules/.bin/ts-node", "-r", "tsconfig-paths/register", "-T", "src/main.ts"]