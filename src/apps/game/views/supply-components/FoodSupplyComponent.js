import React from 'react';

import {Card} from 'react-bootstrap';

export default function FoodSupplyComponent(props) {
    return (
        <Card bg="secondary" text="white" className="mr-1">
            <Card.Body>
                <h2><i className="fas fa-fish" />&nbsp;&nbsp;{props.inventory}</h2>
                <span style={{fontSize: 10}}>Food supplies</span>
            </Card.Body>
        </Card>
    );
};
