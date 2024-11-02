# Step 1: Use a Node.js base image to build the React application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install Python and build dependencies for node-gyp
RUN apk add --no-cache python3 make g++ && \
    ln -sf python3 /usr/bin/python

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies (force installation to avoid dependency conflicts)
RUN npm install --force

# Copy the entire application to the container
COPY . .

# Build the React application for production
RUN npm run build

# Step 2: Use Nginx to serve the static files
FROM nginx:alpine

# Copy the build folder from the previous stage to the Nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]