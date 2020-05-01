// React imports
import React from 'react';

// Style imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert} from 'react-bootstrap'

const LOG_TYPES = {
    water : {icon: 'tint', variant: 'info'},
    wood : {icon: 'shapes', variant: 'warning'},
    food : {icon: 'fish', variant: 'secondary'},
    info : {icon: 'info', variant: 'light'},
    raft : {icon: 'sign-out-alt', variant: 'success'},
    dead : {icon: 'skull-crossbones', variant: 'danger'},
    sick : {icon: 'dizzy', variant: 'dark'},
}

export default function HistoryItemView(props) {

    const type = (props.type) ? props.type : "food"

    return (
        <Alert className="mt-2" variant={LOG_TYPES[type].variant}>
            <i className={"fas fa-" + LOG_TYPES[type].icon} />
            &nbsp;
            &nbsp;
            {props.value}
        </Alert>
    );
};
