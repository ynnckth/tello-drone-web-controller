// @ts-ignore
import express, {NextFunction, Request, Response, Router} from 'express';
// @ts-ignore
import {default as http, Server} from 'http';

import {Socket} from 'socket.io';
import {getAppPort} from '../app-config';
import {Event} from '../Event';
import {getMockTelemetryEvent} from './Utils';
const WebSocket = require('ws');

const allowCorsRequests = (app: Router) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });
};

const createHttpServer = (app: any) => http.createServer(app);
const createSocket = (server: Server) => require('socket.io')(server);

const mockDroneTelemetryEvents = (socket: Socket) => {
  setInterval(() => socket.emit(Event.TELEMETRY_DATA, getMockTelemetryEvent()), 500);
};

const configureCommandAndTelemetrySocket = (io: Socket) => {
  io.on('connection', (socket: Socket) => {

    socket.on(Event.CONNECT, () => {
      mockDroneTelemetryEvents(socket);
      socket.emit(Event.CONNECTION_SUCCESSFUL);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket');
    });
  });
};

const configureVideoSocket = () => {
  const socketServer = new WebSocket.Server({port: 8083, perMessageDeflate: false});
  socketServer.on('connection', (socket: any) => {
    socket.on('close', (code: number, message: string) => {
      console.log('Disconnected from video socket');
    });
  });
};

const create = (port: number) => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));

  allowCorsRequests(app);

  const server = createHttpServer(app);
  const io = createSocket(server);
  configureCommandAndTelemetrySocket(io);
  configureVideoSocket();

  server.listen(port, () => {
    console.log('Server mock listening on port', port);
  });
};

export default create(getAppPort());