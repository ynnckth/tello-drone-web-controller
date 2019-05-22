import * as React from 'react';
import './YawHeightControls.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp, faRedo, faUndo } from '@fortawesome/free-solid-svg-icons'

interface IProps {
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
    return (
      <div className="control-container">
        <div className="control-circle">
          <FontAwesomeIcon className="navigation flight-up" icon="angle-double-up"/>
          <div className="middle-row">
            <FontAwesomeIcon className="yaw-right" icon="undo"/>
            <FontAwesomeIcon className="yaw-left" icon="redo"/>
          </div>
          <FontAwesomeIcon className="navigation flight-down" icon="angle-double-down"/>
        </div>
      </div>
    );
  }
}