FROM node:18-alpine AS builder
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

# copy source, generate Prisma client, compile


# 1) copy your Prisma schema so `npx prisma generate` can see it
COPY prisma ./prisma
RUN npx prisma generate

# 2) copy TypeScript config and your application code
COPY tsconfig.json ./
COPY src ./src

# 3) compile to JavaScript
RUN npm run build


# stage 2: runtime
FROM node:18-alpine
WORKDIR /usr/src/app


# production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --production

COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# copy compiled app and prisma migrations
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

# copy entry point script
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

ENV NODE_ENV=production
EXPOSE 4000

ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD [ "node", "dist/index.js" ]