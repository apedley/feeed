FROM mhart/alpine-node:8

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# RUN apk add libxerces-c3.1
RUN apk update
RUN apk upgrade
RUN apk add libc6-compat

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 3000

ENV mongoConnection mongodb://database/docked-feeed

RUN npm run prestart

CMD ["npm", "run", "dev"]