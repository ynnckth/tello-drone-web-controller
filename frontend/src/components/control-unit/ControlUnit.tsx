import * as React from 'react';
import {
  EMERGENCY,
  FLIPPABLE_KEYS,
  FLIPPABLE_KEYS_CODES,
  MOVEMENT_KEYS,
  MOVEMENT_KEYS_CODES,
  TAKEOFF_LAND,
  PITCH_FORWARD, PITCH_BACK, ROLL_LEFT, ROLL_RIGHT, YAW_LEFT, YAW_RIGHT, UP, DOWN,
} from '../../keys';
import DroneController from '../../drone-controller';
import './ControlUnit.css';
import PitchRollControls from './pitch-roll-controls/PitchRollControls';
import YawHeightControls from './yaw-height-controls/YawHeightControls';

export interface ActiveControl {
  [key: string]: boolean;
}

interface IProps {
}

interface IState {
  activeControls: ActiveControl;
}

export default class ControlUnit extends React.Component<IProps, IState> {

  public state: IState;
  private droneController: DroneController;

  constructor(props: IProps) {
    super(props);
    this.state = {
      activeControls: {
        [PITCH_FORWARD.keyCode]: false,
        [PITCH_BACK.keyCode]: false,
        [ROLL_LEFT.keyCode]: false,
        [ROLL_RIGHT.keyCode]: false,
        [YAW_LEFT.keyCode]: false,
        [YAW_RIGHT.keyCode]: false,
        [UP.keyCode]: false,
        [DOWN.keyCode]: false,
      },
    };
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
        this.updateControlState(event.keyCode, true);
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
      this.updateControlState(event.keyCode, false);
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

  private updateControlState(keyCode: number, active: boolean) {
    this.setState({
      activeControls: {
        ...this.state.activeControls,
        [keyCode]: active,
      },
    });
  }

  public render() {
    return (
      <div className="controls">
        <YawHeightControls activeControls={this.state.activeControls}/>
        <PitchRollControls activeControls={this.state.activeControls}/>
      </div>
    );
  }
}