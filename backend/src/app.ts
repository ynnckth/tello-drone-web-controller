// @ts-ignore
import express, { NextFunction, Request, Response, Router} from 'express';
// @ts-ignore
import morgan from 'morgan';
import * as path from 'path';
import logger from './util/logging/logger';
// @ts-ignore
import {default as http, Server} from 'http';
import DroneController from './DroneController';

import {Socket} from 'socket.io';
import CommandHandler from './CommandHandler';
import {getAppPort, getVideoForwardPort, getVideoSocketPort} from './app-config';
import createVideoStreamServer from './VideoStreamProxy';
import VideoController from './VideoController';
import { StateService } from './StateService';

let appSocket: Socket = null;
let stateService: StateService;

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

const serveStaticClientSpa = (app: Router) => {
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
  app.use('*', (req, res) => res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html')));
};

const createErrorHandlingForNotFound = (app: Router) => {
  // catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next({status: 404, message: 'Endpoint not found'});
  });
};

const createHttpServer = (app: any) => http.createServer(app);

const createSocket = (server: Server) => require('socket.io')(server);

const configureSocket = (io: Socket) => {
  appSocket = io;
  stateService = new StateService();

  io.on('connection', (socket: Socket) => {
    logger.info('User connected to socket, %s', socket.id);

    new CommandHandler(socket, new DroneController(stateService), new VideoController());

    socket.on('disconnect', () => {
      logger.info('User disconnected from socket %s', socket.id);
    });
  });
};
const create = (port: number) => {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));

  allowCorsRequests(app);
  serveStaticClientSpa(app);
  createErrorHandlingForNotFound(app);

  const server = createHttpServer(app);
  const io = createSocket(server);
  configureSocket(io);

  server.listen(port, () => {
    logger.warn('The server is running on: http://localhost:%s ', port);
  });

  createVideoStreamServer(getVideoForwardPort(), getVideoSocketPort());
};

export default create(getAppPort());

export {appSocket};
