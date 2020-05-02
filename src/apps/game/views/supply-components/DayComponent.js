import React from 'react';

import {Card} from 'react-bootstrap';

export default function DayComponent(props) {
    return (
        <Card bg="light" text="black" className="mr-1">
            <Card.Body>
                <h2>
                    <i className="fas fa-calendar" />&nbsp;&nbsp;{props.day}
                </h2>
                <span style={{fontSize: 10}}>Day {props.day} here </span>
            </Card.Body>
        </Card>
    );
};
