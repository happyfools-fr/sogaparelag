import React from 'react';

import {Modal} from 'react-bootstrap';

import Action from './Action';

export default function ActionView(props) {

    const [, setShow] = React.useState(false);

    return (
        <Modal show={props.show} onHide={()=> {setShow(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>It's your turm</Modal.Title>
            </Modal.Header>
            <Modal.Body>Choose your action, and choose wisely ...</Modal.Body>
            <Modal.Footer>
                <Action game={props.game} afterAction={()=> {setShow(false)}} />
            </Modal.Footer>
        </Modal>
    );
}