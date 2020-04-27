import {WaterManager} from '../model/WaterManager'

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
        _waterManager._weathers = [3, 1, 0]
        assert.equal(_waterManager.mustLeave(), true)
    });

    it('should not leave if weather is not 3 #0', () => 
    {
        const _waterManager = new WaterManager()
        _waterManager._weathers = [0, 3, 0]
        assert.equal(_waterManager.mustLeave(), false)
    });

    it('should not leave if weather is not 3 #1', () => 
    {
        const _waterManager = new WaterManager()
        _waterManager._weathers = [1, 3, 0]
        assert.equal(_waterManager.mustLeave(), false)
    });

    it('should not leave if weather is not 3 #2', () => 
    {
        const _waterManager = new WaterManager()
        _waterManager._weathers = [2, 3, 0]
        assert.equal(_waterManager.mustLeave(), false)
    });
    
    it('should convert to doc object', () =>
    {
        const _waterManager = new WaterManager()
        _waterManager.inventory = 10;
        const doc = _waterManager.toDoc()
        assert.deepEqual(Object.keys(doc), ['waterSupply', '_weathers']);
        assert.equal(doc['waterSupply'], _waterManager.inventory);
        assert.deepEqual(doc['_weathers'], _waterManager._weathers);
    });
    
    it('should instantiate correctly from doc object', () =>
    {
        const doc = {
          waterSupply: 10,
          _weathers: [0, 4, 2],
        };
        const _waterManager = new WaterManager();
        _waterManager.fromDoc(doc);
        assert.equal(doc['waterSupply'], _waterManager.inventory);
        assert.deepEqual(doc['_weathers'], _waterManager._weathers);
    });
});
