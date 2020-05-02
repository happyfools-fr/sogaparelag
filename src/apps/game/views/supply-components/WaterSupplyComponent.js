import React from 'react';

import {Card} from 'react-bootstrap';

export default function WaterSupplyComponent(props) {
    return (
        <Card bg="info" text="white" className="mr-1">
            <Card.Body>
                <h2><i className="fas fa-tint" />&nbsp;&nbsp;{props.inventory}</h2>
                <span style={{fontSize: 10}}>Water supplies</span>
            </Card.Body>
        </Card>
    );
};
