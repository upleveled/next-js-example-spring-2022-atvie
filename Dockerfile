# Install dependencies and build app
FROM node:alpine3.16 AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
ENV NODE_ENV production
RUN yarn install --frozen-lockfile
RUN yarn build

# Initialize production layer
FROM node:alpine3.16 AS runner
RUN apk add postgresql
WORKDIR /app

# Copy built app
COPY --from=builder /app/.next ./.next

# Copy only necessary files to run the app to minimize production app size and improve performance
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/public ./public

# Copy start script and make it executable
COPY --from=builder /app/scripts/fly-io-start.sh ./
RUN chmod +x /app/fly-io-start.sh

ENV NODE_ENV production
ENV PORT 8080

CMD ["./fly-io-start.sh"]
