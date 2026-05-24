FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (caching layer)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 3001

# Run in development mode by default
CMD ["npm", "run", "dev"]
