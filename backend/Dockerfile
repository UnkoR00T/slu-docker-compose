# Stage 1: Build frontend
FROM node:18 AS frontend-build
WORKDIR /app
COPY ./frontend ./frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Stage 2: Build backend
FROM rustlang/rust:nightly AS backend-build
WORKDIR /app
COPY ./backend ./backend
WORKDIR /app/backend
RUN cargo build --release

# Stage 3: Final image
FROM debian:bookworm-slim
RUN apt-get update && \
    apt-get install -y libssl3 ca-certificates && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=backend-build /app/backend/target/release/backend .
COPY --from=frontend-build /app/frontend/dist ./www
CMD ["./backend"]
