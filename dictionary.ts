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
    article: 'der',
    original: 'Löwe',
    translation: [
      { possibleTranslation: 'Lion', isCorrectTranslation: true },
      { possibleTranslation: 'Tiger', isCorrectTranslation: false },
      { possibleTranslation: 'Leopard', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Eule',
    translation: [
      { possibleTranslation: 'Owl', isCorrectTranslation: true },
      { possibleTranslation: 'Hawk', isCorrectTranslation: false },
      { possibleTranslation: 'Crow', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Mikrofon',
    translation: [
      { possibleTranslation: 'Microphone', isCorrectTranslation: true },
      { possibleTranslation: 'Speaker', isCorrectTranslation: false },
      { possibleTranslation: 'Amplifier', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Schildkröte',
    translation: [
      { possibleTranslation: 'Turtle', isCorrectTranslation: true },
      { possibleTranslation: 'Tortoise', isCorrectTranslation: false },
      { possibleTranslation: 'Snake', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Fisch',
    translation: [
      { possibleTranslation: 'Fish', isCorrectTranslation: true },
      { possibleTranslation: 'Shark', isCorrectTranslation: false },
      { possibleTranslation: 'Whale', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Hose',
    translation: [
      { possibleTranslation: 'Pants', isCorrectTranslation: true },
      { possibleTranslation: 'Skirt', isCorrectTranslation: false },
      { possibleTranslation: 'Shorts', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Huhn',
    translation: [
      { possibleTranslation: 'Chicken', isCorrectTranslation: true },
      { possibleTranslation: 'Duck', isCorrectTranslation: false },
      { possibleTranslation: 'Turkey', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Teppich',
    translation: [
      { possibleTranslation: 'Carpet', isCorrectTranslation: true },
      { possibleTranslation: 'Rug', isCorrectTranslation: false },
      { possibleTranslation: 'Flooring', isCorrectTranslation: false },
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
  {
    article: 'der',
    original: 'Korb',
    translation: [
      { possibleTranslation: 'Basket', isCorrectTranslation: true },
      { possibleTranslation: 'Bin', isCorrectTranslation: false },
      { possibleTranslation: 'Bucket', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Rose',
    translation: [
      { possibleTranslation: 'Rose', isCorrectTranslation: true },
      { possibleTranslation: 'Tulip', isCorrectTranslation: false },
      { possibleTranslation: 'Lily', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Kino',
    translation: [
      { possibleTranslation: 'Cinema', isCorrectTranslation: true },
      { possibleTranslation: 'Movie theater', isCorrectTranslation: false },
      { possibleTranslation: 'Film', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Kaktus',
    translation: [
      { possibleTranslation: 'Cactus', isCorrectTranslation: true },
      { possibleTranslation: 'Succulent', isCorrectTranslation: false },
      { possibleTranslation: 'Plant', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Pflanze',
    translation: [
      { possibleTranslation: 'Plant', isCorrectTranslation: true },
      { possibleTranslation: 'Flower', isCorrectTranslation: false },
      { possibleTranslation: 'Tree', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Orchester',
    translation: [
      { possibleTranslation: 'Orchestra', isCorrectTranslation: true },
      { possibleTranslation: 'Band', isCorrectTranslation: false },
      { possibleTranslation: 'Music ensemble', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Sand',
    translation: [
      { possibleTranslation: 'Sand', isCorrectTranslation: true },
      { possibleTranslation: 'Beach', isCorrectTranslation: false },
      { possibleTranslation: 'Desert', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Krokodil',
    translation: [
      { possibleTranslation: 'Crocodile', isCorrectTranslation: true },
      { possibleTranslation: 'Alligator', isCorrectTranslation: false },
      { possibleTranslation: 'Lizard', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Sturm',
    translation: [
      { possibleTranslation: 'Storm', isCorrectTranslation: true },
      { possibleTranslation: 'Wind', isCorrectTranslation: false },
      { possibleTranslation: 'Hurricane', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Turm',
    translation: [
      { possibleTranslation: 'Tower', isCorrectTranslation: true },
      { possibleTranslation: 'Castle', isCorrectTranslation: false },
      { possibleTranslation: 'Skyscraper', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Teleskop',
    translation: [
      { possibleTranslation: 'Telescope', isCorrectTranslation: true },
      { possibleTranslation: 'Microscope', isCorrectTranslation: false },
      { possibleTranslation: 'Binoculars', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Kran',
    translation: [
      { possibleTranslation: 'Crane', isCorrectTranslation: true },
      { possibleTranslation: 'Truck', isCorrectTranslation: false },
      { possibleTranslation: 'Machine', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Perle',
    translation: [
      { possibleTranslation: 'Pearl', isCorrectTranslation: true },
      { possibleTranslation: 'Gem', isCorrectTranslation: false },
      { possibleTranslation: 'Jewel', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Gedicht',
    translation: [
      { possibleTranslation: 'Poem', isCorrectTranslation: true },
      { possibleTranslation: 'Song', isCorrectTranslation: false },
      { possibleTranslation: 'Prose', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Stimme',
    translation: [
      { possibleTranslation: 'Voice', isCorrectTranslation: true },
      { possibleTranslation: 'Singing', isCorrectTranslation: false },
      { possibleTranslation: 'Sound', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Versteck',
    translation: [
      { possibleTranslation: 'Hideout', isCorrectTranslation: true },
      { possibleTranslation: 'Shelter', isCorrectTranslation: false },
      { possibleTranslation: 'Secret place', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Papier',
    translation: [
      { possibleTranslation: 'Paper', isCorrectTranslation: true },
      { possibleTranslation: 'Document', isCorrectTranslation: false },
      { possibleTranslation: 'Note', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Hund',
    translation: [
      { possibleTranslation: 'Dog', isCorrectTranslation: true },
      { possibleTranslation: 'Puppy', isCorrectTranslation: false },
      { possibleTranslation: 'Hound', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Musik',
    translation: [
      { possibleTranslation: 'Music', isCorrectTranslation: true },
      { possibleTranslation: 'Song', isCorrectTranslation: false },
      { possibleTranslation: 'Melody', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Rätsel',
    translation: [
      { possibleTranslation: 'Riddle', isCorrectTranslation: true },
      { possibleTranslation: 'Puzzle', isCorrectTranslation: false },
      { possibleTranslation: 'Enigma', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Laterne',
    translation: [
      { possibleTranslation: 'Lantern', isCorrectTranslation: true },
      { possibleTranslation: 'Streetlight', isCorrectTranslation: false },
      { possibleTranslation: 'Flashlight', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Rennen',
    translation: [
      { possibleTranslation: 'Race', isCorrectTranslation: true },
      { possibleTranslation: 'Sprint', isCorrectTranslation: false },
      { possibleTranslation: 'Marathon', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Lupe',
    translation: [
      { possibleTranslation: 'Magnifying glass', isCorrectTranslation: true },
      { possibleTranslation: 'Microscope', isCorrectTranslation: false },
      { possibleTranslation: 'Binoculars', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Apfelbaum',
    translation: [
      { possibleTranslation: 'Apple tree', isCorrectTranslation: true },
      { possibleTranslation: 'Cherry tree', isCorrectTranslation: false },
      { possibleTranslation: 'Pine tree', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Berg',
    translation: [
      { possibleTranslation: 'Mountain', isCorrectTranslation: true },
      { possibleTranslation: 'Hill', isCorrectTranslation: false },
      { possibleTranslation: 'Cliff', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Lampe',
    translation: [
      { possibleTranslation: 'Lamp', isCorrectTranslation: true },
      { possibleTranslation: 'Light', isCorrectTranslation: false },
      { possibleTranslation: 'Bulb', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Messer',
    translation: [
      { possibleTranslation: 'Knife', isCorrectTranslation: true },
      { possibleTranslation: 'Sword', isCorrectTranslation: false },
      { possibleTranslation: 'Scissors', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Welle',
    translation: [
      { possibleTranslation: 'Wave', isCorrectTranslation: true },
      { possibleTranslation: 'Surge', isCorrectTranslation: false },
      { possibleTranslation: 'Ripple', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Hemd',
    translation: [
      { possibleTranslation: 'Shirt', isCorrectTranslation: true },
      { possibleTranslation: 'Blouse', isCorrectTranslation: false },
      { possibleTranslation: 'T-shirt', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Finger',
    translation: [
      { possibleTranslation: 'Finger', isCorrectTranslation: true },
      { possibleTranslation: 'Thumb', isCorrectTranslation: false },
      { possibleTranslation: 'Digit', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Karte',
    translation: [
      { possibleTranslation: 'Map', isCorrectTranslation: true },
      { possibleTranslation: 'Card', isCorrectTranslation: false },
      { possibleTranslation: 'Chart', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Puzzle',
    translation: [
      { possibleTranslation: 'Puzzle', isCorrectTranslation: true },
      { possibleTranslation: 'Jigsaw', isCorrectTranslation: false },
      { possibleTranslation: 'Enigma', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Frosch',
    translation: [
      { possibleTranslation: 'Frog', isCorrectTranslation: true },
      { possibleTranslation: 'Toad', isCorrectTranslation: false },
      { possibleTranslation: 'Amphibian', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Gesicht',
    translation: [
      { possibleTranslation: 'Face', isCorrectTranslation: true },
      { possibleTranslation: 'Visage', isCorrectTranslation: false },
      { possibleTranslation: 'Countenance', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Handtasche',
    translation: [
      { possibleTranslation: 'Handbag', isCorrectTranslation: true },
      { possibleTranslation: 'Purse', isCorrectTranslation: false },
      { possibleTranslation: 'Clutch', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Giraffe',
    translation: [
      { possibleTranslation: 'Giraffe', isCorrectTranslation: true },
      { possibleTranslation: 'Neck horse', isCorrectTranslation: false },
      { possibleTranslation: 'Tall mammal', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Hirsch',
    translation: [
      { possibleTranslation: 'Deer', isCorrectTranslation: true },
      { possibleTranslation: 'Stag', isCorrectTranslation: false },
      { possibleTranslation: 'Buck', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Wunderlampe',
    translation: [
      { possibleTranslation: 'Magic lamp', isCorrectTranslation: true },
      { possibleTranslation: 'Genie lamp', isCorrectTranslation: false },
      { possibleTranslation: 'Enchanted lamp', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Schlüssel',
    translation: [
      { possibleTranslation: 'Key', isCorrectTranslation: true },
      { possibleTranslation: 'Lock', isCorrectTranslation: false },
      { possibleTranslation: 'Code', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Brille',
    translation: [
      { possibleTranslation: 'Glasses', isCorrectTranslation: true },
      { possibleTranslation: 'Eyewear', isCorrectTranslation: false },
      { possibleTranslation: 'Spectacles', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Fahrrad',
    translation: [
      { possibleTranslation: 'Bicycle', isCorrectTranslation: true },
      { possibleTranslation: 'Bike', isCorrectTranslation: false },
      { possibleTranslation: 'Cycling', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Kirsche',
    translation: [
      { possibleTranslation: 'Cherry', isCorrectTranslation: true },
      { possibleTranslation: 'Berry', isCorrectTranslation: false },
      { possibleTranslation: 'Fruit', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Tiger',
    translation: [
      { possibleTranslation: 'Tiger', isCorrectTranslation: true },
      { possibleTranslation: 'Wildcat', isCorrectTranslation: false },
      { possibleTranslation: 'Feline', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Schulter',
    translation: [
      { possibleTranslation: 'Shoulder', isCorrectTranslation: true },
      { possibleTranslation: 'Arm', isCorrectTranslation: false },
      { possibleTranslation: 'Joint', isCorrectTranslation: false },
    ],
  },
];

export default nounsWithMultipleTranslations;
