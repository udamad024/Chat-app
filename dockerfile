# Use the official Node.js image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies for the root directory
RUN npm install

# Copy the .env file from the root directory to the working directory
COPY .env ./

# Copy the entire frontend directory to the working directory
COPY frontend ./frontend

# Change directory to the frontend
WORKDIR /app/frontend

# Install frontend dependencies
RUN npm install

# Build the frontend
RUN npm run build

# Change directory back to the root
WORKDIR /app

# Copy the entire backend directory to the working directory
COPY backend ./backend

# Expose the port on which the server will run
EXPOSE 8000

# Command to run the server
CMD ["npm", "start"]