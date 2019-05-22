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
    let arrowUpActiveClass = 'arrow arrow-up';
    if (this.props.activeControls[PITCH_FORWARD.keyCode]) {
      arrowUpActiveClass += ' active';
    }

    let arrowDownActiveClass = 'arrow arrow-down';
    if (this.props.activeControls[PITCH_BACK.keyCode]) {
      arrowDownActiveClass += ' active';
    }

    let arrowLeftActiveClass = 'arrow arrow-left';
    if (this.props.activeControls[ROLL_LEFT.keyCode]) {
      arrowLeftActiveClass += ' active';
    }

    let arrowRightActiveClass = 'arrow arrow-right';
    if (this.props.activeControls[ROLL_RIGHT.keyCode]) {
      arrowRightActiveClass += ' active';
    }

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