import React from 'react';
import './App.css';
import VideoStream from './components/video-stream/VideoStream';
import ControlUnit from './components/control-unit/ControlUnit';
import Header from './components/header/Header';
import DroneController from './services/DroneController';
import {Typography} from '@material-ui/core';

interface IProps {
}

interface IState {
  connectedToDrone: boolean;
  batteryStatus: number | undefined;
}

export default class App extends React.Component<IProps, IState> {

  public state: IState;
  private droneController: DroneController;

  constructor(props: IProps) {
    super(props);
    this.droneController = new DroneController();

    this.state = {
      connectedToDrone: false,
      batteryStatus: undefined,
    };
    this.connectToDrone = this.connectToDrone.bind(this);
  }

  private connectToDrone(): void {
    this.droneController.connectToDrone();

    this.droneController.getDroneConnectionSuccessful()
      .subscribe(() => this.setState({connectedToDrone: true}));

    this.droneController.getTelemetryStream()
      .subscribe(telemetryData => this.setState({batteryStatus: telemetryData.battery}));
  }

  public render() {
    return (
      <div className="App">
        <Header droneConnected={this.state.connectedToDrone} onConnect={this.connectToDrone}/>
        {this.state.connectedToDrone ?
          <div>
            <ControlUnit/>
            <div>Battery Status: {this.state.batteryStatus}%</div>
            <VideoStream/>
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
