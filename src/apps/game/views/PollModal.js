import React, {useState} from 'react';

import {Modal, Form, Button, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';

/**
*
*   @params players
*   @params show
*   @params handleVote
*
*/
export default function PollModal(props) {

    // Set condition
    const show = true
    const players = [
        {_id: 1}, {_id: 2}, {_id: 3}, {_id: 4},
        {_id: 5}, {_id: 6}, {_id: 7}, {_id: 8},
        {_id: 9}, {_id: 10}, {_id: 11}, {_id: 12}
    ];
    const handleVote = (submit) => {
        // To-Do
        console.log(vote)
    };

    const [vote, setVote] = useState()



    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title>Time to vote !</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You must choose which player will not drink today :
                <Form className="mt-2" onSubmit={handleVote}>
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
