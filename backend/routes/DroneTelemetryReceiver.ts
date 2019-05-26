const sdk = require('../lib/tellojs');

let telemetryReceiver: any = null;

export const getDroneTelemetryReceiver = () => {
  if (telemetryReceiver === null) {
    telemetryReceiver = sdk.receiver.state.bind();
  }
  return telemetryReceiver;
};
