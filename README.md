
# Tello Drone Web Controller
*Control a [Ryze Tech Tello](https://www.ryzerobotics.com/tello) drone from your browser!*

<kbd><img src="https://github.com/ynnckth/tello-drone-web-controller/raw/master/assets/tello.jpg" width="300"></kbd>

## Usage
Clone the repository and make sure you have Docker installed locally.
Run the following command to build the image:
> `docker-compose build`

> `docker-compose up`

Turn on the drone and connect to its Wifi. Go to the app at http://localhost:3001

<img src="https://github.com/ynnckth/tello-drone-web-controller/raw/master/assets/screenshot.png" width="800">

#### Development

Build the images (only needed initially since the node_modules folders are not mounted): 
> `docker-compose -f docker-compose-dev.yml build --parallel`

Start the backend server and the frontend client in live-reload (watch) mode:
> `docker-compose -f docker-compose-dev.yml up`

Navigate to the frontend live-reload server:
> http://localhost:3000

Editing any source files will live-reload the changes.


#### Local development (without Docker)

Start the **backend server** in live reload mode: 
> `cd backend && npm start`

The server will listen to websocket connections at:
> ws://localhost:3001

The video stream websocket is served at:
> ws://localhost:8083


Start the **frontend client** in live reload mode:
> `cd frontend && npm start` 

The frontend live reload server is served at:
> http://localhost:3000
