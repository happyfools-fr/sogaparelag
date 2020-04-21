import {FoodManager} from '../model/FoodManager'

const _foodManager = new FoodManager()
const assert = require('assert');


describe('FoodManager', function() 
{
    it('collect food gets value in 1-2-3', () => 
    {
        assert.equal(_foodManager.inventory, 0)
        _foodManager.collect()
        assert(_foodManager.inventory >= 1)
        assert(3 - _foodManager.inventory >= 0)
    });
});
