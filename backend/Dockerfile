FROM node:20


# Set environment variables
ARG DATABASE_URL
ARG PORT
ENV DATABASE_URL=${DATABASE_URL}
ENV PORT=${PORT}

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .
COPY entrypoint.sh /entrypoint.sh

# Build the Nest.js project
RUN npx prisma generate
RUN npm run build

# Expose the port
EXPOSE 4000

# Start the backend server
ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "run", "start"]
