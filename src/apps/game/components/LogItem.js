// React imports
import React, {Component} from 'react';

// Style imports
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'

export default class LogItem extends Component {
    
    constructor(props) {
        super(props);
        this.icon = props.icon;
        this.value = props.value;
    }
    
    render() {
        return (
            <ListGroup.Item>
                <i class={"fas " + this.icon} />
                &nbsp;
                {this.value}
            </ListGroup.Item>
        )

    }
}