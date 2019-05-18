import * as React from 'react';

interface IProps {}

interface IState {}

export default class VideoStream extends React.Component<IProps, IState> {

  public state: IState;

  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div>Here comes the video stream</div>
    );
  }
}