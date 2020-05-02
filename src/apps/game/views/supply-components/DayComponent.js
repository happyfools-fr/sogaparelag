import React from 'react';

import {Card} from 'react-bootstrap';

export default function DayComponent(props) {
    return (
        <Card bg="light" text="black" className="text-center m-1">
            <Card.Body>
                <h2>
                    <i className="fas fa-calendar" />&nbsp;&nbsp;{props.day}
                </h2>
                <small>Day {props.day} here </small>
            </Card.Body>
        </Card>
    );
};
