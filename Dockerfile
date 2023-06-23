# Use a base image with Node.js pre-installed
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY . .

COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build NestJS app
RUN npm run build

# Expose port 3000 for the app
EXPOSE 3000

# Start the Node.js app
CMD ["npm", "start"]
