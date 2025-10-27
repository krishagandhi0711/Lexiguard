# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built files from builder stage (use 'build' not 'dist')
COPY --from=builder /app/build ./build

# Expose port 8080 (Cloud Run default)
EXPOSE 8080

# Start the application
CMD ["serve", "-s", "build", "-l", "8080"]