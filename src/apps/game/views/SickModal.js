import React, {useState} from 'react';

import {Modal, Button} from 'react-bootstrap';

/**
*
*   @params show
*   @params handleSpectate
*/
export default function DeadModal(props) {

    // console.log("is sick :", props.showSick.show)
    // console.log("has click :", props.showSick.click)

    const show = (props.showSick.show && !props.showSick.click)

    return (
        <Modal show={show} centered onHide={props.handleSick}>
            <Modal.Header closeButton>
                <Modal.Title>
                    You're sick &nbsp;&nbsp;
                    <i className="fas fa-dizzy"></i>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You lost all the wood you went for... And you won't be able to play in the next round.
            </Modal.Body>
        </Modal>
    )
}
