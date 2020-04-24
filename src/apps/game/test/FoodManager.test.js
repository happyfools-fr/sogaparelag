import {FoodManager} from '../model/FoodManager'

const assert = require('assert');


describe('FoodManager', function()
{
    it('collect food gets value in 1-2-3', () =>
    {
        const _foodManager = new FoodManager()

        assert.equal(_foodManager.inventory, 0)
        _foodManager.collect()
        assert(_foodManager.inventory >= 1)
        assert(3 - _foodManager.inventory >= 0)
    });

    it('collect food increases inventory', () =>
    {
        const _foodManager = new FoodManager()
        _foodManager._foods = [3]

        assert.equal(_foodManager.inventory, 0)
        _foodManager.collect()
        assert.equal(_foodManager.inventory, 3)
        _foodManager.collect()
        assert.equal(_foodManager.inventory, 6)
    });

    it('eat should decrease inventory', () =>
    {
        const _foodManager = new FoodManager()

        _foodManager.inventory = 5
        _foodManager.eat(3)
        assert.equal(_foodManager.inventory, 2)
    });

    it('should not leave if not enough food', () =>
    {
        const _foodManager = new FoodManager()

        _foodManager.inventory = 5
        assert.equal(_foodManager.authorizeLeaving(3), false)
    });

    it('should leave if just enough food', () =>
    {
        const _foodManager = new FoodManager()

        _foodManager.inventory = 6
        assert.equal(_foodManager.authorizeLeaving(3), true)
    });

    it('should leave if more than enough food', () =>
    {
        const _foodManager = new FoodManager()

        _foodManager.inventory = 10
        assert.equal(_foodManager.authorizeLeaving(3), true)
    });
});
