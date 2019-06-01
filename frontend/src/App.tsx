import React from 'react';
import './App.css';
import VideoStream from './components/video-stream/VideoStream';
import ControlUnit from './components/control-unit/ControlUnit';
import Header from './components/header/Header';
import DroneController from './services/DroneController';
import {Typography} from '@material-ui/core';
import DroneTelemetry from './components/telemetry/DroneTelemetry';
import SpeedRegulation from './components/speed-regulation/SpeedRegulation';

export interface DroneTemperatureTelemetryData {
  low: number | undefined;
  high: number | undefined;
}

export interface DroneTelemetryData {
  batteryStatus: number | undefined;
  pitch: number | undefined;
  roll: number | undefined;
  temperature: DroneTemperatureTelemetryData;
}

interface IProps {
}

interface IState {
  connectedToDrone: boolean;
  droneTelemetryData: DroneTelemetryData;
}

export default class App extends React.Component<IProps, IState> {

  public state: IState;
  private readonly droneController: DroneController;

  constructor(props: IProps) {
    super(props);
    this.droneController = new DroneController();

    this.state = {
      connectedToDrone: false,
      droneTelemetryData: {
        batteryStatus: undefined,
        pitch: undefined,
        roll: undefined,
        temperature: {low: undefined, high: undefined},
      },
    };
    this.connectToDrone = this.connectToDrone.bind(this);
  }

  private connectToDrone(): void {
    this.droneController.connectToDrone();

    this.droneController.getDroneConnectionSuccessful()
      .subscribe(() => this.setState({connectedToDrone: true}));

    this.droneController.getTelemetryStream()
      .subscribe(telemetryData => this.setState(
        {
          droneTelemetryData: {
            batteryStatus: telemetryData.battery,
            pitch: telemetryData.pitch,
            roll: telemetryData.roll,
            temperature: telemetryData.temperature,
          },
        },
      ));
  }

  public render() {
    return (
      <div className="App">
        <Header droneConnected={this.state.connectedToDrone} onConnect={this.connectToDrone}/>
        {this.state.connectedToDrone ?
          <div>
            <ControlUnit droneController={this.droneController}/>
            <VideoStream/>
            <DroneTelemetry droneTelemetryData={this.state.droneTelemetryData}/>
            <SpeedRegulation/>
          </div>
          :
          <div className="not-connected-info-message">
            <Typography variant="h6" component="h3">No connection to drone</Typography>
            <Typography component="p">Make sure that you are connected to the drone's WiFi.</Typography>
          </div>}
      </div>
    );
  }
}
