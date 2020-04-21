import React from 'react';

import {Modal, Button} from 'react-bootstrap';

import Action from './Action';

export default function ActionView(props) {

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Play my turn
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>It's your turm</Modal.Title>
            </Modal.Header>
            <Modal.Body>Choose your action, and choose wisely ...</Modal.Body>
            <Modal.Footer>
                <Action game={props.game} afterAction={handleClose} />
            </Modal.Footer>
        </Modal>
        </>
    );
}