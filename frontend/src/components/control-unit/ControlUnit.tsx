import * as React from 'react';
import {
  EMERGENCY,
  FLIPPABLE_KEYS,
  FLIPPABLE_KEYS_CODES,
  MOVEMENT_KEYS,
  MOVEMENT_KEYS_CODES,
  TAKEOFF_LAND,
} from '../../keys';
import DroneController from '../../drone-controller';
import './ControlUnit.css';
import PitchRollControls from './pitch-roll-controls/PitchRollControls';
import YawHeightControls from './yaw-height-controls/YawHeightControls';

interface IProps {
}

interface IState {
}

export default class ControlUnit extends React.Component<IProps, IState> {

  public state: IState;
  private droneController: DroneController;

  constructor(props: IProps) {
    super(props);
    this.state = {};
    this.droneController = new DroneController();

    this.handleKeyPressedEvent = this.handleKeyPressedEvent.bind(this);
    this.handleKeyReleasedEvent = this.handleKeyReleasedEvent.bind(this);
    this.sendMovementCommand = this.sendMovementCommand.bind(this);
    this.sendFlipCommand = this.sendFlipCommand.bind(this);
  }

  componentDidMount(): void {
    window.addEventListener('keydown', this.handleKeyPressedEvent);
    window.addEventListener('keyup', this.handleKeyReleasedEvent);
  }

  private handleKeyPressedEvent(event: KeyboardEvent) {
    if (MOVEMENT_KEYS_CODES.includes(event.key)) {
      if (!event.shiftKey) {
        this.sendMovementCommand(event.keyCode, this.droneController.getCurrentSpeed());
      }
    }
  }

  private handleKeyReleasedEvent(event: KeyboardEvent) {
    if (event.shiftKey && FLIPPABLE_KEYS_CODES.includes(event.key)) {
      this.sendFlipCommand(event.keyCode);
      return;
    }

    if (MOVEMENT_KEYS_CODES.includes(event.key)) {
      this.sendMovementCommand(event.keyCode, 0);

    } else if (TAKEOFF_LAND.keyCode === event.keyCode) {
      this.droneController.sendTakeOffOrLandCommand();

    } else if (EMERGENCY.keyCode === event.keyCode) {
      this.droneController.sendEmergencyCommand();
    }
  }

  private sendMovementCommand(keyCode: number, speed: number) {
    const movement = MOVEMENT_KEYS.find(movement => movement.keyCode === keyCode);
    if (movement) {
      this.droneController.sendMovementCommand(movement, speed);
    }
  }

  private sendFlipCommand(keyCode: number) {
    const movement = FLIPPABLE_KEYS.find(mov => mov.keyCode === keyCode);
    if (movement) {
      this.droneController.sendFlipCommand(movement.flipDirection || 'f');
    }
  }

  // TODO: check order of elements (pitchroll should be first since it's left)
  public render() {
    return (
      <div className="controls">
        <YawHeightControls/>
        <PitchRollControls/>
      </div>
    );
  }
}