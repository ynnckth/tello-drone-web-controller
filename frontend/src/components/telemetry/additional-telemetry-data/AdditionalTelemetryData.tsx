import * as React from 'react';
import './AdditionalTelemetryData.css';
import {DroneTemperatureTelemetryData} from '../../../App';

interface IProps {
  pitch: number | undefined;
  roll: number | undefined;
  temperature: DroneTemperatureTelemetryData;
}

interface IState {
}

export default class AdditionalTelemetryData extends React.Component<IProps, IState> {

  public state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div className="additional-telemetry-data">
        {this.props.pitch !== undefined
          ?
          <div>
            <div className="telemetry-entry">
              <div>Pitch:</div>
              <div>{this.props.pitch}°</div>
            </div>
            <div className="telemetry-entry">
              <div>Roll:</div>
              <div>{this.props.roll}°</div>
            </div>
            <div className="telemetry-entry">
              <div>Temperature:</div>
              <div>{this.props.temperature.high}°</div>
            </div>
          </div>
          : <div>Waiting for telemetry data...</div>
        }
      </div>
    );
  }
}