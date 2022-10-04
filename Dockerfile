# Install dependencies only when needed
FROM node:16-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
RUN apk add postgresql
WORKDIR /app

# Copy builded app
COPY --from=builder /app/.next ./.next

# Copy only necesary files to run the app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/public ./public

# Copy start script and make it an executable
COPY --from=builder /app/fly-io-start.sh ./
RUN chmod +x /app/fly-io-start.sh

ENV NODE_ENV production
ENV PORT 8080

CMD ["./fly-io-start.sh"]
