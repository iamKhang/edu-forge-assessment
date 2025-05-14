# Builder stage
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema and generate client with minimal memory usage
COPY prisma ./prisma/
RUN NODE_OPTIONS="--max_old_space_size=512" npx prisma generate

# Copy source code and build application
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Install necessary packages including npm
RUN apk update && \
    apk add --no-cache \
    postgresql-client

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
# Skip husky install and only install production dependencies
RUN npm pkg delete scripts.prepare && \
    npm ci --omit=dev --ignore-scripts

# Copy Prisma schema and essential files only
COPY prisma ./prisma/
COPY --from=build-stage /app/node_modules/.prisma ./node_modules/.prisma

# Copy built application from builder
COPY --from=build-stage /app/dist ./dist

# Set Node.js memory limits
ENV NODE_OPTIONS="--max_old_space_size=512"

# Expose port and define runtime command
EXPOSE 3005
# Start application
CMD ["node", "dist/src/main.js"]