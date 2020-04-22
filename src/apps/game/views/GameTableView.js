import React from 'react';

import {Table} from 'react-bootstrap';

export default function GameTableView(props) {
    const game = props.game
    return (
        <>
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
                <td>{game.currentState.roundNumber}</td>
                <td>{game.history.length}</td>
                <td>{props.currentPlayerNickname}</td>
                <th>{props.nextPlayerNickname}</th>
              </tr>
            </tbody>
        </Table>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Total Water Supply</th>
              <th>Total Food Supply</th>
              <th>Total Wood Supply</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{game.currentState.waterSupply}</td>
              <td>{game.currentState.foodSupply}</td>
              <td>{game.currentState.woodSupply}</td>
            </tr>
          </tbody>
      </Table>
      </>
    );

};