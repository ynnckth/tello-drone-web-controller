import * as React from 'react';
import './BatteryStatus.css';

interface IProps {
  batteryStatus: number | undefined;
}

interface IState {
}

export default class BatteryStatus extends React.Component<IProps, IState> {

  public state: IState;
  private readonly BATTERY_MAX_WIDTH = 50;

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  calculateBatteryBarWidth() {
    return this.BATTERY_MAX_WIDTH / 100 * (this.props.batteryStatus ? this.props.batteryStatus : 0);
  }

  // some svg attributes are not supported by jsx and need to be converted.
  // take a look at svg to react: https://svg2jsx.herokuapp.com/
  public render() {
    return (
      <div>
        {this.props.batteryStatus &&
        <svg width='75' height='30'>
          <rect width={this.BATTERY_MAX_WIDTH} height='25' fill='#666666' strokeWidth='1' stroke='#000' rx="2" ry="2"/>
          <rect width={this.calculateBatteryBarWidth()} height='25' fill='#32CD32' strokeWidth='1' stroke='#000' rx="2"
                ry="2"/>
          <rect x="50" y="5" width='3' height='15' fill='#666666' strokeWidth='1' stroke='#000'/>
          <text x="12" y="17" fill="white" fontSize="13" data-testid="battery-status-text">{this.props.batteryStatus}%</text>
        </svg>}
      </div>
    );
  }
}