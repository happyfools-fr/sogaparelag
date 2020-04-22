import shuffle from 'shuffle-array'
import {WoodManager} from '../model/WoodManager'

const _woodManager = new WoodManager()
const assert = require('assert');
    

describe('WoodManager', function() 
{
    it('collect 0 wood if ask as so', () => 
    {
        assert.equal(_woodManager.inventory, 0)
        let sick =_woodManager.tryCollect(0)
        assert.equal(_woodManager.inventory, 0)
        assert.equal(sick, false)
    });

    it('collect 6 woods will get you sick', () => 
    {
        assert.equal(_woodManager.inventory, 0)
        let sick = _woodManager.tryCollect(6)
        assert.equal(_woodManager.inventory, 0)
        assert.equal(sick, true)
    });

    it('collect more than 6 woods throws', () => 
    {
        assert.throws(() => { _woodManager.tryCollect(7) })
    });
    
    it('collect summary returns additionalRequest if asked under or equal 3', () => 
    {
        let woods = [true, true, true, false, true, true]
        for (let additionalRequest = 0; additionalRequest <= 6 ; additionalRequest++) 
        {
            if (additionalRequest <= 3)
                assert.equal(WoodManager._collectSumary(woods, additionalRequest), additionalRequest)
        }
        
    });

    it('collect summary returns null if asked over  3', () => 
    {
        let woods = [true, true, true, false, true, true]
        for (let additionalRequest = 0; additionalRequest <= 6 ; additionalRequest++) 
        {
            if (additionalRequest > 3)
                assert.equal(WoodManager._collectSumary(woods, additionalRequest), null)
        }
        
    });

    it('test array shuffling (can be false if shuffling did nothing)', () => 
    {
        let array = []
        for (let it = 0; it <= 1000 ; it++) 
        {
            array.push(it)
        }
        shuffle(array)
        for (let it = 0; it <= 1000 ; it++) 
        {
            if (array[it] != it)
                return
        }
        throw Error
    });
});
