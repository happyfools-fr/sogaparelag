import React from 'react';

import {Card} from 'react-bootstrap';

export default function FoodSupplyComponent(props) {
    return (
        <Card bg="secondary" text="white" className="text-center m-1">
            <Card.Body>
                <h2><i className="fas fa-fish" />&nbsp;&nbsp;{props.inventory}</h2>
                <small>Food supplies</small>
            </Card.Body>
        </Card>
    );
};
