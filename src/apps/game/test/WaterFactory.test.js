import {WaterFactory} from '../model/WaterFactory'

const _waterFactory = new WaterFactory()
const assert = require('assert');
    

describe('WaterFactory', function() 
{
    it('collect 1 water if value is 1', () => 
    {
        _waterFactory.value = 1
        assert.equal(_waterFactory.collect(), 1)
    });

    it('collect 2 water if value is 2', () => 
    {
        _waterFactory.value = 1
        _waterFactory.value = 2
        assert.equal(_waterFactory.collect(), 2)
    });

});
