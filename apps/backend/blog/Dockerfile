FROM oven/bun:latest

WORKDIR /beingsofhabit

COPY . .

RUN cd apps/backend/blog
RUN bun install --frozen-lockfile

EXPOSE $PORT

WORKDIR /beingsofhabit/apps/backend/blog

CMD ["bun", "run", "start"]