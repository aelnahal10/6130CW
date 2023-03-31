# Choose the official Node.js LTS image as the base image
FROM node:lts

# Create a new directory for the application
WORKDIR /app

# Copy the package.json and package-lock.json files into the working directory
COPY package*.json ./

# Install the required npm packages
RUN npm ci

# Copy the index.js file into the working directory
COPY backend.js .

# Expose the port the application will run on
EXPOSE 3001

# Start the application
CMD ["node", "backend.js"]

