FROM oven/bun:latest

WORKDIR /beingsofhabit

RUN mkdir -p ./apps/backend/blog ./packages

COPY package.json bun.lockb ./
COPY ./apps/backend/blog/ ./apps/backend/blog/
COPY ./packages/ ./packages/

WORKDIR /beingsofhabit/apps/backend/blog

RUN bun install

EXPOSE $PORT

CMD ["bun", "run", "start"]