import {WaterManager, SERDE_KEYS} from '../model/WaterManager'
import {Weather} from '../model/Weather'

const assert = require('assert');


describe('WaterManager', function()
{

    it('default value for inventory is 0', () =>
    {
        const _waterManager = new WaterManager();
        assert.equal(_waterManager.inventory, 0);
    });

    it('collect 1st weather in list with single item', () =>
    {
        const _waterManager = new WaterManager()

        _waterManager._weathers = [Weather.Drizzle]
        assert.equal(_waterManager.inventory, 0)
        _waterManager.collect()
        assert.equal(_waterManager.inventory, 1)
    });

    it('collect 1st weather in list with multiple items', () =>
    {
        const _waterManager = new WaterManager()

        _waterManager._weathers = [Weather.Rain, Weather.Drizzle, Weather.Drizzle]
        assert.equal(_waterManager.inventory, 0)
        _waterManager.collect()
        assert.equal(_waterManager.inventory, 2)
    });

    it('drink should decrease inventory', () =>
    {
         const _waterManager = new WaterManager()

        _waterManager.inventory = 5
        _waterManager.drink(3)
        assert.equal(_waterManager.inventory, 2)
    });

    it('should not leave if not enough water', () =>
    {
        const _waterManager = new WaterManager()

        _waterManager.inventory = 5
        assert.equal(_waterManager.authorizeLeaving(3), false)
    });

    it('should leave if just enough water', () =>
    {
        const _waterManager = new WaterManager()

        _waterManager.inventory = 6
        assert.equal(_waterManager.authorizeLeaving(3), true)
    });

    it('should leave if more than enough water', () =>
    {
        const _waterManager = new WaterManager()
        _waterManager.inventory = 10
        assert.equal(_waterManager.authorizeLeaving(3), true)
    });

    it('should leave if weather is 3', () =>
    {
        const _waterManager = new WaterManager()
        _waterManager._weathers = [Weather.Flood , Weather.Drizzle, Weather.Rain]
        assert.equal(_waterManager.mustLeave(), true)
    });

    it('should not leave if weather is not 3 #0', () =>
    {
        const _waterManager = new WaterManager()
        _waterManager._weathers = [Weather.Drought , Weather.Flood]
        assert.equal(_waterManager.mustLeave(), false)
    });

    it('should not leave if weather is not 3 #1', () =>
    {
        const _waterManager = new WaterManager()
        _waterManager._weathers = [Weather.Drizzle , Weather.Flood]
        assert.equal(_waterManager.mustLeave(), false)
    });

    it('should not leave if weather is not 3 #2', () =>
    {
        const _waterManager = new WaterManager()
        _waterManager._weathers = [Weather.Rain , Weather.Flood]
        assert.equal(_waterManager.mustLeave(), false)
    });

    it('should not leave if weather is not 3 #3', () =>
    {
        const _waterManager = new WaterManager()
        _waterManager._weathers = [Weather.Thunderstorm , Weather.Flood]
        assert.equal(_waterManager.mustLeave(), false)
    });

    it('should not leave if weather is not 3 #3', () =>
    {
        const _waterManager = new WaterManager()
        _waterManager._weathers = [Weather.Thunderstorm , Weather.Flood]
        assert.equal(_waterManager.mustLeave(), false)
    });

    it('weathers should be 12 long', () =>
    {
        const _waterManager = new WaterManager();
        assert.equal(_waterManager._weathers.length, 12);
    });

    it('flood should be in bottom half of weather deck', () =>
    {
        const _waterManager = new WaterManager();
        let indexOfFlood;
        for (let i = 0; i < _waterManager._weathers.length; i++) {
            if (_waterManager._weathers[i] == Weather.Flood) {
                indexOfFlood = i;
                break;
            };
        };
        assert.equal(indexOfFlood > 6, true);
    });

    it('should convert to doc object', () =>
    {
        const _waterManager = new WaterManager();
        _waterManager.inventory = 10;
        const doc = _waterManager.toDoc();
        assert.deepEqual(Object.keys(doc), SERDE_KEYS);
        assert.equal(doc['waterSupply'], _waterManager.inventory);
        assert.deepEqual(doc['_weathers'], _waterManager._weathers);
    });

    it('should instantiate correctly from doc object', () =>
    {
        const doc = {
          waterSupply: 10,
          _weathers: [Weather.Thunderstorm , Weather.Flood]
        };
        const _waterManager = WaterManager.fromDoc(doc);
        assert.equal(doc['waterSupply'], _waterManager.inventory);
        assert.deepEqual(doc['_weathers'], _waterManager._weathers);
    });
});
