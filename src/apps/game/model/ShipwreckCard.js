import Utils from './Utils'

export const SERDE_KEYS = ['name', 'type', 'fr'];

const CARD_TYPE_REVOLVER = 'Revolver';
const CARD_TYPE_PERMANENT = 'Permanent';
const CARD_TYPE_RESOURCE = 'Resource';
const CARD_TYPE_DISPOSABLE = 'Disposable';
const CARD_TYPE_USELESS = 'Useless';

const CARD_TYPES = [
  CARD_TYPE_REVOLVER,
  CARD_TYPE_PERMANENT,
  CARD_TYPE_RESOURCE,
  CARD_TYPE_DISPOSABLE,
  CARD_TYPE_USELESS
]

export class ShipwreckCard{
  

    constructor(card)
    {
      this.name = card.name
      this.type = card.type
      this.fr = card.fr
    }
    
    play(){
      if (!CARD_TYPES.includes(this.type))
      {
        throw Error("Unknown card type")
      } else 
      {
        switch (this.type)
        {
          case CARD_TYPE_REVOLVER:
              break

          case CARD_TYPE_PERMANENT:
              break

          case CARD_TYPE_RESOURCE:
              break
              
          case CARD_TYPE_DISPOSABLE:
              break

          case CARD_TYPE_USELESS:
              break                        
        }
      }
    }
    
    
    toDoc()
    {
      return {
        name: this.name,
        type: this.type,
        fr: this.fr,
      }  
    }

    static fromDoc(doc)
    {
      let card;
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc)))
      {
        card = new ShipwreckCard(doc);
      }
      return card;
    }

}


class ShipwreckCards {
      
  /*
    Cards can be played, exchanged, or just displayed.
  */
  
  // Revolber + Cartouche >> kill a player
  static Revolver = new ShipwreckCard({ name: 'Revolver', type: CARD_TYPE_REVOLVER, fr: 'Revolver'}); // redistribuee apres la mort du joueur

  /* Permanent > side effect in Actions and Votes IF and ONLY DISPLAYED by player
    Cartes à effet permanent : hache, gourde,
    canne à pêche, gourdin, boule de cristal,
    etc. Quand un joueur souhaite utiliser ces
    cartes, il les place faces visibles devant lui.
    Elles peuvent lui servir à chaque tour. Si le
    joueur meurt, ses cartes à effet permanent
    ayant été utilisées sont défaussées
    (sauf exception pour le Revolver).
  */
  static Club = new ShipwreckCard({ name: 'Club', type: CARD_TYPE_PERMANENT, fr: 'Gourdin'}); //A 2 votes
  static Tole = new ShipwreckCard({ name: 'Tole', type: CARD_TYPE_PERMANENT, fr: 'Tole'}); // effet ???
  static CrystalBall = new ShipwreckCard({ name: 'CrystalBall', type: CARD_TYPE_PERMANENT, fr: 'Boule de cristal'}); // Voter en dernier
  static Axe = new ShipwreckCard({ name: 'Axe', type: CARD_TYPE_PERMANENT,  fr: 'Hache' }); // Double la collecte de bois
  static FishingPoll = new ShipwreckCard({ name: 'FishingPoll', type: CARD_TYPE_PERMANENT, fr: 'Canne a peche'}); // Double la collecte de poisson
  static Gourd = new ShipwreckCard({ name: 'Gourd', type: CARD_TYPE_PERMANENT, fr: 'Gourde'}); // Double la collecte d'eau

  /* Resources >> ACTIONABLE
    Elles peuvent
    être jouées pour le bien de la communauté et donc
    ajouter des points au compteur de vivre ou à titre
    individuel en cas de pénurie. Il est tout à fait possible
    de les donner à un autre joueur.
    >> défaussées après usage 
  */
  static GiftBasket = new ShipwreckCard({ name: 'GiftBasket', type: CARD_TYPE_RESOURCE, fr: 'Panier garni'}); //En cas de pénurie, aucun joueurs de meurt de faim ou de soif mais tout les compteurs sont remis à zéro
  static WaterBottle = new ShipwreckCard({ name: 'WaterBottle', type: CARD_TYPE_RESOURCE , fr: 'Bouteille d\'eau'}); //1 ration d'eau
  static Sandwich = new ShipwreckCard({ name: 'Sandwich', type: CARD_TYPE_RESOURCE, fr: 'Sandwich' }); //1 ration de nourriture
  static StagnantWater = new ShipwreckCard({ name: 'StagnantWater', type: CARD_TYPE_RESOURCE, fr: 'Eau croupie' }); //1 ration d'eau mais malade
  static RottenFish = new ShipwreckCard({ name: 'RottenFish', type: CARD_TYPE_RESOURCE, fr: 'Poisson pourri' }); //1 ration de nourriture mais malade
  static Sardines = new ShipwreckCard({ name: 'Sardines', type: CARD_TYPE_RESOURCE, fr: 'Sardines' }); // 3 rations de bouffe
  static Coconut = new ShipwreckCard({ name: 'Coconut', type: CARD_TYPE_RESOURCE, fr: 'Noix de coco' }); //3 rations d'eau

