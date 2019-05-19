import {ControlKey, MovementControlKey} from './keys';
import io from "socket.io-client";
import {getServerAddress} from './config';
import {EventName} from './EventName';


interface DroneState {
  pitch: number;
  roll: number;
  yaw: number;
  height: number;
}

export default class DroneController {

  private readonly socket: SocketIOClient.Socket;
  private droneState: DroneState;

  constructor() {
    this.socket = io(getServerAddress());

    this.droneState = {
      pitch: 0,
      roll: 0,
      yaw: 0,
      height: 0,
    }
  }

  connectToDrone(): void {
    this.socket.emit(EventName.INIT_CONNECTION, {});
  }

  subscribeSocketEvents() {
    this.socket.on(EventName.CONNECTION_SUCCESSFUL, () => {
     console.log('connected')
    });
  }

  sendMovementCommand(movement: MovementControlKey, speed: number) {
    this.droneState = movement.updateDroneState(this.droneState, speed);
    this.socket.emit(EventName.MOVEMENT, this.droneState);
  }

  sendTakeOffOrLandCommand() {
    this.socket.emit(EventName.TAKEOFF_LAND, {});
  }

  sendEmergencyCommand() {
    this.socket.emit(EventName.EMERGENCY, {});
  }

  sendFlipCommand(flipDirection: string) {
    this.socket.emit(EventName.FLIP, { flipDirection });
  }

  getCurrentSpeed(): number {
    return 100;
  }
}