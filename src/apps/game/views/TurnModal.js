// React imports
import React, {useState} from 'react';

import {Form, Modal, ToggleButton, ButtonGroup, Button} from 'react-bootstrap';

import {RoundAction} from '../model/RoundAction'

const ROUND_ACTION_TYPES_MAPPING = new Map()
ROUND_ACTION_TYPES_MAPPING.set("water", RoundAction.CollectWater)
ROUND_ACTION_TYPES_MAPPING.set("food", RoundAction.CollectFood)
ROUND_ACTION_TYPES_MAPPING.set("wood", RoundAction.CollectWood)

export default function TurnModal(props) {

    const show = props.show

    const onAction = (props.onAction) ? props.onAction : (a ,b) => {console.log(a, b)}

    const [choice, setChoice] = useState()

    const [extras, setExtras] = useState(0)

    const renderChoice = (choice) => {
        switch(choice) {
            case 'water':
                return (
                    <div className="mt-3 mb-3">
                        According to the weather, you will get ...!
                    </div>
                );
            case 'wood':
                return(
                    <div className="mt-3 mb-3">
                        <div>
                            You will get 1 free wood from the forest border, if you want to go further into the forest, specify how much you want to collect extra
                        </div>
                        <ButtonGroup className="mt-2" toggle type="radio" onChange={(change) => setExtras(change.target.value)}>
                        {
                            [0,1,2,3,4,5,6].map((i) => {
                                return(<ToggleButton checked={extras===i} type="radio" variant="dark" key={i} value={i}> {i} </ToggleButton>)
                            })
                        }
                        </ButtonGroup>
                    </div>
                );
            case 'food':
                return (
                    <div className="mt-3 mb-3">
                        You've chosen to go fishing. Once you confirm, you'll have to wait for a fish to bite...
                    </div>
                );
            default:
                return null;
        }
    }


    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title>It's your turn</Modal.Title>
            </Modal.Header>

            <Form>
                <Modal.Body>
                    Choose your action, and choose wisely ...
                    <ButtonGroup className="mt-2" toggle onChange={(change) => setChoice(change.target.value)}>
                        <ToggleButton checked={choice==="water"} type="radio" variant="info" value="water">
                            <i className="fas fa-tint" />&nbsp;&nbsp;Get water
                        </ToggleButton>
                        <ToggleButton checked={choice==="wood"} type="radio" variant="warning" value="wood">
                            <i className="fas fa-shapes" />&nbsp;&nbsp;Get wood
                        </ToggleButton>
                        <ToggleButton checked={choice==="food"} type="radio" variant="secondary" value="food">
                            <i className="fas fa-fish" />&nbsp;&nbsp;Get food
                        </ToggleButton>
                    </ButtonGroup>
                    {renderChoice(choice)}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        disabled={!choice}
                        type="button"
                        onClick={() => {
                            onAction(ROUND_ACTION_TYPES_MAPPING.get(choice), extras);
                            setChoice();
                            setExtras(0);
                        }}
                    > Confirm </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
