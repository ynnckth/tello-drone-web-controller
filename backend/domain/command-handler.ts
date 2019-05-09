import {Socket} from 'socket.io';
import DroneController from './drone-controller';
import {MovementCommand} from './movement-command';
import {CommandType} from '../communication/command-type';
import {Response} from '../communication/response';
import VideoController from './video-controller';

export default class CommandHandler {

  constructor(private socket: Socket,
              private droneController: DroneController,
              private videoController: VideoController) {
    this.handleConnect = this.handleConnect.bind(this);
    this.handleMovementChange = this.handleMovementChange.bind(this);
    this.handleTakeOffOrLand = this.handleTakeOffOrLand.bind(this);
    this.handleEmergencyLand = this.handleEmergencyLand.bind(this);

    this.startListeningToClientCommands();
  }

  private startListeningToClientCommands() {
    this.socket.on(CommandType.CONNECT, this.handleConnect);
    this.socket.on(CommandType.TAKEOFF_LAND, this.handleTakeOffOrLand);
    this.socket.on(CommandType.MOVEMENT, this.handleMovementChange);
    this.socket.on(CommandType.EMERGENCY, this.handleEmergencyLand);
  }

  private handleConnect() {
    this.droneController.connect()
      .then(() => {
        this.socket.emit(Response.CONNECTION_SUCCESSFUL, {});
        this.videoController.startVideoStream();
      });
  }

  private handleMovementChange(command: MovementCommand) {
    this.droneController.updateMovement(command);
  }

  private handleTakeOffOrLand() {
    this.droneController.takeOffOrLand();
  }

  private handleEmergencyLand() {
    this.droneController.emergencyLand();
  }
}
