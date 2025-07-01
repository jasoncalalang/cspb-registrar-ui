# Stage 1: build React app
# Use official Node.js 22 image for building
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Copy dependency manifests
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Run tests then build the application
RUN yarn test --run && yarn build

# Stage 2: serve with nginx
FROM nginx:alpine

# Copy built files to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose default nginx port
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
