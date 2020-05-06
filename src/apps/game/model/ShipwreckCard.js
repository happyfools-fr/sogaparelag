
export default class ShipwreckCard {
  
  /*
    Cards can be played, exchanged, or just displayed.
  */
  
  // Revolber + Cartouche >> kill a player
  static Revolver = { name: 'Revolver', type: 'Revolver', fr: 'Revolver'}; // redistribuee apres la mort du joueur

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
  static Club = { name: 'Club', type: 'Permanent', fr: 'Gourdin'}; //A 2 votes
  static Tole = { name: 'Tole', type: 'Permanent', fr: 'Tole'}; // effet ???
  static CrystalBall = { name: 'CrystalBall', type: 'Permanent' , fr: 'Boule de cristal'}; // Voter en dernier
  static Axe = { name: 'Axe', type: 'Permanent',  fr: 'Hache' }; // Double la collecte de bois
  static FishingPoll = { name: 'FishingPoll', type: 'Permanent' , fr: 'Canne a peche'}; // Double la collecte de poisson
  static Gourd = { name: 'Gourd', type: 'Permanent' , fr: 'Gourde'}; // Double la collecte d'eau

  /* Resources >> ACTIONABLE
    Elles peuvent
    être jouées pour le bien de la communauté et donc
    ajouter des points au compteur de vivre ou à titre
    individuel en cas de pénurie. Il est tout à fait possible
    de les donner à un autre joueur.
    >> défaussées après usage 
  */
  static GiftBasket = { name: 'GiftBasket', type: 'Resource' , fr: 'Panier garni'}; //En cas de pénurie, aucun joueurs de meurt de faim ou de soif mais tout les compteurs sont remis à zéro
  static WaterBottle = { name: 'WaterBottle', type: 'Resource' , fr: 'Bouteille d\'eau'}; //1 ration d'eau
  static Sandwich = { name: 'Sandwich', type: 'Resource', fr: 'Sandwich' }; //1 ration de nourriture
  static StagnantWater = { name: 'StagnantWater', type: 'Resource', fr: 'Eau croupie' }; //1 ration d'eau mais malade
  static RottenFish = { name: 'RottenFish', type: 'Resource', fr: 'Poisson pourri' }; //1 ration de nourriture mais malade
  static Sardines = { name: 'Sardines', type: 'Resource', fr: 'Sardines' }; // 3 rations de bouffe
  static Coconut = { name: 'Coconut', type: 'Resource', fr: 'Noix de coco' }; //3 rations d'eau

  /* Disposable  >> ACTIONABLE
    Cartes spéciales à usage unique : anti-venin,
    poupée vaudou, etc. Ces cartes permettent
    d’effectuer une action spécifique et sont
    défaussées après usage (sauf mention contraire
    sur la carte).
  */
  static Bullet = { name: 'Bullet', type: 'Disposable', fr: 'Cartouche' }; //
  static AspiVenom = { name: 'AspiVenom', type: 'Disposable', fr: 'Aspi-venin' }; //Guerri d'une morsure
  static Medication = { name: 'Medication', type: 'Disposable', fr: 'Médicaments' }; //Guerri de l'eau croupi / poisson pourri
  static VoodooDoll = { name: 'VoodooDoll', type: 'Disposable', fr: 'Poupée Vaudou' }; //???
  static Telescope = { name: 'Telescope', type: 'Disposable', fr: 'Longue vue' }; //Voir les cartes d'un autre naufragé
  static WoodenPlank = { name: 'WoodenPlank', type: 'Disposable', fr: 'Planche de bois' }; //Ajoute une place sur un radeau
  static CannibalistBBQKit = { name: 'CannibalistBBQKit', type: 'Disposable', fr: 'Kit de BBQ cannibal' }; //Ajoute 2 rations d'eau et de nourriture par naufragés mort dans ce tour 
  static SleepingPill = { name: 'SleepingPill', type: 'Disposable', fr: 'Somnifère' }; //Vol une carte à un naufragé 
  static Pendulum = { name: 'Pendulum', type: 'Disposable', fr: 'Pendule' }; //Impose un choix à qqn
  static Matches = { name: 'Matches', type: 'Disposable', fr: 'Allumettes' }; //Permet de transformer de l'eau croupie en bonne eau
  
  //Useless - can be traded
  static WinningLottoTicket = { name: 'WinningLottoTicket', type: 'Useless', fr: 'Ticket de loto gagnant' };
  static BoardGame = { name: 'BoardGame', type: 'Useless', fr: 'Jeu de société' };
  static DirtyUnderwear = { name: 'DirtyUnderwear', type: 'Useless', fr: 'Slip sale' };
  static TolietBroom = { name: 'DirtyUnderwear', type: 'Useless', fr: 'Balai à chiottes' };
  static CarKeys = { name: 'CarKeys', type: 'Useless', fr: 'Clefs de voitures' };

  // Others ??
  
}

export const FullDeck = [
  ShipwreckCard.Revolver,

  ShipwreckCard.Club,
  ShipwreckCard.Tole,
  ShipwreckCard.CrystalBall,
  ShipwreckCard.Axe,
  ShipwreckCard.FishingPoll,
  ShipwreckCard.Gourd,

  ShipwreckCard.GiftBasket,
  ShipwreckCard.WaterBottle,
  ShipwreckCard.Sandwich,
  ShipwreckCard.StagnantWater,
  ShipwreckCard.RottenFish,
  ShipwreckCard.Sardines,
  ShipwreckCard.Coconut,

  ShipwreckCard.Bullet,
  ShipwreckCard.AspiVenom,
  ShipwreckCard.Medication,
  ShipwreckCard.VoodooDoll,
  ShipwreckCard.Telescope,
  ShipwreckCard.WoodenPlank,
  ShipwreckCard.CannibalistBBQKit,
  ShipwreckCard.SleepingPill,
  ShipwreckCard.Pendulum,
  ShipwreckCard.Matches,

  ShipwreckCard.WinningLottoTicket,
  ShipwreckCard.BoardGame,
  ShipwreckCard.DirtyUnderwear,
  ShipwreckCard.TolietBroom,
  ShipwreckCard.CarKeys,
]
