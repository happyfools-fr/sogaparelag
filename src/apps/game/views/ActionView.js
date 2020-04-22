import React from 'react';

import Modal from 'react-bootstrap/Modal';

import ActionButtons from '../components/ActionButtons';

export default function ActionView(props) {

    const [, setShow] = React.useState(false);

    return (
        <Modal show={props.show} onHide={()=> {setShow(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>It's your turm</Modal.Title>
            </Modal.Header>
            <Modal.Body>Choose your action, and choose wisely ...</Modal.Body>
            <Modal.Footer>
                <ActionButtons game={props.game} afterAction={()=> {setShow(false)}} />
            </Modal.Footer>
        </Modal>
    );
}