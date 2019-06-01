import {ControlKey, MovementControlKey} from '../keys';
import io from 'socket.io-client';
import {getServerAddress} from '../config';
import {EventName} from './EventName';
import {Observable, fromEvent} from 'rxjs';
import {take} from 'rxjs/operators';
import {DroneTelemetry} from './DroneTelemetry';


export interface DroneState {
  pitch: number;
  roll: number;
  yaw: number;
  height: number;
}

export enum Speed {
  FAST=100,
  SLOW=30,
}

export default class DroneController {

  private readonly socket: SocketIOClient.Socket;
  private readonly droneConnectionSuccessful$: Observable<void>;
  private readonly droneTelemetry$: Observable<DroneTelemetry>;

  private droneState: DroneState;
  private currentSpeed: number;

  constructor() {
    this.socket = io(getServerAddress());
    this.droneConnectionSuccessful$ = fromEvent(this.socket, EventName.CONNECTION_SUCCESSFUL);
    this.droneTelemetry$ = fromEvent(this.socket, EventName.TELEMETRY_DATA);
    this.currentSpeed = Speed.FAST;

    this.droneState = {
      pitch: 0,
      roll: 0,
      yaw: 0,
      height: 0,
    };
    this.getDroneConnectionSuccessful = this.getDroneConnectionSuccessful.bind(this);
  }

  connectToDrone(): void {
    this.socket.emit(EventName.INIT_CONNECTION, {});
  }

  getDroneConnectionSuccessful(): Observable<void> {
    return this.droneConnectionSuccessful$
      .pipe(take(1));
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
    this.socket.emit(EventName.FLIP, {direction: flipDirection});
  }

  getTelemetryStream(): Observable<DroneTelemetry> {
    return this.droneTelemetry$;
  }

  getCurrentSpeed(): number {
    return this.currentSpeed;
  }

  setCurrentSpeed(speed: number): void {
    this.currentSpeed = speed;
  }
}