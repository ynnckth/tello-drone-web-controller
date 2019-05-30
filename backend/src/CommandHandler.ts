import {Socket} from 'socket.io';
import DroneController from './DroneController';
import {Event} from './Event';
import VideoController from './VideoController';
import {getDroneTelemetryReceiver} from './DroneTelemetryReceiver';
import {MovementCommand, FlipCommand, SpeedChangeCommand} from './Commands';

export default class CommandHandler {

  constructor(private socket: Socket,
              private droneController: DroneController,
              private videoController: VideoController) {
    this.handleConnect = this.handleConnect.bind(this);
    this.handleMovementChange = this.handleMovementChange.bind(this);
    this.handleTakeOffOrLand = this.handleTakeOffOrLand.bind(this);
    this.handleEmergencyLand = this.handleEmergencyLand.bind(this);
    this.handleFlip = this.handleFlip.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.listenToDroneTelemetryEvents = this.listenToDroneTelemetryEvents.bind(this);

    this.startListeningToClientCommands();
  }

  private startListeningToClientCommands() {
    this.socket.on(Event.CONNECT, this.handleConnect);
    this.socket.on(Event.TAKEOFF_LAND, this.handleTakeOffOrLand);
    this.socket.on(Event.MOVEMENT, this.handleMovementChange);
    this.socket.on(Event.EMERGENCY, this.handleEmergencyLand);
    this.socket.on(Event.FLIP, this.handleFlip);
    this.socket.on(Event.SPEED_CHANGE, this.handleSpeedChange)
  }

  // TODO: fix failed connection; currently connection is successful even if drone is not available!
  private handleConnect() {
    this.droneController.connect()
      .then(() => {
        this.socket.emit(Event.CONNECTION_SUCCESSFUL, {});
        this.videoController.startVideoStream();
        this.listenToDroneTelemetryEvents();
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

  private handleFlip(flipCommand: FlipCommand) {
    this.droneController.flip(flipCommand.direction);
  }

  private handleSpeedChange(speedChangeCommand: SpeedChangeCommand) {
    this.droneController.changeSpeed(speedChangeCommand.speed);
  }

  private listenToDroneTelemetryEvents() {
    const droneTelemetryReceiver = getDroneTelemetryReceiver();
    droneTelemetryReceiver.on(Event.TELEMETRY_MESSAGE_FROM_DRONE, (message: string) => {
      this.socket.emit(Event.TELEMETRY_DATA, message);
    });
  }
}
