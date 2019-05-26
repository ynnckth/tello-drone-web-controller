
# Tello Drone Web Controller

## Development
Start the backend server in live reload mode: 
> `cd backend && npm start`

The server will listen to websocket connections at:
> ws://localhost:3001

The video stream websocket is served at:
> ws://localhost:8083


Start the frontend in live reload mode:
> `cd frontend && npm start` 

The frontend live reload server is served at:
> http://localhost:3000



TODO
####

* Fix video stream sizing (scaling)
* Get and display the telemetry, battery and temperature data
* Document data socket (where and how is it served)
* Get everything running with Docker (Compose)

(* Implement speed regulator)


## Run with docker
For a 'non-development' build, please simply run:
```
docker-compose build --parallel
docker-compose up
```

## Develop with docker
For a 'development' build (live reloading), please simply run:
```
docker-compose -f docker-compose-reload.yml build --parallel
docker-compose -f docker-compose-reload.yml up
```

When you modify the `package.json`, you will need to re-build the docker files, as the `node_modules/` folder is not mounted as volume into the docker image.