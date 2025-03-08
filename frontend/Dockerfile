FROM node:20

# Set working directory
WORKDIR /app

# Set environment variables 
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the Next.js project
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]
