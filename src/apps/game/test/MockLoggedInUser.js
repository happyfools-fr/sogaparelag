export class MockLoggedInUser
{
    constructor(uid, displayName)
    {
        this._id = uid
        this.nickname = displayName
    }

    get id()
    {
        return this._id
    }

    get userId()
    {
        return this._id
    }
}
