# Use an official Node.js image as a base
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the project
RUN npm run build

# Use a lightweight web server to serve the build files
FROM nginx:alpine

# Copy built frontend files to Nginx web server
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
