import React from 'react';
import './App.css';
import VideoStream from './components/video-stream/VideoStream';
import ControlUnit from './components/control-unit/ControlUnit';
import Header from './components/header/Header';
import DroneController from './drone-controller';

interface IProps {}

interface IState {
  connectedToDrone: boolean;
}

export default class App extends React.Component<IProps, IState> {

  public state: IState;

  private droneController: DroneController;

  constructor(props: IProps) {
    super(props);
    this.droneController = new DroneController();

    this.state = {
      connectedToDrone: false
    };
    this.connectToDrone = this.connectToDrone.bind(this);
  }

  private connectToDrone(): void {
    this.droneController.connectToDrone();
    this.droneController.getDroneConnectionSuccessful()
      .subscribe(() => this.setState({connectedToDrone: true}));
  }

  public render() {
    return (
      <div className="App">
        <Header droneConnected={this.state.connectedToDrone} onConnect={this.connectToDrone} />
        <ControlUnit/>
        <VideoStream/>
      </div>
    );
  }
}
