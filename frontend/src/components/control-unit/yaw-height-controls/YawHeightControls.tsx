import * as React from 'react';
import './YawHeightControls.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp, faRedo, faUndo } from '@fortawesome/free-solid-svg-icons'
import {ActiveControl} from '../ControlUnit';
import {UP, DOWN, YAW_LEFT, YAW_RIGHT} from '../../../keys';

interface IProps {
  activeControls: ActiveControl;
}

interface IState {
}

export default class YawHeightControls extends React.Component<IProps, IState> {

  public state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = {};

    // add font awesome icons to library
    library.add(faRedo);
    library.add(faUndo);
    library.add(faAngleDoubleUp);
    library.add(faAngleDoubleDown);
  }

  public render() {
    const upActiveClass = `navigation flight-up ${this.props.activeControls[UP.keyCode] ? 'active' : ''}`;
    const downActiveClass = `navigation flight-down ${this.props.activeControls[DOWN.keyCode] ? 'active' : ''}`;
    const yawLeftActiveClass = `yaw-left ${this.props.activeControls[YAW_LEFT.keyCode] ? 'active' : ''}`;
    const yawRightActiveClass = `yaw-right ${this.props.activeControls[YAW_RIGHT.keyCode] ? 'active' : ''}`;

    return (
      <div className="control-container">
        <div className="control-circle">
          <FontAwesomeIcon className={upActiveClass} icon="angle-double-up" size={"2x"}/>
          <div className="yaw-height-middle-row">
            <FontAwesomeIcon className={yawLeftActiveClass} icon="undo" size={"2x"}/>
            <FontAwesomeIcon className={yawRightActiveClass} icon="redo" size={"2x"}/>
          </div>
          <FontAwesomeIcon className={downActiveClass} icon="angle-double-down" size={"2x"}/>
        </div>
      </div>
    );
  }
}