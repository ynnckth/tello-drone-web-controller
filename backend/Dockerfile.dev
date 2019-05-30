FROM jrottenberg/ffmpeg:3.3-alpine
FROM node:10

# copy ffmpeg bins from first image (needed for video stream)
COPY --from=0 / /

# create app directory
WORKDIR /usr/src/app

# install app dependencies (moves package.json and package-lock.json into the Workdir)
COPY package*.json ./

RUN npm install

COPY . .

# static frontend:          http://localhost:3001
# command and data socket:  ws://localhost:3001
EXPOSE 3001
# video stream socket (exposed to frontend client)
EXPOSE 8083

# drone command channel
EXPOSE 8889/udp
# drone response channel
EXPOSE 8001/udp
# drone telemetry channel
EXPOSE 8890/udp
# drone video stream channel
EXPOSE 11111/udp

CMD [ "npm", "run", "start" ]