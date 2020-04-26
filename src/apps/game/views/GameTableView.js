import React from 'react';

import {Container, Col, Row, Table} from 'react-bootstrap';

import FoodSupplyComponent from "../components/supply-components/FoodSupplyComponent";
import WaterSupplyComponent from '../components/supply-components/WaterSupplyComponent';
import WoodSupplyComponent from '../components/supply-components/WoodSupplyComponent';
import RaftComponent from '../components/supply-components/RaftComponent';


export default function GameTableView(props) {
    const game = props.game
    const waterSupply = game ? game.waterSupply : "waterSupply"
    const foodSupply = game ? game.foodSupply : "foodSupply"
    const woodSupply = game ? game.woodSupply : "woodSupply"
    const history = game ? game.history : ["mock history 1", "mock history 2"]
    const currentPlayerId = "Fake currentPlayerId"
    const nextPlayerId = "Fake nextPlayerId"

      return (
          <Container>
          <Row>
              <Col sm={3}>
                  <WaterSupplyComponent inventory={waterSupply} />
              </Col>
              <Col sm={3}>
                  <FoodSupplyComponent inventory={foodSupply} />
              </Col>
              <Col sm={3}>
                  <WoodSupplyComponent inventory={woodSupply} />*/}
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
                  <td>{history.length}</td>
                  <td>{currentPlayerId}</td>
                  <th>{nextPlayerId}</th>
                </tr>
              </tbody>
          </Table>
          </Row>
        </Container>
      );
};
