import * as React from 'react';
import JSMpeg from './jsmpeg.min';
import './VideoStream.css';

interface IProps {
}

interface IState {
  player: any;
}

export default class VideoStream extends React.Component<IProps, IState> {

  public state: IState;

  constructor(props: IProps) {
    super(props);

    this.state = {
      player: undefined,
    };
  }

  componentDidMount(): void {
    const canvas = this.refs.canvas;
    // @ts-ignore
    const wsUrl = 'ws://' + document.location.hostname + ':8083/';
    // @ts-ignore
    this.state.player = new JSMpeg.Player(wsUrl, {canvas: canvas});
  }

  public render() {
    return (
      <canvas ref="canvas"/>
    );
  }
}