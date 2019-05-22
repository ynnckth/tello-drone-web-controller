import {DroneState} from '../../backend/domain/state-serivce';

export interface ControlKey {
  key: string;
  keyCode: number;
}

export interface MovementControlKey extends ControlKey {
  flipDirection?: string;
  updateDroneState: (state: DroneState, speed: number) => DroneState;
}

export const PITCH_FORWARD: MovementControlKey = {
  key: 'ArrowUp',
  keyCode: 38,
  flipDirection: 'f',
  updateDroneState: (state: DroneState, speed: number) => {
    return {
      ...state,
      pitch: speed
    }
  }
};
export const PITCH_BACK: MovementControlKey = {
  key: 'ArrowDown',
  keyCode: 40,
  flipDirection: 'b',
  updateDroneState: (state: DroneState, speed: number) => {
    return {
      ...state,
      pitch: 0 - speed
    }
  }
};

export const ROLL_LEFT: MovementControlKey = {
  key: 'ArrowLeft',
  keyCode: 37,
  flipDirection: 'l',
  updateDroneState: (state: DroneState, speed: number) => {
    return {
      ...state,
      roll: 0 - speed
    }
  }
};

export const ROLL_RIGHT: MovementControlKey = {
  key: 'ArrowRight',
  keyCode: 39,
  flipDirection: 'r',
  updateDroneState: (state: DroneState, speed: number) => {
    return {
      ...state,
      roll: speed
    }
  }
};

export const UP: MovementControlKey = {
  key: 'w',
  keyCode: 87,
  updateDroneState: (state: DroneState, speed: number) => {
    return {
      ...state,
      height: speed
    }
  }
};

export const DOWN: MovementControlKey = {
  key: 's',
  keyCode: 83,
  updateDroneState: (state: DroneState, speed: number) => {
    return {
      ...state,
      height: 0 - speed
    }
  }
};

export const YAW_LEFT: MovementControlKey = {
  key: 'a',
  keyCode: 65,
  updateDroneState: (state: DroneState, speed: number) => {
    return {
      ...state,
      yaw: 0 - speed
    }
  }
};

export const YAW_RIGHT: MovementControlKey = {
  key: 'd',
  keyCode: 68,
  updateDroneState: (state: DroneState, speed: number) => {
    return {
      ...state,
      yaw: speed
    }
  }
};

export const TAKEOFF_LAND: ControlKey = {
  key: '',
  keyCode: 32,
};

export const EMERGENCY: ControlKey = {
  key: 'Escape',
  keyCode: 27,
};

export const MOVEMENT_KEYS: MovementControlKey[] = [PITCH_FORWARD, PITCH_BACK, ROLL_LEFT, ROLL_RIGHT, YAW_LEFT, YAW_RIGHT, UP, DOWN,];
export const MOVEMENT_KEYS_CODES: string[] = MOVEMENT_KEYS.map(k => k.key,);

export const FLIPPABLE_KEYS: MovementControlKey[] = [PITCH_BACK, PITCH_BACK, ROLL_LEFT, ROLL_RIGHT];
export const FLIPPABLE_KEYS_CODES: string[] = FLIPPABLE_KEYS.map(k => k.key,);
