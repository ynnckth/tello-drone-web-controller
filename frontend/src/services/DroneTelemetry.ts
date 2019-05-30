interface AccelerationTelemetryData {
  x: number;
  y: number;
  z: number;
}

interface SpeedTelemetryData {
  x: number;
  y: number;
  z: number;
}

export interface TemperatureTelemetryData {
  low: number;
  high: number;
}

export interface DroneTelemetry {
  acceleration: AccelerationTelemetryData;
  barometer: number
  battery: number
  pitch: number
  roll: number
  heigh: number
  yaw: number;
  speed: SpeedTelemetryData;
  temperature: TemperatureTelemetryData;
  time: number;
  tof: number;  // time of flight
}