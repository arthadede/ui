# Build stage for production
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the UI library
RUN npm run build

# Development stage with Storybook
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies including development ones
RUN npm ci

# Copy source code
COPY . .

# Expose port for Storybook
EXPOSE 6006

# Default command for development
CMD ["npm", "run", "storybook"]

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files and install production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Copy package.json for version info
COPY package.json ./

# Expose port for Storybook
EXPOSE 6006

# Default command
CMD ["echo", "Production image - use development image for Storybook"]