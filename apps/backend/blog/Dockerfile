FROM --platform=linux/amd64 oven/bun:latest

RUN apt-get update && apt-get install -y curl

WORKDIR /beingsofhabit

RUN mkdir -p ./apps/backend/blog ./packages

COPY package.json bun.lockb ./
COPY ./apps/backend/blog/ ./apps/backend/blog/
COPY ./packages/ ./packages/

WORKDIR /beingsofhabit/apps/backend/blog

RUN curl -o global-bundle.pem https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem

RUN bun install

EXPOSE $PORT

CMD ["bun", "run", "start"]