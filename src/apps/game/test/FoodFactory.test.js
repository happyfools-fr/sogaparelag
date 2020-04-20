import {FoodFactory} from '../model/FoodFactory'

const _foodFactory = new FoodFactory()
const assert = require('assert');


<<<<<<< HEAD:src/test/FoodFactory.test.js
describe('FoodFactory', function() 
{
    it('collect food gets value in 1-2-3', () => 
=======
describe('FoodFactory', function() {
    it('collect food gets value in 1-2-3', () =>
>>>>>>> 6f8e9721b15238b693ed373d220003f2484d1af0:src/apps/game/test/FoodFactory.test.js
    {
        assert(_foodFactory.collect() >= 1)
        assert(3 - _foodFactory.collect() >= 0)
    });
});
