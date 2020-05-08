import React, {useState, useEffect} from 'react';

import {Modal, ProgressBar} from 'react-bootstrap';

export default function ActionResultModal(props) {

    const show = (props.show) ? props.show : true

    const [timer, setTimer] = useState(0)

    useEffect(
        () => {
            if (show && timer<=5) {
                const myInterval = setInterval(()=> {setTimer(timer + 1)}, 1000);
                return () => clearInterval(myInterval);
            }
        },
        [show, timer, setTimer]
    );

    console.log("render")

    return (
        <Modal show={show && timer<=5} centered>
            <Modal.Header>
                <Modal.Title>Well done !</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {timer}
                <ProgressBar className="m-4" max={5} variant="secondary" now={timer} />
            </Modal.Body>
        </Modal>
    );
};
