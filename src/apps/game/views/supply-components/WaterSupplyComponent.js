import React from 'react';

import {Card} from 'react-bootstrap';

export default function WaterSupplyComponent(props) {
    return (
        <Card bg="info" text="white" className="text-center m-1">
            <Card.Body>
                <h2><i className="fas fa-tint" />&nbsp;&nbsp;{props.inventory}</h2>
                <small>Water supplies</small>
            </Card.Body>
        </Card>
    );
};
