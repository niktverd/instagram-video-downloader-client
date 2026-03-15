FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Vite requires port 3000
EXPOSE 3000

# Run Vite dev server bound to 0.0.0.0 so CapRover can route to it
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
