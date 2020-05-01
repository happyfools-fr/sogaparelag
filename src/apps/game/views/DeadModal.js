import React from 'react';

import {Modal, Button} from 'react-bootstrap';

/**
*
*   @params show
*   @params handleSpectate
*/
export default function DeadModal(props) {

    const show = (props.show) ? props.show : true

    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title>
                    You're dead &nbsp;&nbsp;
                    <i className="fas fa-sad-cry"></i>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Toi, qui l'auras trop bien’aimé<br/>
                Et parefois même z’abusé<br/>
                Te voilà donc dedans la bière<br/>
                Dores, soldat Morales<br/>
                Dors, dedans ta caisse<br/>
                <em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Didier Benureau</em>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" href="/">Leave</Button>
                <Button variant="primary" onClick={props.handleSpectate}>Spectate</Button>
            </Modal.Footer>
        </Modal>
    )
}
