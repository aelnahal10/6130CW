#choose the official Node.js LTS image as the base image
FROM node:16 AS build

# Create a new directory for the application
WORKDIR /app

# Copy the package.json and package-lock.json files into the working directory
COPY package*.json ./

# Install the required npm packages
RUN npm ci

# Copy the rest of the application files into the working directory
COPY Voucherform.js src/
COPY app.js src/

RUN mkdir -p  public
RUN mkdir -p  src
COPY index.html public/
COPY index.js src/

# Build the React application
RUN npm run build

# Use an Nginx image for serving the built React app
FROM nginx:stable-alpine

# Copy the built React app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the application will run on (default Nginx port)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

