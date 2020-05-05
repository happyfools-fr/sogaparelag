
class ShipwreckCard {
  
  static Revolver = { name: 'Revolver', type: 'Revolver', fr: 'Revolver'};

  // Disposable > ACTIONABLE
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

  //Permanent > side effect in Actions and Votes
  static Club = { name: 'Club', type: 'Permanent', fr: 'Gourdin'}; //A 2 votes
  static Tole = { name: 'Tole', type: 'Permanent', fr: 'Tole'}; // effet ???
  static CrystalBall = { name: 'CrystalBall', type: 'Permanent' , fr: 'Boule de cristal'}; // Voter en dernier
  static Axe = { name: 'Axe', type: 'Permanent',  fr: 'Hache' }; // Double la collecte de bois
  static FishingPoll = { name: 'FishingPoll', type: 'Permanent' , fr: 'Canne a peche'}; // Double la collecte de poisson
  static Gourd = { name: 'Gourd', type: 'Permanent' , fr: 'Gourde'}; // Double la collecte d'eau

  // Resources
  static GiftBasket = { name: 'GiftBasket', type: 'Resource' , fr: 'Panier garni'}; //En cas de pénurie, aucun joueurs de meurt de faim ou de soif mais tout les compteurs sont remis à zéro
  static WaterBottle = { name: 'WaterBottle', type: 'Resource' , fr: 'Bouteille d\'eau'}; //1 ration d'eau
  static Sandwich = { name: 'Sandwich', type: 'Resource', fr: 'Sandwich' }; //1 ration de nourriture
  static StagnantWater = { name: 'StagnantWater', type: 'Resource', fr: 'Eau croupie' }; //1 ration d'eau mais malade
  static RottenFish = { name: 'RottenFish', type: 'Resource', fr: 'Poisson pourri' }; //1 ration de nourriture mais malade
  static Sardines = { name: 'Sardines', type: 'Resource', fr: 'Sardines' }; // 3 rations de bouffe
  static Coconut = { name: 'Coconut', type: 'Resource', fr: 'Noix de coco' }; //3 rations d'eau

  //Useless
  static WinningLottoTicket = { name: 'WinningLottoTicket', type: 'Useless', fr: 'Ticket de loto gagnant' };
  static BoardGame = { name: 'BoardGame', type: 'Useless', fr: 'Jeu de société' };
  static DirtyUnderwear = { name: 'DirtyUnderwear', type: 'Useless', fr: 'Slip sale' };
  static TolietBroom = { name: 'DirtyUnderwear', type: 'Useless', fr: 'Balai à chiottes' };
  static CarKeys = { name: 'CarKeys', type: 'Useless', fr: 'Clefs de voitures' };

  // Others ??
  
}