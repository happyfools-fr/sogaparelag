import React, {useState} from 'react';

import {Modal, Form, Button, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';

export default function PollModal(props) {

    // Set condition
    const show = true

    const players = [{_id:1}, {_id:2}, {_id:3}, {_id:4}, {_id:5} ];

    const [vote, setVote] = useState()

    const handleSubmit = (submit) => {
        // To-Do
        console.log(vote)
    };

    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title>Time to vote !</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You must choose which player will not drink today :
                <Form className="mt-2" onSubmit={handleSubmit}>
                    <Form.Group>
                    {/* How to scale the visual ?? */}
                    <ToggleButtonGroup type="radio" name="players" size="lg" onChange={setVote} toggle>
                        {
                            players.map(
                                (player, i) => {
                                    return(
                                        <ToggleButton
                                            variant="outline-dark"
                                            key={i}
                                            value={player._id}
                                        >
                                            Player {player._id}
                                        </ToggleButton>
                                    )
                                }
                            )
                        }
                    </ToggleButtonGroup>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Vote
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
