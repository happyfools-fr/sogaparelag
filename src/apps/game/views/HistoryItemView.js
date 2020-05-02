// React imports
import React from 'react';

// Style imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert} from 'react-bootstrap'

//
import {RoundAction} from '../model/RoundAction'

const LOG_TYPES = {
    water : {icon: 'tint', variant: 'info'},
    wood : {icon: 'shapes', variant: 'warning'},
    food : {icon: 'fish', variant: 'secondary'},
    info : {icon: 'info', variant: 'light'},
    newday : {icon: 'umbrella-beach', variant: 'success'},
    raft : {icon: 'sign-out-alt', variant: 'success'},
    dead : {icon: 'skull-crossbones', variant: 'danger'},
    sick : {icon: 'dizzy', variant: 'dark'},
}

const ROUND_ACTION_TYPES_MAPPING = new Map()
ROUND_ACTION_TYPES_MAPPING.set(RoundAction.CollectWater, "water")
ROUND_ACTION_TYPES_MAPPING.set(RoundAction.CollectFood, "food")
ROUND_ACTION_TYPES_MAPPING.set(RoundAction.CollectWood, "wood")


export default function HistoryItemView(props) {

    const type = (props.type) ? props.type : "food"

    return (
        <Alert className="mt-2 mr-3" variant={LOG_TYPES[ROUND_ACTION_TYPES_MAPPING.get(type)].variant}>
            <i className={"fas fa-" + LOG_TYPES[ROUND_ACTION_TYPES_MAPPING.get(type)].icon} />
            &nbsp;
            &nbsp;
            {props.value}
        </Alert>
    );
};
