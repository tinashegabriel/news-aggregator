# Use an official Node.js runtime as a parent image
FROM node:18.16.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for efficient caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the entire app code AFTER dependencies are installed
COPY . .

# Ensure all dependencies are installed properly
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
