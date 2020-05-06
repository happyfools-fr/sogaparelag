import {ShipwreckCard} from '../model/ShipwreckCard'

const assert = require('assert');

describe('ShipwreckCard', function()
{

    it('toDoc', () =>
    {
        const initDoc = {
          name: "hello",
          type: "world",
          fr: "bonjour",        
        }
        const card = new ShipwreckCard(initDoc);
        const doc = card.toDoc();
        assert.equal(doc.name, card.name);
        assert.equal(doc.type, card.type);
        assert.equal(doc.fr, card.fr);

    });
    
    it('fromDoc', () =>
    {
        const doc = {
          name: "hello",
          type: "world",
          fr: "bonjour",        
        }
        const card = ShipwreckCard.fromDoc(doc);
        assert.equal(doc.name, card.name);
        assert.equal(doc.type, card.type);
        assert.equal(doc.fr, card.fr);    
    });
    
});