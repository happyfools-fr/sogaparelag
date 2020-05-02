import React from 'react';

import {Card, Container, Col, Row, Table} from 'react-bootstrap';

import FoodSupplyComponent from "./supply-components/FoodSupplyComponent";
import WaterSupplyComponent from './supply-components/WaterSupplyComponent';
import WoodSupplyComponent from './supply-components/WoodSupplyComponent';
import RaftComponent from './supply-components/RaftComponent';
import WeatherComponent from './supply-components/WeatherComponent';
import DayComponent from './supply-components/DayComponent';


export default function GameTableView(props) {

    const game = props.game

    return (
        <Card border="light">
            <Card.Body>
            <Card.Title>Welcome to Island of {props.slugname} </Card.Title>
            <Container>
                <h6>{game.playersCount}&nbsp;survivors on the island</h6>
                <Row>
                    <DayComponent day={game._gameTable.roundIndex} />

                    <WeatherComponent weather={game._waterManager.currentWeather} />

                    <WaterSupplyComponent inventory={game.waterSupply} />

                    <FoodSupplyComponent inventory={game.foodSupply} />

                    <WoodSupplyComponent inventory={game.woodSupply%6} />

                    <RaftComponent inventory={~~(game.woodSupply/6)} />

                </Row>
                {
                <Row className='mt-3'>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Day #</th>
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
