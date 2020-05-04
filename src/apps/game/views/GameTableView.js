import React from 'react';

import {Card, Container, Col, Row, Table} from 'react-bootstrap';

import FoodSupplyComponent from "./supply-components/FoodSupplyComponent";
import WaterSupplyComponent from './supply-components/WaterSupplyComponent';
import WoodSupplyComponent from './supply-components/WoodSupplyComponent';
import RaftComponent from './supply-components/RaftComponent';
import WeatherComponent from './supply-components/WeatherComponent';
import DayComponent from './supply-components/DayComponent';


import AllPlayersView from './AllPlayersView';

export default function GameTableView(props) {

    const game = props.game

    return (
        <div>
            <h5>Welcome to Island of {props.slugname} </h5>
            <Container className='mt-2'>
                <Row>
                    <DayComponent day={game._gameTable.roundIndex} />

                    <WeatherComponent weather={game._waterManager.currentWeather} />

                    <WaterSupplyComponent inventory={game.waterSupply} />

                    <FoodSupplyComponent inventory={game.foodSupply} />

                    <WoodSupplyComponent inventory={game.woodSupply%6} />

                    <RaftComponent inventory={~~(game.woodSupply/6)} />

                </Row>
            </Container>
            <AllPlayersView
                players={game._gameTable.players}
                currentPlayerId={game.currentPlayerId}
                headPlayerId={game.headPlayerId}
                firebaseService={props.firebaseService}
            />
        </div>
    );
};
