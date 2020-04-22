import React from 'react';

import {Card} from 'react-bootstrap';

export default function WaterSupplyComponent(props) {
    return (
        <Card bg="info" text="white">
            <Card.Header>Water supplies</Card.Header>
            <Card.Body>
                <Card.Title><i class="fas fa-tint" />&nbsp;&nbsp;{props.inventory}</Card.Title>
            </Card.Body>
        </Card>
    );
};