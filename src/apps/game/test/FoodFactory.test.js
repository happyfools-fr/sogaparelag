import {FoodFactory} from '../model/FoodFactory'

const _foodFactory = new FoodFactory()
const assert = require('assert');


describe('FoodFactory', function() 
{
    it('collect food gets value in 1-2-3', () => 
    {
        assert(_foodFactory.collect() >= 1)
        assert(3 - _foodFactory.collect() >= 0)
    });
});
