import React from 'react';

import {Card} from 'react-bootstrap';

export default function WoodSupplyComponent(props) {
    return (
        <Card bg="warning" text="white" className="text-center m-1">
            <Card.Body>
                <h2><i className="fas fa-shapes" />&nbsp;&nbsp;{props.inventory}</h2>
                <small>Wood supplies</small>
            </Card.Body>
        </Card>
    );
};
