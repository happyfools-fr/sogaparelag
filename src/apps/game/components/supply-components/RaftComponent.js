import React from 'react';

import {Card} from 'react-bootstrap';

export default function RaftComponent(props) {
    return (
        <Card bg="success" text="white">
            <Card.Header>Rafts</Card.Header>
            <Card.Body>
                <Card.Title><i class="fas fa-sign-out-alt" />&nbsp;&nbsp;{props.inventory}</Card.Title>
            </Card.Body>
        </Card>
    );
};