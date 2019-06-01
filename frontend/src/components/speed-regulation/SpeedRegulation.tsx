import * as React from 'react';
import {Switch} from '@material-ui/core';
import './SpeedRegulation.css';
import DroneController, {Speed} from '../../services/DroneController';

interface IProps {
  droneController: DroneController;
}

interface IState {
  checkedFast: boolean;
}

export default class SpeedRegulation extends React.Component<IProps, IState> {

  public state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = {
      checkedFast: true,
    };
    this.toggleSpeed = this.toggleSpeed.bind(this);
  }

  private toggleSpeed() {
    if (this.state.checkedFast) {
      this.props.droneController.setCurrentSpeed(Speed.SLOW);
    } else {
      this.props.droneController.setCurrentSpeed(Speed.FAST);
    }
    this.setState({checkedFast: !this.state.checkedFast});
  }

  public render() {
    return (
      <div className="speed-control">
        <span>Slow</span>
        <Switch
          checked={this.state.checkedFast}
          onChange={this.toggleSpeed}
          color="default" />
        <span>Fast</span>
      </div>
    );
  }
}