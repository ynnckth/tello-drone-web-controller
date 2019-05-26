export enum Event {
  CONNECTION_SUCCESSFUL = 'connection_successful',
  TELEMETRY_DATA = 'telemetry_data',

  // commands from frontend client
  SPEED_CHANGE = 'speed_change',
  CONNECT = 'init_connection',
  MOVEMENT = 'movement',
  TAKEOFF_LAND = 'takeoff_land',
  EMERGENCY = 'emergency',
  FLIP = 'flip',

  // events from drone
  TELEMETRY_MESSAGE_FROM_DRONE = 'message',
}