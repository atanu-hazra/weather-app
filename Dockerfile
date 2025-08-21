# Use a lightweight Node.js image as the base image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for efficient caching
COPY package.json package-lock.json ./

# Set build-time arguments
ARG VITE_WEATHER_API_KEY

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the Vite project (using build-time arguments if needed)
RUN npm run build

# Use Nginx to serve the build
FROM nginx:1.25-alpine AS production

# Set the working directory for Nginx
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static files
RUN rm -rf ./*

# Copy the built Vite app from the builder stage
COPY --from=builder /app/dist .

# Expose the port Nginx runs on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
