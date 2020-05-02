import React from 'react';

import {Modal, Button} from 'react-bootstrap';

/**
*
*   @param show
*   @param handlePollEndValidation
*/
export default function PollEndValidationModal(props) {

    const show = (props.show) ? props.show : false;
    const pollType = (props.pollType) ? props.pollType : "eat or drink";

    const handlePollEndValidation = (props.handlePollEndValidation) ? props.handlePollEndValidation : (submit) => {
        console.log("End of vote.");
    };

    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title>{pollType} vote over !</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                This {pollType} vote has been completed, validate to move on:
                <Button variant="primary" type="button" onClick={handlePollEndValidation}>
                    End this now!
                </Button>
            </Modal.Body>
        </Modal>
    )
}
