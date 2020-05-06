import ShipwreckCard, {FullDeck} from './ShipwreckCard'
import shuffle from 'shuffle-array'

export default class ShipwreckManager {

  constructor(deck = null)
  {
      this._deck = (deck != null) ? deck : this._initDeck()
  }

  _initDeck()
  {
      const shipwreckDeck = FullDeck.slice();
      shuffle(shipwreckDeck);
      return shipwreckDeck;
  }
  
  /*Pop the last card of the deck and return it*/
  pickOne()
  {
      if(this._deck.length > 0)
      {
        const card = this._deck.pop();
        return card;
      }
      return null;
  }

}