import React from 'react';

// Styles imports
import {Button, ButtonGroup} from 'react-bootstrap';

export default function TurnActionButtons(props) {
  
    return (
        <ButtonGroup>
            <Button variant="primary" margin-right="1em" onClick={() => props.handleAction("water")}>
                Get water
            </Button>
            <Button variant="success" margin-right="1em"  onClick={() => props.handleAction("wood")}>
                Get wood
            </Button>
            <Button variant="danger" margin-right="1em" onClick={() => props.handleAction("wood")}>
                Get food
            </Button>
        </ButtonGroup>

    )
}