FROM node:18 AS frontend-builder
WORKDIR /app
COPY ../frontend .
RUN npm install && npm run build

FROM rustlang/rust:nightly AS builder
WORKDIR /app
COPY . .

RUN mkdir -p /app/www
COPY --from=frontend-builder /app/dist /app/www
RUN cargo build --release

FROM debian:bookworm-slim

RUN apt-get update && \
    apt-get install -y libssl3 ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/target/release/backend .
COPY --from=builder /app/www ./www

CMD ["./backend"]
