import React, {useState} from 'react';

import {Modal, Form, Button, ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap';

import PollComponent from './PollComponent'

/**
*
*   @param players
*   @param show
*   @param handleVoteSubmit
*/
export default function PollModal(props) {

    const show = (props.show) ? props.show : true

    const players = (props.players) ? props.players : [
        {_id: 1, nickname: "Toto"}, {_id: 2, nickname: "Tata"},
        {_id: 3, nickname: "Tutu"}, {_id: 4, nickname: "Tata"},
        {_id: 5, nickname: "Titi"}, {_id: 6, nickname: "Tutu"},
        {_id: 7, nickname: "Tutu"}, {_id: 8, nickname: "Toto"},
    ];

    const handleVoteSubmit = (props.handleVoteSubmit) ? props.handleVoteSubmit : (submit) => {
        console.log(vote._id)
    };

    const [vote, setVote] = useState()


    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title>Time to vote !</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You must choose which player will not drink today :
                <Form className="mt-2" onSubmit={handleVoteSubmit}>
                    <Form.Group>
                    <PollComponent players={players} vote={vote} handleSelect={setVote}/>
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
