const nounsWithTranslation = [
  { article: 'der', original: 'Mann', translation: 'Man' },
  { article: 'die', original: 'Frau', translation: 'Woman' },
  { article: 'das', original: 'Kind', translation: 'Child' },
  { article: 'die', original: 'Katze', translation: 'Cat' },
  { article: 'das', original: 'Auto', translation: 'Car' },
  { article: 'der', original: 'Apfel', translation: 'Apple' },
  { article: 'das', original: 'Buch', translation: 'Book' },
  { article: 'das', original: 'Pferd', translation: 'Horse' },
  { article: 'der', original: 'Weg', translation: 'Way' },
  { article: 'die', original: 'Arbeit', translation: 'Work' },
  { article: 'das', original: 'Leben', translation: 'Life' },
  { article: 'der', original: 'Stern', translation: 'Star' },
  { article: 'die', original: 'Nacht', translation: 'Night' },
  { article: 'das', original: 'Geld', translation: 'Money' },
  { article: 'der', original: 'Mond', translation: 'Moon' },
  { article: 'die', original: 'Zeit', translation: 'Time' },
  { article: 'die', original: 'Erde', translation: 'Earth' },
  { article: 'das', original: 'Feuer', translation: 'Fire' },
  { article: 'der', original: 'Wald', translation: 'Forest' },
  { article: 'die', original: 'Luft', translation: 'Air' },
  { article: 'das', original: 'Wasser', translation: 'Water' },

  { article: 'die', original: 'Insel', translation: 'Island' },
  { article: 'das', original: 'Dorf', translation: 'Village' },

  { article: 'die', original: 'Brücke', translation: 'Bridge' },

  { article: 'der', original: 'Regen', translation: 'Rain' },
  { article: 'die', original: 'Schule', translation: 'School' },

  { article: 'der', original: 'Schnee', translation: 'Snow' },
  { article: 'die', original: 'Stadt', translation: 'City' },
  { article: 'das', original: 'Tier', translation: 'Animal' },
  { article: 'der', original: 'Vogel', translation: 'Bird' },

  { article: 'das', original: 'Zimmer', translation: 'Room' },
  { article: 'der', original: 'Zahn', translation: 'Tooth' },
  { article: 'die', original: 'Blatt', translation: 'Leaf' },
  { article: 'das', original: 'Boot', translation: 'Boat' },
  { article: 'der', original: 'Kaffee', translation: 'Coffee' },
  { article: 'die', original: 'Hand', translation: 'Hand' },
  { article: 'das', original: 'Haus', translation: 'House' },
  { article: 'der', original: 'Himmel', translation: 'Sky' },
  { article: 'die', original: 'Insek', translation: 'Insect' },
  { article: 'das', original: 'Jahr', translation: 'Year' },
  { article: 'der', original: 'Kopf', translation: 'Head' },
  { article: 'die', original: 'Lampe', translation: 'Lamp' },
  { article: 'das', original: 'Meer', translation: 'Sea' },
  { article: 'der', original: 'Morgen', translation: 'Morning' },
  { article: 'die', original: 'Nase', translation: 'Nose' },
  { article: 'das', original: 'Ohr', translation: 'Ear' },
  { article: 'der', original: 'Park', translation: 'Park' },
  { article: 'die', original: 'Qualle', translation: 'Jellyfish' },

  { article: 'der', original: 'Schuh', translation: 'Shoe' },
  { article: 'die', original: 'Tür', translation: 'Door' },
  { article: 'das', original: 'Universum', translation: 'Universe' },
  { article: 'der', original: 'Zirkus', translation: 'Circus' },
  { article: 'die', original: 'Zunge', translation: 'Tongue' },
  { article: 'das', original: 'Zwerg', translation: 'Dwarf' },
  { article: 'die', original: 'Bahn', translation: 'Train' },
  { article: 'das', original: 'Bier', translation: 'Beer' },
  { article: 'der', original: 'Computer', translation: 'Computer' },
  { article: 'die', original: 'Dose', translation: 'Can' },
  { article: 'das', original: 'Ei', translation: 'Egg' },
  { article: 'der', original: 'Finger', translation: 'Finger' },
  { article: 'die', original: 'Gitarre', translation: 'Guitar' },

  { article: 'der', original: 'Fernseher', translation: 'Television' },
  { article: 'die', original: 'Handschuh', translation: 'Glove' },
  { article: 'das', original: 'Eichhörnchen', translation: 'Squirrel' },

  { article: 'die', original: 'Schulter', translation: 'Shoulder' },
  { article: 'das', original: 'Puzzle', translation: 'Puzzle' },
  { article: 'der', original: 'Sessel', translation: 'Armchair' },
  { article: 'die', original: 'Welle', translation: 'Wave' },
  { article: 'die', original: 'Kirsche', translation: 'Cherry' },
  { article: 'das', original: 'Messer', translation: 'Knife' },
  { article: 'der', original: 'Schlüssel', translation: 'Key' },
  { article: 'die', original: 'Melodie', translation: 'Melody' },
  { article: 'das', original: 'Rennen', translation: 'Race' },
  { article: 'der', original: 'Frosch', translation: 'Frog' },
  { article: 'die', original: 'Wüste', translation: 'Desert' },
  { article: 'das', original: 'Gesicht', translation: 'Face' },
  { article: 'der', original: 'Schatten', translation: 'Shadow' },
  { article: 'die', original: 'Wurst', translation: 'Sausage' },
  { article: 'das', original: 'Gespräch', translation: 'Conversation' },
  { article: 'der', original: 'Pinguin', translation: 'Penguin' },
  { article: 'die', original: 'Mütze', translation: 'Cap' },
  { article: 'das', original: 'Gewitter', translation: 'Thunderstorm' },
  { article: 'der', original: 'Schmetterling', translation: 'Butterfly' },
  { article: 'die', original: 'Kerze', translation: 'Candle' },
  { article: 'das', original: 'Abenteuer', translation: 'Adventure' },
  { article: 'die', original: 'Feder', translation: 'Feather' },
  { article: 'das', original: 'Glas', translation: 'Glass' },
  { article: 'der', original: 'Kaktus', translation: 'Cactus' },
  { article: 'die', original: 'Pflanze', translation: 'Plant' },
  { article: 'das', original: 'Orchester', translation: 'Orchestra' },
  { article: 'der', original: 'Sand', translation: 'Sand' },

  { article: 'das', original: 'Krokodil', translation: 'Crocodile' },
  { article: 'der', original: 'Sturm', translation: 'Storm' },
  { article: 'die', original: 'Perle', translation: 'Pearl' },
  { article: 'das', original: 'Gedicht', translation: 'Poem' },

  { article: 'die', original: 'Stimme', translation: 'Voice' },
  { article: 'das', original: 'Versteck', translation: 'Hideout' },
  { article: 'der', original: 'Hund', translation: 'Dog' },
  { article: 'das', original: 'Papier', translation: 'Paper' },
  { article: 'die', original: 'Musik', translation: 'Music' },
  { article: 'das', original: 'Rätsel', translation: 'Riddle' },
  { article: 'die', original: 'Wolke', translation: 'Cloud' },
  { article: 'das', original: 'Lied', translation: 'Song' },
  { article: 'die', original: 'Ball', translation: 'Ball' },
  { article: 'der', original: 'Kuchen', translation: 'Cake' },
  { article: 'die', original: 'Maus', translation: 'Mouse' },
  { article: 'der', original: 'Berg', translation: 'Mountain' },
  { article: 'die', original: 'Leiter', translation: 'Ladder' },
  { article: 'das', original: 'Geschenk', translation: 'Gift' },
  { article: 'der', original: 'Fluss', translation: 'River' },
  { article: 'das', original: 'Parfüm', translation: 'Perfume' },
  { article: 'der', original: 'Stift', translation: 'Pen' },

  { article: 'das', original: 'Handtuch', translation: 'Towel' },
  { article: 'der', original: 'Regenbogen', translation: 'Rainbow' },
  { article: 'die', original: 'Treppe', translation: 'Stairs' },
  { article: 'das', original: 'Glück', translation: 'Luck' },
  { article: 'der', original: 'Käse', translation: 'Cheese' },
  { article: 'die', original: 'Höhle', translation: 'Cave' },
  { article: 'das', original: 'Piano', translation: 'Piano' },
  { article: 'der', original: 'Nebel', translation: 'Fog' },
  { article: 'die', original: 'Wand', translation: 'Wall' },
  { article: 'das', original: 'Schiff', translation: 'Ship' },
  { article: 'die', original: 'Karte', translation: 'Card' },

  { article: 'der', original: 'Stuhl', translation: 'Chair' },
  { article: 'das', original: 'Hemd', translation: 'Shirt' },
  { article: 'der', original: 'Igel', translation: 'Hedgehog' },
  { article: 'die', original: 'Jacke', translation: 'Jacket' },
  { article: 'das', original: 'Kino', translation: 'Cinema' },
  { article: 'der', original: 'Löffel', translation: 'Spoon' },
  { article: 'die', original: 'Milch', translation: 'Milk' },
  { article: 'das', original: 'Notebook', translation: 'Notebook' },
  { article: 'der', original: 'Ozean', translation: 'Ocean' },
  { article: 'die', original: 'Pizza', translation: 'Pizza' },
  { article: 'das', original: 'Quartett', translation: 'Quartet' },
  { article: 'der', original: 'Rucksack', translation: 'Backpack' },
  { article: 'die', original: 'Sonne', translation: 'Sun' },
  { article: 'das', original: 'Telefon', translation: 'Telephone' },
  { article: 'der', original: 'Urlaub', translation: 'Vacation' },
  { article: 'die', original: 'Vase', translation: 'Vase' },
  { article: 'das', original: 'Wunder', translation: 'Wonder' },
  { article: 'der', original: 'Xylofon', translation: 'Xylophone' },
  { article: 'die', original: 'Yogamatte', translation: 'Yoga mat' },
  { article: 'das', original: 'Zebra', translation: 'Zebra' },
  { article: 'der', original: 'Zirkel', translation: 'Compass' },
  { article: 'die', original: 'Zitrone', translation: 'Lemon' },
  { article: 'das', original: 'Zwetschge', translation: 'Plum' },
  { article: 'der', original: 'Tischtennis', translation: 'Table tennis' },
  { article: 'die', original: 'Kamera', translation: 'Camera' },
  { article: 'das', original: 'Fenster', translation: 'Window' },
  { article: 'der', original: 'Löwe', translation: 'Lion' },
  { article: 'die', original: 'Eule', translation: 'Owl' },
  { article: 'das', original: 'Mikrofon', translation: 'Microphone' },
  { article: 'der', original: 'Fisch', translation: 'Fish' },
  { article: 'die', original: 'Hose', translation: 'Pants' },
  { article: 'das', original: 'Huhn', translation: 'Chicken' },
  { article: 'der', original: 'Teppich', translation: 'Carpet' },
  { article: 'die', original: 'Blume', translation: 'Flower' },
  { article: 'das', original: 'Kissen', translation: 'Pillow' },
  { article: 'der', original: 'Kühlschrank', translation: 'Refrigerator' },
  { article: 'die', original: 'Geschenk', translation: 'Gift' },
  { article: 'das', original: 'Handy', translation: 'Mobile phone' },
  { article: 'die', original: 'Schokolade', translation: 'Chocolate' },
  { article: 'das', original: 'Lächeln', translation: 'Smile' },
  { article: 'der', original: 'Hut', translation: 'Hat' },
  { article: 'die', original: 'Schere', translation: 'Scissors' },
  { article: 'das', original: 'Motorrad', translation: 'Motorcycle' },
  { article: 'der', original: 'Zug', translation: 'Train' },
  { article: 'die', original: 'Straße', translation: 'Street' },
  { article: 'das', original: 'Ballett', translation: 'Ballet' },
  { article: 'der', original: 'Keks', translation: 'Cookie' },
  { article: 'die', original: 'Flasche', translation: 'Bottle' },
  { article: 'das', original: 'Zelt', translation: 'Tent' },
  { article: 'die', original: 'Wolkenkratzer', translation: 'Skyscraper' },
  { article: 'das', original: 'Instrument', translation: 'Instrument' },
  { article: 'der', original: 'Regenschirm', translation: 'Umbrella' },
  { article: 'die', original: 'Tasche', translation: 'Bag' },
];
export default nounsWithTranslation;
