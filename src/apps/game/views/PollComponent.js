import React, {useState} from 'react';

import {Dropdown, DropdownButton, ButtonGroup, FormControl} from 'react-bootstrap';

/**
*
* @param players
*/
export default function PollComponent(props) {

    const [filter, setFilter] = useState('')

    return (
        <Dropdown as={ButtonGroup} key='right' drop='right'>
            <Dropdown.Toggle
              variant='dark'
            >
              {(props.vote) ? props.vote.nickname : ' Select vote '}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => setFilter(e.target.value.toLowerCase())}
                    value={filter}
                />
                { props.players
                    .filter(
                        (player) => {
                            return !filter || player.nickname.toLowerCase().startsWith(filter)
                        }
                    )
                    .map(
                        (player, index) => {
                            return(
                                <Dropdown.Item
                                    key={index}
                                    onSelect={() => props.handleSelect(player)}
                                >
                                    {player.nickname}
                                </Dropdown.Item>
                            )
                        }
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}
