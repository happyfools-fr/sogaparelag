import React from 'react';

import {Card} from 'react-bootstrap';

export default function WoodSupplyComponent(props) {
    return (
        <Card bg="warning" text="white">
            <Card.Header>Wood supplies</Card.Header>
            <Card.Body>
                <Card.Title><i className="fas fa-shapes" />&nbsp;&nbsp;{props.inventory}</Card.Title>
            </Card.Body>
        </Card>
    );
};
