import React from 'react';

import {Card} from 'react-bootstrap';

export default function FoodSupplyComponent(props) {
    return (
        <Card bg="secondary" text="white">
            <Card.Header>Food supplies</Card.Header>
            <Card.Body>
                <Card.Title><i className="fas fa-fish" />&nbsp;&nbsp;{props.inventory}</Card.Title>
            </Card.Body>
        </Card>
    );
};
