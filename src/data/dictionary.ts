import { DictionaryWord } from '../types/interfaces';

const nounsWithMultipleTranslations: DictionaryWord[] = [
  {
    article: 'der',
    original: 'Mann',
    translation: [
      { possibleTranslation: 'Boy', isCorrectTranslation: false },
      { possibleTranslation: 'Man', isCorrectTranslation: true },
      { possibleTranslation: 'Person', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Frau',
    translation: [
      { possibleTranslation: 'Girl', isCorrectTranslation: false },
      { possibleTranslation: 'Sister', isCorrectTranslation: false },
      { possibleTranslation: 'Woman', isCorrectTranslation: true },
    ],
  },
  {
    article: 'das',
    original: 'Kind',
    translation: [
      { possibleTranslation: 'Teenager', isCorrectTranslation: false },
      { possibleTranslation: 'Child', isCorrectTranslation: true },
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
      { possibleTranslation: 'Bicycle', isCorrectTranslation: false },
      { possibleTranslation: 'Car', isCorrectTranslation: true },
      { possibleTranslation: 'Bus', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Regenschirm',
    translation: [
      { possibleTranslation: 'Raincoat', isCorrectTranslation: false },
      { possibleTranslation: 'Sunshade', isCorrectTranslation: false },
      { possibleTranslation: 'Umbrella', isCorrectTranslation: true },
    ],
  },
  {
    article: 'die',
    original: 'Tasche',
    translation: [
      { possibleTranslation: 'Wallet', isCorrectTranslation: false },
      { possibleTranslation: 'Bag', isCorrectTranslation: true },
      { possibleTranslation: 'Suitcase', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Handtuch',
    translation: [
      { possibleTranslation: 'Blanket', isCorrectTranslation: false },
      { possibleTranslation: 'Napkin', isCorrectTranslation: false },
      { possibleTranslation: 'Towel', isCorrectTranslation: true },
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
      { possibleTranslation: 'Elevator', isCorrectTranslation: false },
      { possibleTranslation: 'Stairs', isCorrectTranslation: true },
      { possibleTranslation: 'Ladder', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Glück',
    translation: [
      { possibleTranslation: 'Luck', isCorrectTranslation: true },
      { possibleTranslation: 'Courage', isCorrectTranslation: false },
      { possibleTranslation: 'Misfortune', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Käse',
    translation: [
      { possibleTranslation: 'Bread', isCorrectTranslation: false },
      { possibleTranslation: 'Milk', isCorrectTranslation: false },
      { possibleTranslation: 'Cheese', isCorrectTranslation: true },
    ],
  },
  {
    article: 'das',
    original: 'Kissen',
    translation: [
      { possibleTranslation: 'Pillow', isCorrectTranslation: true },
      { possibleTranslation: 'Blanket', isCorrectTranslation: false },
      { possibleTranslation: 'Mattress', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Kühlschrank',
    translation: [
      { possibleTranslation: 'Microwave', isCorrectTranslation: false },
      { possibleTranslation: 'Refrigerator', isCorrectTranslation: true },
      { possibleTranslation: 'Stove', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Apfel',
    translation: [
      { possibleTranslation: 'Banana', isCorrectTranslation: false },
      { possibleTranslation: 'Apple', isCorrectTranslation: true },
      { possibleTranslation: 'Orange', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Weg',
    translation: [
      { possibleTranslation: 'Street', isCorrectTranslation: false },
      { possibleTranslation: 'Wall', isCorrectTranslation: false },
      { possibleTranslation: 'Way', isCorrectTranslation: true },
    ],
  },
  {
    article: 'die',
    original: 'Arbeit',
    translation: [
      { possibleTranslation: 'Rest', isCorrectTranslation: false },
      { possibleTranslation: 'Work', isCorrectTranslation: true },
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
      { possibleTranslation: 'Weekend', isCorrectTranslation: false },
      { possibleTranslation: 'Break', isCorrectTranslation: false },
      { possibleTranslation: 'Vacation', isCorrectTranslation: true },
    ],
  },
  {
    article: 'die',
    original: 'Wolke',
    translation: [
      { possibleTranslation: 'Rain', isCorrectTranslation: false },
      { possibleTranslation: 'Cloud', isCorrectTranslation: true },
      { possibleTranslation: 'Sun', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Lied',
    translation: [
      { possibleTranslation: 'Dance', isCorrectTranslation: false },
      { possibleTranslation: 'Song', isCorrectTranslation: true },
      { possibleTranslation: 'Poem', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
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
      { possibleTranslation: 'Football', isCorrectTranslation: false },
      { possibleTranslation: 'Basketball', isCorrectTranslation: false },
      { possibleTranslation: 'Table tennis', isCorrectTranslation: true },
    ],
  },
  {
    article: 'die',
    original: 'Kamera',
    translation: [
      { possibleTranslation: 'Phone', isCorrectTranslation: false },
      { possibleTranslation: 'Camera', isCorrectTranslation: true },
      { possibleTranslation: 'Television', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Fenster',
    translation: [
      { possibleTranslation: 'Door', isCorrectTranslation: false },
      { possibleTranslation: 'Mirror', isCorrectTranslation: false },
      { possibleTranslation: 'Window', isCorrectTranslation: true },
    ],
  },
  {
    article: 'das',
    original: 'Leben',
    translation: [
      { possibleTranslation: 'Life', isCorrectTranslation: true },
      { possibleTranslation: 'Death', isCorrectTranslation: false },
      { possibleTranslation: 'Health', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Stern',
    translation: [
      { possibleTranslation: 'Planet', isCorrectTranslation: false },
      { possibleTranslation: 'Star', isCorrectTranslation: true },
      { possibleTranslation: 'Galaxy', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Löwe',
    translation: [
      { possibleTranslation: 'Tiger', isCorrectTranslation: false },
      { possibleTranslation: 'Leopard', isCorrectTranslation: false },
      { possibleTranslation: 'Lion', isCorrectTranslation: true },
    ],
  },
  {
    article: 'die',
    original: 'Eule',
    translation: [
      { possibleTranslation: 'Hawk', isCorrectTranslation: false },
      { possibleTranslation: 'Owl', isCorrectTranslation: true },
      { possibleTranslation: 'Crow', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Mikrofon',
    translation: [
      { possibleTranslation: 'Speaker', isCorrectTranslation: false },
      { possibleTranslation: 'Amplifier', isCorrectTranslation: false },
      { possibleTranslation: 'Microphone', isCorrectTranslation: true },
    ],
  },
  {
    article: 'die',
    original: 'Schildkröte',
    translation: [
      { possibleTranslation: 'Turtle', isCorrectTranslation: true },
      { possibleTranslation: 'Lizard', isCorrectTranslation: false },
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
      { possibleTranslation: 'Skirt', isCorrectTranslation: false },
      { possibleTranslation: 'Pants', isCorrectTranslation: true },
      { possibleTranslation: 'Shorts', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Huhn',
    translation: [
      { possibleTranslation: 'Duck', isCorrectTranslation: false },
      { possibleTranslation: 'Turkey', isCorrectTranslation: false },
      { possibleTranslation: 'Chicken', isCorrectTranslation: true },
    ],
  },
  {
    article: 'der',
    original: 'Teppich',
    translation: [
      { possibleTranslation: 'Curtain', isCorrectTranslation: false },
      { possibleTranslation: 'Carpet', isCorrectTranslation: true },
      { possibleTranslation: 'Flooring', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Nacht',
    translation: [
      { possibleTranslation: 'Darkness', isCorrectTranslation: false },
      { possibleTranslation: 'Evening', isCorrectTranslation: false },
      { possibleTranslation: 'Night', isCorrectTranslation: true },
    ],
  },
  {
    article: 'das',
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
      { possibleTranslation: 'Satellite', isCorrectTranslation: false },
      { possibleTranslation: 'Moon', isCorrectTranslation: true },
      { possibleTranslation: 'Planet', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Zeit',
    translation: [
      { possibleTranslation: 'Clock', isCorrectTranslation: false },
      { possibleTranslation: 'Moment', isCorrectTranslation: false },
      { possibleTranslation: 'Time', isCorrectTranslation: true },
    ],
  },
  {
    article: 'die',
    original: 'Erde',
    translation: [
      { possibleTranslation: 'Earth', isCorrectTranslation: true },
      { possibleTranslation: 'Stone', isCorrectTranslation: false },
      { possibleTranslation: 'Sky', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Feuer',
    translation: [
      { possibleTranslation: 'Flame', isCorrectTranslation: false },
      { possibleTranslation: 'Fire', isCorrectTranslation: true },
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
      { possibleTranslation: 'Wind', isCorrectTranslation: false },
      { possibleTranslation: 'Breath', isCorrectTranslation: false },
      { possibleTranslation: 'Air', isCorrectTranslation: true },
    ],
  },
  {
    article: 'das',
    original: 'Wasser',
    translation: [
      { possibleTranslation: 'River', isCorrectTranslation: false },
      { possibleTranslation: 'Liquid', isCorrectTranslation: false },
      { possibleTranslation: 'Water', isCorrectTranslation: true },
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
      { possibleTranslation: 'Town', isCorrectTranslation: false },
      { possibleTranslation: 'Village', isCorrectTranslation: true },
      { possibleTranslation: 'City', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Brücke',
    translation: [
      { possibleTranslation: 'Tunnel', isCorrectTranslation: false },
      { possibleTranslation: 'Bridge', isCorrectTranslation: true },
      { possibleTranslation: 'Pathway', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Regen',
    translation: [
      { possibleTranslation: 'Snow', isCorrectTranslation: false },
      { possibleTranslation: 'Sunshine', isCorrectTranslation: false },
      { possibleTranslation: 'Rain', isCorrectTranslation: true },
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
      { possibleTranslation: 'Ice', isCorrectTranslation: false },
      { possibleTranslation: 'Frost', isCorrectTranslation: false },
      { possibleTranslation: 'Snow', isCorrectTranslation: true },
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
      { possibleTranslation: 'Plant', isCorrectTranslation: false },
      { possibleTranslation: 'Animal', isCorrectTranslation: true },
      { possibleTranslation: 'Mammal', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Vogel',
    translation: [
      { possibleTranslation: 'Bat', isCorrectTranslation: false },
      { possibleTranslation: 'Bird', isCorrectTranslation: true },
      { possibleTranslation: 'Butterfly', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Zimmer',
    translation: [
      { possibleTranslation: 'Hallway', isCorrectTranslation: false },
      { possibleTranslation: 'Space', isCorrectTranslation: false },
      { possibleTranslation: 'Room', isCorrectTranslation: true },
    ],
  },
  {
    article: 'der',
    original: 'Zahn',
    translation: [
      { possibleTranslation: 'Dent', isCorrectTranslation: false },
      { possibleTranslation: 'Tooth', isCorrectTranslation: true },
      { possibleTranslation: 'Molar', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Blume',
    translation: [
      { possibleTranslation: 'Tree', isCorrectTranslation: false },
      { possibleTranslation: 'Grass', isCorrectTranslation: false },
      { possibleTranslation: 'Flower', isCorrectTranslation: true },
    ],
  },
  {
    article: 'das',
    original: 'Geschenk',
    translation: [
      { possibleTranslation: 'Gift', isCorrectTranslation: true },
      { possibleTranslation: 'Parcel', isCorrectTranslation: false },
      { possibleTranslation: 'Surprise', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Handy',
    translation: [
      { possibleTranslation: 'Laptop', isCorrectTranslation: false },
      { possibleTranslation: 'Tablet', isCorrectTranslation: false },
      { possibleTranslation: 'Mobile phone', isCorrectTranslation: true },
    ],
  },
  {
    article: 'die',
    original: 'Schokolade',
    translation: [
      { possibleTranslation: 'Candy', isCorrectTranslation: false },
      { possibleTranslation: 'Chocolate', isCorrectTranslation: true },
      { possibleTranslation: 'Cookie', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Lächeln',
    translation: [
      { possibleTranslation: 'Laugh', isCorrectTranslation: false },
      { possibleTranslation: 'Grimace', isCorrectTranslation: false },
      { possibleTranslation: 'Smile', isCorrectTranslation: true },
    ],
  },
  {
    article: 'der',
    original: 'Hut',
    translation: [
      { possibleTranslation: 'Cap', isCorrectTranslation: false },
      { possibleTranslation: 'Helmet', isCorrectTranslation: false },
      { possibleTranslation: 'Hat', isCorrectTranslation: true },
    ],
  },
  {
    article: 'die',
    original: 'Schere',
    translation: [
      { possibleTranslation: 'Knife', isCorrectTranslation: false },
      { possibleTranslation: 'Scissors', isCorrectTranslation: true },
      { possibleTranslation: 'Razor', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Motorrad',
    translation: [
      { possibleTranslation: 'Bicycle', isCorrectTranslation: false },
      { possibleTranslation: 'Motorcycle', isCorrectTranslation: true },
      { possibleTranslation: 'Car', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Zug',
    translation: [
      { possibleTranslation: 'Bus', isCorrectTranslation: false },
      { possibleTranslation: 'Subway', isCorrectTranslation: false },
      { possibleTranslation: 'Train', isCorrectTranslation: true },
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
      { possibleTranslation: 'Cake', isCorrectTranslation: false },
      { possibleTranslation: 'Cookie', isCorrectTranslation: true },
      { possibleTranslation: 'Cracker', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Flasche',
    translation: [
      { possibleTranslation: 'Flask', isCorrectTranslation: false },
      { possibleTranslation: 'Jug', isCorrectTranslation: false },
      { possibleTranslation: 'Bottle', isCorrectTranslation: true },
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
    article: 'der',
    original: 'Wolkenkratzer',
    translation: [
      { possibleTranslation: 'Tower', isCorrectTranslation: false },
      { possibleTranslation: 'Building', isCorrectTranslation: false },
      { possibleTranslation: 'Skyscraper', isCorrectTranslation: true },
    ],
  },
  {
    article: 'das',
    original: 'Instrument',
    translation: [
      { possibleTranslation: 'Tool', isCorrectTranslation: false },
      { possibleTranslation: 'Instrument', isCorrectTranslation: true },
      { possibleTranslation: 'Device', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Korb',
    translation: [
      { possibleTranslation: 'Bin', isCorrectTranslation: false },
      { possibleTranslation: 'Basket', isCorrectTranslation: true },
      { possibleTranslation: 'Bucket', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Rose',
    translation: [
      { possibleTranslation: 'Tulip', isCorrectTranslation: false },
      { possibleTranslation: 'Lily', isCorrectTranslation: false },
      { possibleTranslation: 'Rose', isCorrectTranslation: true },
    ],
  },
  {
    article: 'das',
    original: 'Kino',
    translation: [
      { possibleTranslation: 'Cinema', isCorrectTranslation: true },
      { possibleTranslation: 'Theater', isCorrectTranslation: false },
      { possibleTranslation: 'Film', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Kaktus',
    translation: [
      { possibleTranslation: 'Cactus', isCorrectTranslation: true },
      { possibleTranslation: 'Succulent', isCorrectTranslation: false },
      { possibleTranslation: 'Palm tree', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Pflanze',
    translation: [
      { possibleTranslation: 'Flower', isCorrectTranslation: false },
      { possibleTranslation: 'Tree', isCorrectTranslation: false },
      { possibleTranslation: 'Plant', isCorrectTranslation: true },
    ],
  },
  {
    article: 'das',
    original: 'Orchester',
    translation: [
      { possibleTranslation: 'Band', isCorrectTranslation: false },
      { possibleTranslation: 'Orchestra', isCorrectTranslation: true },
      { possibleTranslation: 'Choir', isCorrectTranslation: false },
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
    article: 'das',
    original: 'Krokodil',
    translation: [
      { possibleTranslation: 'Crocodile', isCorrectTranslation: true },
      { possibleTranslation: 'Alligator', isCorrectTranslation: false },
      { possibleTranslation: 'Lizard', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Sturm',
    translation: [
      { possibleTranslation: 'Wind', isCorrectTranslation: false },
      { possibleTranslation: 'Storm', isCorrectTranslation: true },
      { possibleTranslation: 'Hurricane', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Turm',
    translation: [
      { possibleTranslation: 'Castle', isCorrectTranslation: false },
      { possibleTranslation: 'Skyscraper', isCorrectTranslation: false },
      { possibleTranslation: 'Tower', isCorrectTranslation: true },
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
      { possibleTranslation: 'Truck', isCorrectTranslation: false },
      { possibleTranslation: 'Machine', isCorrectTranslation: false },
      { possibleTranslation: 'Crane', isCorrectTranslation: true },
    ],
  },
  {
    article: 'die',
    original: 'Perle',
    translation: [
      { possibleTranslation: 'Gem', isCorrectTranslation: false },
      { possibleTranslation: 'Pearl', isCorrectTranslation: true },
      { possibleTranslation: 'Jewel', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Gedicht',
    translation: [
      { possibleTranslation: 'Song', isCorrectTranslation: false },
      { possibleTranslation: 'Prose', isCorrectTranslation: false },
      { possibleTranslation: 'Poem', isCorrectTranslation: true },
    ],
  },
  {
    article: 'die',
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
      { possibleTranslation: 'Shelter', isCorrectTranslation: false },
      { possibleTranslation: 'Prison', isCorrectTranslation: false },
      { possibleTranslation: 'Hideout', isCorrectTranslation: true },
    ],
  },
  {
    article: 'das',
    original: 'Papier',
    translation: [
      { possibleTranslation: 'Document', isCorrectTranslation: false },
      { possibleTranslation: 'Note', isCorrectTranslation: false },
      { possibleTranslation: 'Paper', isCorrectTranslation: true },
    ],
  },
  {
    article: 'der',
    original: 'Hund',
    translation: [
      { possibleTranslation: 'Puppy', isCorrectTranslation: false },
      { possibleTranslation: 'Dog', isCorrectTranslation: true },
      { possibleTranslation: 'Wolf', isCorrectTranslation: false },
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
      { possibleTranslation: 'Joke', isCorrectTranslation: false },
      { possibleTranslation: 'Question', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Laterne',
    translation: [
      { possibleTranslation: 'Streetlight', isCorrectTranslation: false },
      { possibleTranslation: 'Lantern', isCorrectTranslation: true },
      { possibleTranslation: 'Flashlight', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Rennen',
    translation: [
      { possibleTranslation: 'Sprint', isCorrectTranslation: false },
      { possibleTranslation: 'Race', isCorrectTranslation: true },
      { possibleTranslation: 'Marathon', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Lupe',
    translation: [
      { possibleTranslation: 'Microscope', isCorrectTranslation: false },
      { possibleTranslation: 'Binoculars', isCorrectTranslation: false },
      { possibleTranslation: 'Magnifying glass', isCorrectTranslation: true },
    ],
  },
  {
    article: 'der',
    original: 'Apfelbaum',
    translation: [
      { possibleTranslation: 'Cherry tree', isCorrectTranslation: false },
      { possibleTranslation: 'Pine tree', isCorrectTranslation: false },
      { possibleTranslation: 'Apple tree', isCorrectTranslation: true },
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
      { possibleTranslation: 'Sword', isCorrectTranslation: false },
      { possibleTranslation: 'Knife', isCorrectTranslation: true },
      { possibleTranslation: 'Scissors', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Welle',
    translation: [
      { possibleTranslation: 'Surge', isCorrectTranslation: false },
      { possibleTranslation: 'Wave', isCorrectTranslation: true },
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
      { possibleTranslation: 'Thumb', isCorrectTranslation: false },
      { possibleTranslation: 'Finger', isCorrectTranslation: true },
      { possibleTranslation: 'Toe', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Karte',
    translation: [
      { possibleTranslation: 'Book', isCorrectTranslation: false },
      { possibleTranslation: 'Chart', isCorrectTranslation: false },
      { possibleTranslation: 'Map', isCorrectTranslation: true },
    ],
  },
  {
    article: 'das',
    original: 'Puzzle',
    translation: [
      { possibleTranslation: 'Board game', isCorrectTranslation: false },
      { possibleTranslation: 'Puzzle', isCorrectTranslation: true },
      { possibleTranslation: 'Enigma', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Frosch',
    translation: [
      { possibleTranslation: 'Frog', isCorrectTranslation: true },
      { possibleTranslation: 'Toad', isCorrectTranslation: false },
      { possibleTranslation: 'Lizard', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Gesicht',
    translation: [
      { possibleTranslation: 'Head', isCorrectTranslation: false },
      { possibleTranslation: 'Neck', isCorrectTranslation: false },
      { possibleTranslation: 'Face', isCorrectTranslation: true },
    ],
  },
  {
    article: 'die',
    original: 'Handtasche',
    translation: [
      { possibleTranslation: 'Backpack', isCorrectTranslation: false },
      { possibleTranslation: 'Wallet', isCorrectTranslation: false },
      { possibleTranslation: 'Handbag', isCorrectTranslation: true },
    ],
  },
  {
    article: 'die',
    original: 'Giraffe',
    translation: [
      { possibleTranslation: 'Zebra', isCorrectTranslation: false },
      { possibleTranslation: 'Giraffe', isCorrectTranslation: true },
      { possibleTranslation: 'Camel', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Hirsch',
    translation: [
      { possibleTranslation: 'Moose', isCorrectTranslation: false },
      { possibleTranslation: 'Deer', isCorrectTranslation: true },
      { possibleTranslation: 'Goat', isCorrectTranslation: false },
    ],
  },
  {
    article: 'die',
    original: 'Wunderlampe',
    translation: [
      { possibleTranslation: 'Flashlight', isCorrectTranslation: false },
      { possibleTranslation: 'Magic lamp', isCorrectTranslation: true },
      { possibleTranslation: 'Candle', isCorrectTranslation: false },
    ],
  },
  {
    article: 'der',
    original: 'Schlüssel',
    translation: [
      { possibleTranslation: 'Lock', isCorrectTranslation: false },
      { possibleTranslation: 'Code', isCorrectTranslation: false },
      { possibleTranslation: 'Key', isCorrectTranslation: true },
    ],
  },
  {
    article: 'die',
    original: 'Brille',
    translation: [
      { possibleTranslation: 'Contact lenses', isCorrectTranslation: false },
      { possibleTranslation: 'Glasses', isCorrectTranslation: true },
      { possibleTranslation: 'Binoculars', isCorrectTranslation: false },
    ],
  },
  {
    article: 'das',
    original: 'Fahrrad',
    translation: [
      { possibleTranslation: 'Scooter', isCorrectTranslation: false },
      { possibleTranslation: 'Skateboard', isCorrectTranslation: false },
      { possibleTranslation: 'Bicycle', isCorrectTranslation: true },
    ],
  },
  {
    article: 'die',
    original: 'Kirsche',
    translation: [
      { possibleTranslation: 'Plum', isCorrectTranslation: false },
      { possibleTranslation: 'Strawberry', isCorrectTranslation: false },
      { possibleTranslation: 'Cherry', isCorrectTranslation: true },
    ],
  },
  {
    article: 'der',
    original: 'Tiger',
    translation: [
      { possibleTranslation: 'Leopard', isCorrectTranslation: false },
      { possibleTranslation: 'Tiger', isCorrectTranslation: true },
      { possibleTranslation: 'Cheetah', isCorrectTranslation: false },
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
