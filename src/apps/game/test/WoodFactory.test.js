import {WoodFactory} from '../model/WoodFactory'

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
    
});
