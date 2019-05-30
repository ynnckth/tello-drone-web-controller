import * as React from 'react';
import './DroneTelemetry.css';
import {DroneTelemetryData} from '../../App';
import AdditionalTelemetryData from './additional-telemetry-data/AdditionalTelemetryData';
import BatteryStatus from './battery-status/BatteryStatus';

interface IProps {
  droneTelemetryData: DroneTelemetryData;
}

interface IState {
}

export default class DroneTelemetry extends React.Component<IProps, IState> {

  public state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div className="drone-telemetry-data">
        <BatteryStatus batteryStatus={this.props.droneTelemetryData.batteryStatus}/>
        <AdditionalTelemetryData
          pitch={this.props.droneTelemetryData.pitch}
          roll={this.props.droneTelemetryData.roll}
          temperature={this.props.droneTelemetryData.temperature}/>
      </div>
    );
  }
}