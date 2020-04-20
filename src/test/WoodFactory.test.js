import shuffle from '../../node_modules/shuffle-array'
import {WoodFactory} from '../components/apps/WoodFactory'

const _woodFactory = new WoodFactory()
const assert = require('assert');
    

describe('WoodFactory', function() {
    it('collect 0 wood if ask as so', () => 
    {
        assert.equal(_woodFactory.collect(0), 0)
    });

    it('collect 6 woods will get you sick', () => 
    {
        assert.equal(_woodFactory.collect(6), null)
    });

    it('collect more than 6 woods throws', () => 
    {
        assert.throws(() => { _woodFactory.collect(7) })
    });
    
    it('collect summary returns additionalRequest if asked under or equal 3', () => 
    {
        let woods = [true, true, true, false, true, true]
        for (let additionalRequest = 0; additionalRequest <= 6 ; additionalRequest++) 
        {
            if (additionalRequest <= 3)
                assert.equal(WoodFactory._collectSumary(woods, additionalRequest), additionalRequest)
        }
        
    });

    it('collect summary returns null if asked over  3', () => 
    {
        let woods = [true, true, true, false, true, true]
        for (let additionalRequest = 0; additionalRequest <= 6 ; additionalRequest++) 
        {
            if (additionalRequest > 3)
                assert.equal(WoodFactory._collectSumary(woods, additionalRequest), null)
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
