const nounsWithMultipleTranslations = [
  {
    article: 'der',
    original: 'Mann',
    translation: [
      { possibleTranslation: 'Man', isCorrectTranslation: true },
      { possibleTranslation: 'Boy', isCorrectTranslation: false },
      { possibleTranslation: 'Person', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Frau',
    translation: [
      { possibleTranslation: 'Woman', isCorrectTranslation: true },
      { possibleTranslation: 'Girl', isCorrectTranslation: false },
      { possibleTranslation: 'Wife', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Kind',
    translation: [
      { possibleTranslation: 'Child', isCorrectTranslation: true },
      { possibleTranslation: 'Kid', isCorrectTranslation: false },
      { possibleTranslation: 'Baby', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Katze',
    translation: [
      { possibleTranslation: 'Cat', isCorrectTranslation: true },
      { possibleTranslation: 'Dog', isCorrectTranslation: false },
      { possibleTranslation: 'Fish', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Auto',
    translation: [
      { possibleTranslation: 'Car', isCorrectTranslation: true },
      { possibleTranslation: 'Bicycle', isCorrectTranslation: false },
      { possibleTranslation: 'Bus', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Regenschirm',
    translation: [
      { possibleTranslation: 'Umbrella', isCorrectTranslation: true },
      { possibleTranslation: 'Raincoat', isCorrectTranslation: false },
      { possibleTranslation: 'Sunshade', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Tasche',
    translation: [
      { possibleTranslation: 'Bag', isCorrectTranslation: true },
      { possibleTranslation: 'Pocket', isCorrectTranslation: false },
      { possibleTranslation: 'Suitcase', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Handtuch',
    translation: [
      { possibleTranslation: 'Towel', isCorrectTranslation: true },
      { possibleTranslation: 'Blanket', isCorrectTranslation: false },
      { possibleTranslation: 'Napkin', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Regenbogen',
    translation: [
      { possibleTranslation: 'Rainbow', isCorrectTranslation: true },
      { possibleTranslation: 'Thunderstorm', isCorrectTranslation: false },
      { possibleTranslation: 'Sunset', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Treppe',
    translation: [
      { possibleTranslation: 'Stairs', isCorrectTranslation: true },
      { possibleTranslation: 'Elevator', isCorrectTranslation: false },
      { possibleTranslation: 'Ladder', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Glück',
    translation: [
      { possibleTranslation: 'Luck', isCorrectTranslation: true },
      { possibleTranslation: 'Happiness', isCorrectTranslation: false },
      { possibleTranslation: 'Misfortune', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Käse',
    translation: [
      { possibleTranslation: 'Cheese', isCorrectTranslation: true },
      { possibleTranslation: 'Bread', isCorrectTranslation: false },
      { possibleTranslation: 'Milk', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Blume',
    translation: [
      { possibleTranslation: 'Flower', isCorrectTranslation: true },
      { possibleTranslation: 'Tree', isCorrectTranslation: false },
      { possibleTranslation: 'Grass', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Kissen',
    translation: [
      { possibleTranslation: 'Pillow', isCorrectTranslation: true },
      { possibleTranslation: 'Blanket', isCorrectTranslation: false },
      { possibleTranslation: 'Cushion', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Kühlschrank',
    translation: [
      { possibleTranslation: 'Refrigerator', isCorrectTranslation: true },
      { possibleTranslation: 'Stove', isCorrectTranslation: false },
      { possibleTranslation: 'Microwave', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Apfel',
    translation: [
      { possibleTranslation: 'Apple', isCorrectTranslation: true },
      { possibleTranslation: 'Banana', isCorrectTranslation: false },
      { possibleTranslation: 'Orange', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Weg',
    translation: [
      { possibleTranslation: 'Way', isCorrectTranslation: true },
      { possibleTranslation: 'Street', isCorrectTranslation: false },
      { possibleTranslation: 'Path', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Arbeit',
    translation: [
      { possibleTranslation: 'Work', isCorrectTranslation: true },
      { possibleTranslation: 'Job', isCorrectTranslation: false },
      { possibleTranslation: 'Task', isCorrectTranslation: false },
    ],
  },

  {
    article: 'das',
    original: 'Telefon',
    translation: [
      { possibleTranslation: 'Telephone', isCorrectTranslation: true },
      { possibleTranslation: 'Computer', isCorrectTranslation: false },
      { possibleTranslation: 'Radio', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Urlaub',
    translation: [
      { possibleTranslation: 'Vacation', isCorrectTranslation: true },
      { possibleTranslation: 'Holiday', isCorrectTranslation: false },
      { possibleTranslation: 'Break', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Wolke',
    translation: [
      { possibleTranslation: 'Cloud', isCorrectTranslation: true },
      { possibleTranslation: 'Rain', isCorrectTranslation: false },
      { possibleTranslation: 'Sun', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Lied',
    translation: [
      { possibleTranslation: 'Song', isCorrectTranslation: true },
      { possibleTranslation: 'Dance', isCorrectTranslation: false },
      { possibleTranslation: 'Poem', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Ball',
    translation: [
      { possibleTranslation: 'Ball', isCorrectTranslation: true },
      { possibleTranslation: 'Bat', isCorrectTranslation: false },
      { possibleTranslation: 'Racket', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Tischtennis',
    translation: [
      { possibleTranslation: 'Table tennis', isCorrectTranslation: true },
      { possibleTranslation: 'Football', isCorrectTranslation: false },
      { possibleTranslation: 'Basketball', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Kamera',
    translation: [
      { possibleTranslation: 'Camera', isCorrectTranslation: true },
      { possibleTranslation: 'Phone', isCorrectTranslation: false },
      { possibleTranslation: 'Television', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Fenster',
    translation: [
      { possibleTranslation: 'Window', isCorrectTranslation: true },
      { possibleTranslation: 'Door', isCorrectTranslation: false },
      { possibleTranslation: 'Mirror', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Leben',
    translation: [
      { possibleTranslation: 'Life', isCorrectTranslation: true },
      { possibleTranslation: 'Existence', isCorrectTranslation: false },
      { possibleTranslation: 'Living', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Stern',
    translation: [
      { possibleTranslation: 'Star', isCorrectTranslation: true },
      { possibleTranslation: 'Planet', isCorrectTranslation: false },
      { possibleTranslation: 'Galaxy', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Nacht',
    translation: [
      { possibleTranslation: 'Night', isCorrectTranslation: true },
      { possibleTranslation: 'Darkness', isCorrectTranslation: false },
      { possibleTranslation: 'Evening', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Geld',
    translation: [
      { possibleTranslation: 'Money', isCorrectTranslation: true },
      { possibleTranslation: 'Currency', isCorrectTranslation: false },
      { possibleTranslation: 'Wealth', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Mond',
    translation: [
      { possibleTranslation: 'Moon', isCorrectTranslation: true },
      { possibleTranslation: 'Satellite', isCorrectTranslation: false },
      { possibleTranslation: 'Planet', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Zeit',
    translation: [
      { possibleTranslation: 'Time', isCorrectTranslation: true },
      { possibleTranslation: 'Clock', isCorrectTranslation: false },
      { possibleTranslation: 'Moment', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Erde',
    translation: [
      { possibleTranslation: 'Earth', isCorrectTranslation: true },
      { possibleTranslation: 'Soil', isCorrectTranslation: false },
      { possibleTranslation: 'World', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Feuer',
    translation: [
      { possibleTranslation: 'Fire', isCorrectTranslation: true },
      { possibleTranslation: 'Flame', isCorrectTranslation: false },
      { possibleTranslation: 'Heat', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Wald',
    translation: [
      { possibleTranslation: 'Forest', isCorrectTranslation: true },
      { possibleTranslation: 'Tree', isCorrectTranslation: false },
      { possibleTranslation: 'Jungle', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Luft',
    translation: [
      { possibleTranslation: 'Air', isCorrectTranslation: true },
      { possibleTranslation: 'Wind', isCorrectTranslation: false },
      { possibleTranslation: 'Breath', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Wasser',
    translation: [
      { possibleTranslation: 'Water', isCorrectTranslation: true },
      { possibleTranslation: 'River', isCorrectTranslation: false },
      { possibleTranslation: 'Liquid', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Insel',
    translation: [
      { possibleTranslation: 'Island', isCorrectTranslation: true },
      { possibleTranslation: 'Continent', isCorrectTranslation: false },
      { possibleTranslation: 'Peninsula', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Dorf',
    translation: [
      { possibleTranslation: 'Village', isCorrectTranslation: true },
      { possibleTranslation: 'Town', isCorrectTranslation: false },
      { possibleTranslation: 'City', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Brücke',
    translation: [
      { possibleTranslation: 'Bridge', isCorrectTranslation: true },
      { possibleTranslation: 'Tunnel', isCorrectTranslation: false },
      { possibleTranslation: 'Pathway', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Regen',
    translation: [
      { possibleTranslation: 'Rain', isCorrectTranslation: true },
      { possibleTranslation: 'Snow', isCorrectTranslation: false },
      { possibleTranslation: 'Sunshine', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Schule',
    translation: [
      { possibleTranslation: 'School', isCorrectTranslation: true },
      { possibleTranslation: 'University', isCorrectTranslation: false },
      { possibleTranslation: 'Library', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Schnee',
    translation: [
      { possibleTranslation: 'Snow', isCorrectTranslation: true },
      { possibleTranslation: 'Ice', isCorrectTranslation: false },
      { possibleTranslation: 'Frost', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Stadt',
    translation: [
      { possibleTranslation: 'City', isCorrectTranslation: true },
      { possibleTranslation: 'Village', isCorrectTranslation: false },
      { possibleTranslation: 'Metropolis', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Tier',
    translation: [
      { possibleTranslation: 'Animal', isCorrectTranslation: true },
      { possibleTranslation: 'Creature', isCorrectTranslation: false },
      { possibleTranslation: 'Mammal', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Vogel',
    translation: [
      { possibleTranslation: 'Bird', isCorrectTranslation: true },
      {
        possibleTranslation: 'Feathered Creature',
        isCorrectTranslation: false,
      },
      { possibleTranslation: 'Avian', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Zimmer',
    translation: [
      { possibleTranslation: 'Room', isCorrectTranslation: true },
      { possibleTranslation: 'Chamber', isCorrectTranslation: false },
      { possibleTranslation: 'Space', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Zahn',
    translation: [
      { possibleTranslation: 'Tooth', isCorrectTranslation: true },
      { possibleTranslation: 'Dent', isCorrectTranslation: false },
      { possibleTranslation: 'Molar', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Blume',
    translation: [
      { possibleTranslation: 'Flower', isCorrectTranslation: true },
      { possibleTranslation: 'Tree', isCorrectTranslation: false },
      { possibleTranslation: 'Grass', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Kissen',
    translation: [
      { possibleTranslation: 'Pillow', isCorrectTranslation: true },
      { possibleTranslation: 'Blanket', isCorrectTranslation: false },
      { possibleTranslation: 'Cushion', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Kühlschrank',
    translation: [
      { possibleTranslation: 'Refrigerator', isCorrectTranslation: true },
      { possibleTranslation: 'Freezer', isCorrectTranslation: false },
      { possibleTranslation: 'Oven', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Geschenk',
    translation: [
      { possibleTranslation: 'Gift', isCorrectTranslation: true },
      { possibleTranslation: 'Present', isCorrectTranslation: false },
      { possibleTranslation: 'Surprise', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Handy',
    translation: [
      { possibleTranslation: 'Mobile phone', isCorrectTranslation: true },
      { possibleTranslation: 'Smartphone', isCorrectTranslation: false },
      { possibleTranslation: 'Tablet', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Schokolade',
    translation: [
      { possibleTranslation: 'Chocolate', isCorrectTranslation: true },
      { possibleTranslation: 'Candy', isCorrectTranslation: false },
      { possibleTranslation: 'Cookie', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Lächeln',
    translation: [
      { possibleTranslation: 'Smile', isCorrectTranslation: true },
      { possibleTranslation: 'Laugh', isCorrectTranslation: false },
      { possibleTranslation: 'Grimace', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Hut',
    translation: [
      { possibleTranslation: 'Hat', isCorrectTranslation: true },
      { possibleTranslation: 'Cap', isCorrectTranslation: false },
      { possibleTranslation: 'Helmet', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Schere',
    translation: [
      { possibleTranslation: 'Scissors', isCorrectTranslation: true },
      { possibleTranslation: 'Knife', isCorrectTranslation: false },
      { possibleTranslation: 'Razor', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Motorrad',
    translation: [
      { possibleTranslation: 'Motorcycle', isCorrectTranslation: true },
      { possibleTranslation: 'Bicycle', isCorrectTranslation: false },
      { possibleTranslation: 'Car', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Zug',
    translation: [
      { possibleTranslation: 'Train', isCorrectTranslation: true },
      { possibleTranslation: 'Bus', isCorrectTranslation: false },
      { possibleTranslation: 'Subway', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Straße',
    translation: [
      { possibleTranslation: 'Street', isCorrectTranslation: true },
      { possibleTranslation: 'Avenue', isCorrectTranslation: false },
      { possibleTranslation: 'Lane', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Ballett',
    translation: [
      { possibleTranslation: 'Ballet', isCorrectTranslation: true },
      { possibleTranslation: 'Dance', isCorrectTranslation: false },
      { possibleTranslation: 'Opera', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Keks',
    translation: [
      { possibleTranslation: 'Cookie', isCorrectTranslation: true },
      { possibleTranslation: 'Biscuit', isCorrectTranslation: false },
      { possibleTranslation: 'Cracker', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Flasche',
    translation: [
      { possibleTranslation: 'Bottle', isCorrectTranslation: true },
      { possibleTranslation: 'Flask', isCorrectTranslation: false },
      { possibleTranslation: 'Jug', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Zelt',
    translation: [
      { possibleTranslation: 'Tent', isCorrectTranslation: true },
      { possibleTranslation: 'Shelter', isCorrectTranslation: false },
      { possibleTranslation: 'Canopy', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Wolkenkratzer',
    translation: [
      { possibleTranslation: 'Skyscraper', isCorrectTranslation: true },
      { possibleTranslation: 'Tower', isCorrectTranslation: false },
      { possibleTranslation: 'Building', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Instrument',
    translation: [
      { possibleTranslation: 'Instrument', isCorrectTranslation: true },
      { possibleTranslation: 'Tool', isCorrectTranslation: false },
      { possibleTranslation: 'Device', isCorrectTranslation: false },
    ],
  },
];

export default nounsWithMultipleTranslations;
