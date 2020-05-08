import React from 'react'
/**
*
* @param slugname
*/
export default function GameOverView(props) {

    const slugname = (props.slugname) ? props.slugname : "happy-fools"

    return (
        <div>
            <h2 className="mt-4">
                Game Over ...
            </h2>
            <h3> You have all died on the deserted island of {slugname} </h3>
            <div className="m-4">
                <Button variant="primary" onClick={(click) => {props.handleClickCreateNewGame(click)} }>
                    Try again - Start a new game
                </Button>
            </div>
            <img alt="" className="mt-4 " src={require('../../../assets/tombstone.jpg') } />
        </div>
    );
}
