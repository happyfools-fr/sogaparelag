// React imports
import React, {useState} from 'react';

import {Form, Modal, ButtonGroup, Button} from 'react-bootstrap';

export default function TurnModal(props) {

    const [choice, setChoice] = useState()

    const renderSwitch = (choice) => {
        switch(choice) {
            case 'water':
                return(<span> According to the weather, you will get ...! </span>);
            case 'wood':
                return(
                    <div>
                        <span> You will get 1 free wood from the forest border, if you want to go further into the forest, specify how much you want to collect</span>
                        <ButtonGroup toggle defaultValue={1}>
                        {
                            [1,2,3,4,5,6,7].map((i) => {
                                return(<Button value={i}>{i}</Button>)
                            })
                        }
                        </ButtonGroup>
                    </div>
                );
            case 'food':
                return 'bar';
            default:
                return null;
        }
    }

    return (
        <Modal show={props.show} centered>
            <Modal.Header>
                <Modal.Title>It's your turn</Modal.Title>
            </Modal.Header>
<<<<<<< Updated upstream
            <Modal.Body>Choose your action, and choose wisely ...</Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                    <Button variant="primary" margin-right="1em" onClick={() => props.onAction("water")}>
                        Get water
                    </Button>
                    <Button variant="success" margin-right="1em"  onClick={() => props.onAction("wood")}>
                        Get wood
                    </Button>
                    <Button variant="danger" margin-right="1em" onClick={() => props.onAction("wood")}>
                        Get food
                    </Button>
                </ButtonGroup>
            </Modal.Footer>
=======
            <Form>
                <Modal.Body>Choose your action, and choose wisely ...</Modal.Body>
                    <ButtonGroup toggle onChange={setChoice}>
                        <Button variant="info" margin-right="1em" value="water">
                            Get water
                        </Button>
                        <Button variant="warning" margin-right="1em" value="wood">
                            Get wood
                        </Button>
                        <Button variant="secondary" margin-right="1em" value="food">
                            Get food
                        </Button>
                    </ButtonGroup>
                    {renderSwitch(choice)}
                <Modal.Footer>
                    <Button variant="primary" type="submit"> Confirm choice </Button>
                </Modal.Footer>
            </Form>
>>>>>>> Stashed changes
        </Modal>
    );
}
