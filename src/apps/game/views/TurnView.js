// React imports
import React from 'react';

import Modal from 'react-bootstrap/Modal';

import TurnActionButtons from '../../game/components/TurnActionButtons';

export default function TurnView(props) {

    return (
        <Modal show={props.show} onHide={(action) => props.handleAction(action)}>
            <Modal.Header closeButton>
                <Modal.Title>It's your turn</Modal.Title>
            </Modal.Header>
            <Modal.Body>Choose your action, and choose wisely ...</Modal.Body>
            <Modal.Footer>
                <TurnActionButtons handleAction={props.handleAction} />
            </Modal.Footer>
        </Modal>
    );
}
