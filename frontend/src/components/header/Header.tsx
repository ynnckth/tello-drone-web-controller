import * as React from 'react';
import './Header.css';
import {AppBar} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


interface IProps {
  droneConnected: boolean;
  onConnect: () => void;
}

interface IState {}

export default class Header extends React.Component<IProps, IState> {

  public state: IState;

  constructor(props: IProps) {
    super(props);

    this.state = {};

    this.onConnect = this.onConnect.bind(this);
  }

  onConnect() {
    this.props.onConnect();
  }

  public render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar className="header">
          <Typography variant="h6" color="inherit">Tello Cockpit</Typography>
          <div>
            {this.props.droneConnected
              ? <Typography variant="body2" color="inherit">Connected</Typography>
              : <Button onClick={() => this.onConnect()}>Connect to Drone</Button>}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}