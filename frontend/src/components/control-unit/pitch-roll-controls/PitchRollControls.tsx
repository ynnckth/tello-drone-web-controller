import * as React from 'react';
import './PitchRollControls.css';

interface IProps {
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