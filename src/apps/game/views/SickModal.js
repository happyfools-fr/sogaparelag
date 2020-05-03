import React from 'react';

import {Modal, Button} from 'react-bootstrap';

/**
*
*   @params show
*   @params handleSpectate
*/
export default function DeadModal(props) {

    let show = props.show

    const handleSick = (props.handleSick) ? props.handleSick : () => {show = false}

    return (
        <Modal show={show} centered onHide={handleSick}>
            <Modal.Header closeButton>
                <Modal.Title>
                    You're sick &nbsp;&nbsp;
                    <i className="fas fa-dizzy"></i>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You lost all the wood you went for... And you won't be able to play in the next round.
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="dark" onClick={handleSick}>Oh...</Button>
            </Modal.Footer> */}
        </Modal>
    )
}
