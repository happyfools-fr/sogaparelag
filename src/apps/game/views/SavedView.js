import React from 'react'

import {Button} from 'react-bootstrap'

/**
*
* @param players
* @param slugname
*/
export default function SavedView(props) {

    const players = (props.players) ? props.players : [
        {_id:"1", nickname: "Garnio", isDead: false},
        {_id:"2", nickname: "Marco", isDead: false},
        {_id:"3", nickname: "Nico", isDead: true},
    ]

    const slugname = (props.slugname) ? props.slugname : "happy-fools"

    return (
        <div>
            <h2 className="mt-4">
                {"Well done " +
                players
                    .filter((p) => !p.isDead)
                    .map((p) => p.nickname)
                    .join(", ")
                + "!" }
            </h2>
            <h3> You have escaped the deserted island of {slugname} </h3>
            <div className="m-4">
                {
                    (props.isCreator)
                    ? <Button
                        variant="primary"
                        onClick={
                            (click) => props.handleClickCreateNewGame(click)
                        }
                    >
                        Try again - Start a new game
                    </Button>
                    : <div></div>
                }
            </div>
            <img alt="" className="mt-4 " src={require('../../../assets/isolated-island.jpg') } />
        </div>
    );
}
