import React, { Component } from 'react';

import Game from '../model/Game';

// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ButtonGroup} from 'react-bootstrap';

export default class ActionButtons extends Component {

    onClick(action) {
        Game.pushUpdateGameState(this.props.game);
        alert(action+": Game.updateGameState");
        this.props.afterAction();
    }
  
    render() { 
        return (
            <ButtonGroup>
                <Button variant="primary" onClick={() => this.onClick("water")}>
                    Get water
                </Button>
                <Button variant="success" onClick={() => this.onClick("wood")}>
                    Get wood
                </Button>
                <Button variant="danger" onClick={() => this.onClick("wood")}>
                    Get food
                </Button>
            </ButtonGroup>

        )
    }
}