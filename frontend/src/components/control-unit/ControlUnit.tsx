import * as React from 'react';

interface IProps {}

interface IState {}

export default class ControlUnit extends React.Component<IProps, IState> {

  public state: IState;

  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div>Here comes the control unit</div>
    );
  }
}