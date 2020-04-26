import React from 'react';

import {Container, Col, Row, Table} from 'react-bootstrap';

import FoodSupplyComponent from "../components/supply-components/FoodSupplyComponent";
import WaterSupplyComponent from '../components/supply-components/WaterSupplyComponent';
import WoodSupplyComponent from '../components/supply-components/WoodSupplyComponent';
import RaftComponent from '../components/supply-components/RaftComponent';


export default function GameTableView(props) {
    const game = props.game
    return (
        <Container>
        <Row>
            <Col sm={3}>
                <WaterSupplyComponent inventory={game.waterSupply} />
            </Col>
            <Col sm={3}>
                <FoodSupplyComponent inventory={game.foodSupply} />
            </Col>
            <Col sm={3}>
                <WoodSupplyComponent inventory={game.woodSupply} />*/}
            </Col>
            <Col sm={3}>
                <RaftComponent inventory={0} />
            </Col>
        </Row>
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
                {/*<td>{game.currentState.roundNumber}</td>*/}
                <td>à définir</td>
                <td>{game.history.length}</td>
                <td>{props.currentPlayerId}</td>
                <th>{props.nextPlayerId}</th>
              </tr>
            </tbody>
        </Table>
        </Row>
      </Container>
    );

};
