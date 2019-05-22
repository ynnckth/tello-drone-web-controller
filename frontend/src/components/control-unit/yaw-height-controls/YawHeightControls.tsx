import * as React from 'react';
import './YawHeightControls.css';

interface IProps {
}

interface IState {
}

export default class YawHeightControls extends React.Component<IProps, IState> {

  public state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div className="control-container">
        <div className="control-circle">
          <div className="arrow arrow-up"/>
          <div className="middle-row">
            <div className="arrow arrow-left"/>
            <div className="arrow arrow-right"/>
          </div>
          <div className="arrow arrow-down"/>
        </div>
      </div>
    );
  }
}