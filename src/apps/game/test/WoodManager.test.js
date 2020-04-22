import shuffle from 'shuffle-array'
import {WoodManager} from '../model/WoodManager'

const assert = require('assert');


describe('WoodManager', function()
{
    it('collect 1 wood if no additionalRequest', () =>
    {
        const _woodManager = new WoodManager()

        assert.equal(_woodManager.inventory, 0)
        let sick = _woodManager.tryCollect(0)
        assert.equal(_woodManager.inventory, 1)
        assert.equal(sick, false)
    });

    it('collect 6 woods will get you sick', () =>
    {
        const _woodManager = new WoodManager()


        assert.equal(_woodManager.inventory, 0)
        let sick = _woodManager.tryCollect(6)
        assert.equal(_woodManager.inventory, 0)
        assert.equal(sick, true)
    });

    it('collect more than 6 woods throws', () =>
    {
        const _woodManager = new WoodManager()

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

    it('should not leave if not enough wood', () =>
    {
        const _woodManager = new WoodManager()

        _woodManager.inventory = 10
        assert.equal(_woodManager.authorizeLeaving(3), false)
    });

    it('should leave if just enough wood', () =>
    {
        const _woodManager = new WoodManager()

        _woodManager.inventory = 18
        assert.equal(_woodManager.authorizeLeaving(3), true)
    });

    it('should leave if more than enough wood', () =>
    {
        const _woodManager = new WoodManager()

        _woodManager.inventory = 30
        assert.equal(_woodManager.authorizeLeaving(3), true)
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
