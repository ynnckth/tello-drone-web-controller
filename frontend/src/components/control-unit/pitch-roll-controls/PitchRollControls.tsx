import * as React from 'react';
import './PitchRollControls.css';
import {PITCH_BACK, PITCH_FORWARD, ROLL_LEFT, ROLL_RIGHT} from '../../../keys';
import {ActiveControl} from '../ControlUnit';

interface IProps {
  activeControls: ActiveControl;
}

interface IState {
}

export default class PitchRollControls extends React.Component<IProps, IState> {

  public state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const arrowUpActiveClass = `arrow arrow-up ${this.props.activeControls[PITCH_FORWARD.keyCode] ? 'active' : ''}`;
    const arrowDownActiveClass = `arrow arrow-down ${this.props.activeControls[PITCH_BACK.keyCode] ? 'active' : ''}`;
    const arrowLeftActiveClass = `arrow arrow-left ${this.props.activeControls[ROLL_LEFT.keyCode] ? 'active' : ''}`;
    const arrowRightActiveClass = `arrow arrow-right ${this.props.activeControls[ROLL_RIGHT.keyCode] ? 'active' : ''}`;

    return (
      <div className="control-container">
        <div className="control-circle">
          <div className={arrowUpActiveClass}/>
          <div className="middle-row">
            <div className={arrowLeftActiveClass}/>
            <div className={arrowRightActiveClass}/>
          </div>
          <div className={arrowDownActiveClass}/>
        </div>
      </div>
    );
  }
}