import {WaterManager} from '../model/WaterManager'


const assert = require('assert');
    

describe('WaterManager', function() 
{
    it('collect 1 water if value is 1', () => 
    {
        const _waterManager = new WaterManager()
        _waterManager.value = 1
        assert.equal(_waterManager.inventory, 0)
        _waterManager.collect()
        assert.equal(_waterManager.inventory, 1)
    });

    it('collect 2 water if value is 2', () => 
    {
        const _waterManager = new WaterManager()
        _waterManager.value = 1
        _waterManager.value = 2
        assert.equal(_waterManager.inventory, 0)
        _waterManager.collect()
        assert.equal(_waterManager.inventory, 2)
    });
});
