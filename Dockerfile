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
EXPOSE 3000

# Default command for development
CMD ["npm", "run", "storybook"]
