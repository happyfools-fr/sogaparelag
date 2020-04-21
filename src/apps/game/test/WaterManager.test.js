import {WaterManager} from '../model/WaterManager'

const assert = require('assert');
    

describe('WaterManager', function() 
{
    it('collect 1st weather in list with single item', () => 
    {
        const _waterManager = new WaterManager()

        _waterManager._weathers = [1]
        assert.equal(_waterManager.inventory, 0)
        _waterManager.collect()
        assert.equal(_waterManager.inventory, 1)
    });

    it('collect 1st weather in list with multiple items', () => 
    {
        const _waterManager = new WaterManager()

        _waterManager._weathers = [2, 3, 5]
        assert.equal(_waterManager.inventory, 0)
        _waterManager.collect()
        assert.equal(_waterManager.inventory, 2)
    });
});
