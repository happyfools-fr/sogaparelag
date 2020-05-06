import ShipwreckManager from '../model/ShipwreckManager'
import {FullDeck} from '../model/ShipwreckCard'

const assert = require('assert');

describe('ShipwreckManager', function()
{

    it('default _deck is a shuffled FullDeck', () =>
    {
        const _shipwreckManager = new ShipwreckManager();
        assert.equal(_shipwreckManager._deck.length, FullDeck.length);
    });
    
    it('default _deck is overridden with deck in constructor argument ', () =>
    {
        let _shipwreckManager = new ShipwreckManager([]);
        assert.equal(_shipwreckManager._deck.length, 0);
        
        _shipwreckManager = new ShipwreckManager([1, 2, 5]);
        assert.equal(_shipwreckManager._deck.length, 3);
    });
    
    it('pickOne method pops out a card from _deck and return the card', () =>
    {
      const _shipwreckManager = new ShipwreckManager();
      assert.equal(_shipwreckManager._deck.length, FullDeck.length);
      
      let card = _shipwreckManager.pickOne()
      assert(!_shipwreckManager._deck.includes(card));
      assert(FullDeck.includes(card));
      assert.equal(_shipwreckManager._deck.length, FullDeck.length - 1);

      card = _shipwreckManager.pickOne()
      assert(!_shipwreckManager._deck.includes(card));
      assert(FullDeck.includes(card));
      assert.equal(_shipwreckManager._deck.length, FullDeck.length - 2);
    });
    
    it('pickOne method returns null if _deck is empty', () =>
    {
      const _shipwreckManager = new ShipwreckManager([]);
      assert.equal(_shipwreckManager._deck.length, 0);
      
      let card = _shipwreckManager.pickOne()
      assert.equal(card, null);
    });
  
});