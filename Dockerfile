# Stage 1: Build and dependencies
FROM node:23.11-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Runtime
FROM node:23.11-alpine

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Create app directory and set permissions
WORKDIR /usr/src/app

# Create a non-root user and set ownership
# Fixed command syntax for Alpine Linux
RUN addgroup -S nodejs && \
    adduser -S nodejs -G nodejs && \
    chown -R nodejs:nodejs /usr/src/app

# Copy from builder stage
COPY --from=builder --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules

# Copy all project files explicitly ensuring docs directory is included
COPY --chown=nodejs:nodejs . .

# Expose API port
EXPOSE 3001

# Switch to non-root user
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost:3001/ || exit 1

# Command to run the application
CMD ["node", "src/api/index.js"]