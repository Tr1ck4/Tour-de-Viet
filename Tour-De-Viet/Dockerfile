# Use the official Node.js image from the Docker Hub
FROM node:20.12.0

# Create and change to the app directory
WORKDIR /app

# Copy the package.json and package-lock.json files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Rebuild native modules to ensure they match the Docker environment
RUN npm rebuild

# Build the application (if applicable)
RUN npm run build

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
