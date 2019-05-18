import React from 'react';
import './App.css';
import VideoStream from './components/video-stream/VideoStream';
import ControlUnit from './components/control-unit/ControlUnit';
import io from 'socket.io-client';
import {getServerAddress} from './config';
import Header from './components/header/Header';

interface IProps {}

interface IState {}

export default class App extends React.Component<IProps, IState> {

  public state: IState;

  private readonly server = getServerAddress();
  private readonly socket: SocketIOClient.Socket;

  constructor(props: IProps) {
    super(props);
    this.state = {};

    this.socket = io(this.server);
  }

  private connectToDrone() {
    console.log('connecting to drone...')
  }

  public render() {
    return (
      <div className="App">
        <Header droneConnected={false} onConnect={this.connectToDrone} />
        <VideoStream/>
        <ControlUnit/>
      </div>
    );
  }
}
