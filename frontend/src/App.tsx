import React from 'react';
import './App.css';
import VideoStream from './components/video-stream/VideoStream';
import ControlUnit from './components/control-unit/ControlUnit';

interface IProps {}

interface IState {}

export default class App extends React.Component<IProps, IState> {

  public state: IState;

  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div className="App">
        <VideoStream/>
        <ControlUnit/>
      </div>
    );
  }
}
