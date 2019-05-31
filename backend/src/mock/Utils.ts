const randomNumber = (lower: number, upper: number): number => {
  return Math.random() * (upper - lower) + lower;
};

const randomNumberFloor = (lower: number, upper: number): number => {
  return Math.floor(randomNumber(lower, upper));
};

export const getMockTelemetryEvent = () => {
  return {
    acceleration: {x: 0, y: 0, z: 0},
    barometer: 0,
    battery: randomNumberFloor(0, 100),
    pitch: randomNumberFloor(0, 10),
    roll: randomNumberFloor(0, 10),
    heigh: randomNumberFloor(0, 10),
    yaw: randomNumberFloor(0, 10),
    speed: {x: 0, y: 0, z: 0},
    temperature: {low: randomNumberFloor(0, 40), high: randomNumberFloor(40, 90)},
    time: 0,
    tof: 0,
  };
};