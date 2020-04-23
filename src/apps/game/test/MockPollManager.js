import {PollManager} from '../model/PollManager'


export class MockPollManager extends PollManager
{
    constructor(gameTable)
    {
        super(gameTable)
        this._playerToKill = 0
    }

    vote()
    {
        return this._playerToKill
    }
}
