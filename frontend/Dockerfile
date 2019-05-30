FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies (moves package.json and package-lock.json into the workdir)
COPY package*.json ./

RUN npm install

COPY . .

# live reload development (watch) server
EXPOSE 3000

CMD [ "npm", "run", "start" ]