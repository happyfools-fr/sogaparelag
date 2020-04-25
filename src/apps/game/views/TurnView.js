// React imports
import React from 'react';

import {Modal, ButtonGroup, Button} from 'react-bootstrap';

export default function TurnView(props) {

    return (
        <Modal show={props.show} onHide={() => props.onAction("pass")}>
            <Modal.Header closeButton>
                <Modal.Title>It's your turn</Modal.Title>
            </Modal.Header>
            <Modal.Body>Choose your action, and choose wisely ...</Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                    <Button variant="primary" margin-right="1em" onClick={() => props.onAction("water")}>
                        Get water
                    </Button>
                    <Button variant="success" margin-right="1em"  onClick={() => props.onAction("wood")}>
                        Get wood
                    </Button>
                    <Button variant="danger" margin-right="1em" onClick={() => props.onAction("wood")}>
                        Get food
                    </Button>
                </ButtonGroup>
            </Modal.Footer>
        </Modal>
    );
}
