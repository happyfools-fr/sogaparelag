import React from 'react';

import {Card} from 'react-bootstrap';

import {Weather} from '../../model/Weather.js'

const WEATHER_TO_VIEW = [
    "sun",
    "cloud-sun-rain",
    "cloud-rain",
    "cloud-showers-heavy",
    "cloud-meatball",
    "sun",
]

export default function WeatherComponent(props) {
    return (
        <Card bg="light" text="black" className="mr-1">
            <Card.Body>
                <h2>
                    <i className={"fas fa-"+WEATHER_TO_VIEW[props.weather]} />&nbsp;&nbsp;{Weather.getWaterFromWeather(props.weather)}
                </h2>
                <span style={{fontSize: 10}}>Weather today</span>
            </Card.Body>
        </Card>
    );
};
