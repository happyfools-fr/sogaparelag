import React from 'react';

import {Card, Container, Col, Row, Table} from 'react-bootstrap';

import FoodSupplyComponent from "./supply-components/FoodSupplyComponent";
import WaterSupplyComponent from './supply-components/WaterSupplyComponent';
import WoodSupplyComponent from './supply-components/WoodSupplyComponent';
import RaftComponent from './supply-components/RaftComponent';


export default function GameTableView(props) {

    const game = props.game

    return (
        <Card border="light">
            <Card.Body>
            <Card.Title>Welcome to Island of {props.slugname} </Card.Title>
            <Container>
                <p>{game.playersCount}&nbsp;players in the game</p>
                <Row>
                    <Col sm={3}>
                    <WaterSupplyComponent inventory={game.waterSupply} />
                    </Col>
                    <Col sm={3}>
                    <FoodSupplyComponent inventory={game.foodSupply} />
                    </Col>
                    <Col sm={3}>
                    <WoodSupplyComponent inventory={game.woodSupply%6} />
                    </Col>
                    <Col sm={3}>
                    <RaftComponent inventory={~~(game.woodSupply/6)} />
                    </Col>
                </Row>
                {
                <Row className='mt-3'>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Round #</th>
                            <th>Total Moves #</th>
                            <th>Current Player</th>
                            <th>Next Player</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{game._gameTable.roundIndex}</td>
                            <td>{game.history.length}</td>
                            <td>{game.currentPlayer.nickname}</td>
                            <th>{game.nextPlayer.nickname}</th>
                        </tr>
                    </tbody>
                    </Table>
                </Row>
                }
            </Container>
            </Card.Body>
        </Card>
    );
};
