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
        <img className="mt-4 " centered src={require('../../../assets/tombstone.jpg') } />
        </div>
    );
}
