import * as React from 'react';
import './Header.css';
import {AppBar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import keyboard from './keyboard.png';


interface IProps {
  droneConnected: boolean;
  onConnect: () => void;
}

interface IState {
  instructionsDialogOpen: boolean;
}

export default class Header extends React.Component<IProps, IState> {

  public state: IState;

  constructor(props: IProps) {
    super(props);

    this.state = {
      instructionsDialogOpen: false,
    };

    library.add(faInfoCircle);

    this.onConnect = this.onConnect.bind(this);
    this.openInstructionsDialog = this.openInstructionsDialog.bind(this);
    this.closeInstructionsDialog = this.closeInstructionsDialog.bind(this);
  }

  onConnect() {
    this.props.onConnect();
  }

  openInstructionsDialog() {
    this.setState({instructionsDialogOpen: true});
  }

  closeInstructionsDialog() {
    this.setState({instructionsDialogOpen: false});
  }

  public render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar className="header">
          <Typography variant="h6" color="inherit">Tello Cockpit</Typography>

          <div>
            <Button onClick={this.openInstructionsDialog}>
              <FontAwesomeIcon icon="info-circle" size={'1x'}/>
            </Button>

            <Dialog
              open={this.state.instructionsDialogOpen}
              onClose={this.closeInstructionsDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{'Instructions'}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Use the keyboard to control the drone
                </DialogContentText>
                <div>
                  <img src={keyboard} alt="keyboard"/>
                  <div className="key key-w" />
                  <div className="key key-s" />
                  <div className="key key-a" />
                  <div className="key key-d" />
                  <div className="key key-up" />
                  <div className="key key-down" />
                  <div className="key key-left" />
                  <div className="key key-right" />
                  <div className="key key-esc" />
                  <div className="key key-space" />
                </div>
                <ul>
                  <li><strong>space</strong>: take off / land</li>
                  <li><strong>w/s</strong>: height</li>
                  <li><strong>a/d</strong>: yaw</li>
                  <li><strong>arrow up/down</strong>: pitch</li>
                  <li><strong>arrow left/right</strong>: roll</li>
                  <li><strong>shift+arrow</strong>: flip</li>
                  <li><strong>esc</strong>: emergency landing</li>
                </ul>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.closeInstructionsDialog} color="primary" autoFocus>Close</Button>
              </DialogActions>
            </Dialog>

            {this.props.droneConnected
              ? <Typography variant="body2" color="inherit">Connected</Typography>
              : <Button onClick={() => this.onConnect()}>Connect to Drone</Button>}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}