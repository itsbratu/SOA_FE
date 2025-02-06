FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Rebuild bcrypt specifically to ensure compatibility with the container's architecture
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application code
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the necessary port
EXPOSE 3001

# Run the application in production mode
CMD ["npm", "run", "start:prod"]
