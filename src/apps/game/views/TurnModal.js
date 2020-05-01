// React imports
import React from 'react';

import {Modal, ButtonGroup, Button} from 'react-bootstrap';

export default function TurnModal(props) {

    return (
        <Modal show={props.show} centered>
            <Modal.Header>
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
                    <Button variant="danger" margin-right="1em" onClick={() => props.onAction("food")}>
                        Get food
                    </Button>
                </ButtonGroup>
            </Modal.Footer>
        </Modal>
    );
}