  /* Disposable  >> ACTIONABLE
    Cartes spéciales à usage unique : anti-venin,
    poupée vaudou, etc. Ces cartes permettent
    d’effectuer une action spécifique et sont
    défaussées après usage (sauf mention contraire
    sur la carte).
  */
  static Bullet = new ShipwreckCard({ name: 'Bullet', type: CARD_TYPE_DISPOSABLE, fr: 'Cartouche' }); //
  static AspiVenom = new ShipwreckCard({ name: 'AspiVenom', type: CARD_TYPE_DISPOSABLE, fr: 'Aspi-venin' }); //Guerri d'une morsure
  static Medication = new ShipwreckCard({ name: 'Medication', type: CARD_TYPE_DISPOSABLE, fr: 'Médicaments' }); //Guerri de l'eau croupi / poisson pourri
  static VoodooDoll = new ShipwreckCard({ name: 'VoodooDoll', type: CARD_TYPE_DISPOSABLE, fr: 'Poupée Vaudou' }); //???
  static Telescope = new ShipwreckCard({ name: 'Telescope', type: CARD_TYPE_DISPOSABLE, fr: 'Longue vue' }); //Voir les cartes d'un autre naufragé
  static WoodenPlank = new ShipwreckCard({ name: 'WoodenPlank', type: CARD_TYPE_DISPOSABLE, fr: 'Planche de bois' }); //Ajoute une place sur un radeau
  static CannibalistBBQKit = new ShipwreckCard({ name: 'CannibalistBBQKit', type: CARD_TYPE_DISPOSABLE, fr: 'Kit de BBQ cannibal' }); //Ajoute 2 rations d'eau et de nourriture par naufragés mort dans ce tour 
  static SleepingPill = new ShipwreckCard({ name: 'SleepingPill', type: CARD_TYPE_DISPOSABLE, fr: 'Somnifère' }); //Vol une carte à un naufragé 
  static Pendulum = new ShipwreckCard({ name: 'Pendulum', type: CARD_TYPE_DISPOSABLE, fr: 'Pendule' }); //Impose un choix à qqn
  static Matches = new ShipwreckCard({ name: 'Matches', type: CARD_TYPE_DISPOSABLE, fr: 'Allumettes' }); //Permet de transformer de l'eau croupie en bonne eau
  
  //Useless - can be traded
  static WinningLottoTicket = new ShipwreckCard({ name: 'WinningLottoTicket', type: CARD_TYPE_USELESS, fr: 'Ticket de loto gagnant' });
  static BoardGame = new ShipwreckCard({ name: 'BoardGame', type: CARD_TYPE_USELESS, fr: 'Jeu de société' });
  static DirtyUnderwear = new ShipwreckCard({ name: 'DirtyUnderwear', type: CARD_TYPE_USELESS, fr: 'Slip sale' });
  static TolietBroom = new ShipwreckCard({ name: 'DirtyUnderwear', type: CARD_TYPE_USELESS, fr: 'Balai à chiottes' });
  static CarKeys = new ShipwreckCard({ name: 'CarKeys', type: CARD_TYPE_USELESS, fr: 'Clefs de voitures' });

}

export const FullDeck = [
  ShipwreckCards.Revolver,

  ShipwreckCards.Club,
  ShipwreckCards.Tole,
  ShipwreckCards.CrystalBall,
  ShipwreckCards.Axe,
  ShipwreckCards.FishingPoll,
  ShipwreckCards.Gourd,

  ShipwreckCards.GiftBasket,
  ShipwreckCards.WaterBottle,
  ShipwreckCards.Sandwich,
  ShipwreckCards.StagnantWater,
  ShipwreckCards.RottenFish,
  ShipwreckCards.Sardines,
  ShipwreckCards.Coconut,

  ShipwreckCards.Bullet,
  ShipwreckCards.AspiVenom,
  ShipwreckCards.Medication,
  ShipwreckCards.VoodooDoll,
  ShipwreckCards.Telescope,
  ShipwreckCards.WoodenPlank,
  ShipwreckCards.CannibalistBBQKit,
  ShipwreckCards.SleepingPill,
  ShipwreckCards.Pendulum,
  ShipwreckCards.Matches,

  ShipwreckCards.WinningLottoTicket,
  ShipwreckCards.BoardGame,
  ShipwreckCards.DirtyUnderwear,
  ShipwreckCards.TolietBroom,
  ShipwreckCards.CarKeys,
]
