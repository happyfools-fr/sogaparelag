import React, {useState, useEffect} from 'react';

import {Modal, ProgressBar} from 'react-bootstrap';

export default function ActionResultModal(props) {

    const show = props.actionResult.show
    const resultSummary = props.actionResult.summary

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

    if (show && timer>5) {
        props.onHide();
        setTimer(0);
    }

    return (
        <Modal
            show={show}
            centered
            onHide={ () => {props.onHide(); setTimer(0)}}
        >
            <Modal.Header closeButton>
                <Modal.Title>Well done !</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {resultSummary}
                {/*<ProgressBar className="m-4" max={5} variant="secondary" now={timer} />*/}
            </Modal.Body>
        </Modal>
    );
};
