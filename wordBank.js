const words = {
  emotions: [
    'Joy', 'Grief', 'Rage', 'Envy', 'Hope', 'Dread', 'Calm', 'Guilt',
    'Pride', 'Shame', 'Love', 'Hate', 'Fear', 'Bliss', 'Longing',
    'Nostalgia', 'Anxiety', 'Euphoria', 'Melancholy', 'Serenity',
    'Boredom', 'Awe', 'Disgust', 'Surprise', 'Contempt', 'Regret',
    'Relief', 'Anticipation', 'Jealousy', 'Gratitude', 'Spite', 'Wonder',
    'Despair', 'Courage', 'Tenderness', 'Fury', 'Loneliness', 'Ecstasy',
    'Apathy', 'Restlessness', 'Pity', 'Resentment', 'Compassion', 'Thrill',
    'Vulnerability', 'Contentment', 'Dread', 'Exhilaration', 'Grief', 'Lust'
  ],
  nature: [
    'Forest', 'Ocean', 'Dusk', 'Dawn', 'Storm', 'Snow', 'Desert',
    'Fog', 'Thunder', 'Glacier', 'Volcano', 'Swamp', 'Meadow',
    'Tundra', 'Coral', 'Wildfire', 'Rain', 'Drought', 'Monsoon', 'Eclipse',
    'Tide', 'Avalanche', 'Pollen', 'Frost', 'Mud', 'Smoke', 'Moss',
    'Cliff', 'Canyon', 'Lagoon', 'Mist', 'Pebble', 'Dune', 'Jungle',
    'Blizzard', 'Twilight', 'Horizon', 'Rapids', 'Marsh', 'Geyser',
    'Rainforest', 'Steppe', 'Fjord', 'Delta', 'Savanna', 'Permafrost',
    'Sandstorm', 'Aurora', 'Estuary', 'Undergrowth'
  ],
  abstract: [
    'Freedom', 'Chaos', 'Silence', 'Power', 'Truth', 'Memory', 'Time',
    'Justice', 'Luck', 'Faith', 'Doubt', 'Infinity', 'Balance', 'Tension',
    'Mystery', 'Rhythm', 'Energy', 'Dreams', 'Pressure', 'Hunger',
    'Shadow', 'Noise', 'Speed', 'Weight', 'Depth', 'Distance',
    'Warmth', 'Void', 'Order', 'Decay', 'Resistance', 'Momentum',
    'Fragility', 'Instinct', 'Illusion', 'Fate', 'Identity', 'Legacy',
    'Paradox', 'Entropy', 'Solitude', 'Tension', 'Clarity', 'Ambiguity',
    'Gravity', 'Friction', 'Pulse', 'Threshold', 'Echo', 'Static'
  ],
  objects: [
    'Rust', 'Velvet', 'Glass', 'Smoke', 'Neon', 'Marble', 'Ash',
    'Silk', 'Steel', 'Ember', 'Mirror', 'Lace', 'Gravel', 'Wax',
    'Porcelain', 'Concrete', 'Feather', 'Clay', 'Cobweb', 'Candle',
    'Leather', 'Copper', 'Bone', 'Sawdust', 'Tar', 'Tinfoil',
    'Chalk', 'Denim', 'Fur', 'Plastic', 'Ribbon', 'Soot', 'Resin',
    'Tweed', 'Flint', 'Gauze', 'Thorn', 'Obsidian', 'Amber', 'Pearl',
    'Charcoal', 'Ivory', 'Bronze', 'Granite', 'Mesh', 'Straw',
    'Parchment', 'Slate', 'Beeswax', 'Twine'
  ],
  properNouns: [
    'Tokyo', 'Mozart', 'Mars', 'Sahara', 'Versailles', 'Everest',
    'Venice', 'Havana', 'Siberia', 'Atlantis', 'Pompeii', 'Nile',
    'Amazon', 'Kyoto', 'Iceland', 'Babylon', 'Cairo', 'Patagonia',
    'Zanzibar', 'Machu Picchu', 'Chernobyl', 'Casablanca', 'Timbuktu',
    'Dracula', 'Cleopatra', 'Medusa', 'Stonehenge', 'Hiroshima',
    'Broadway', 'Jurassic', 'Narnia', 'Olympus', 'Colosseum',
    'Sahara', 'Serengeti', 'Petra', 'Pompeii', 'Versailles', 'Acropolis',
    'Kilimanjaro', 'Mariana', 'Gobi', 'Nile', 'Ganges', 'Tiber',
    'Madagascar', 'Siberia', 'Patagonia', 'Mesopotamia'
  ],
  food: [
    'Turmeric', 'Charcoal', 'Mint', 'Saffron', 'Espresso', 'Matcha',
    'Chilli', 'Honey', 'Lavender', 'Mango', 'Truffle', 'Paprika',
    'Vanilla', 'Cinnamon', 'Lime', 'Blueberry', 'Mustard', 'Basil',
    'Pomegranate', 'Cardamom', 'Molasses', 'Wasabi', 'Brine',
    'Caramel', 'Anise', 'Tamarind', 'Tahini', 'Rosewater',
    'Sumac', 'Peppercorn', 'Soy', 'Coconut', 'Ginger', 'Beetroot',
    'Pistachio', 'Squid Ink', 'Truffle', 'Anchovies', 'Miso',
    'Butterscotch', 'Horseradish', 'Juniper', 'Clove', 'Fennel',
    'Persimmon', 'Dragonfruit', 'Jackfruit', 'Lychee', 'Yuzu'
  ],
  music: [
    'Jazz', 'Bass', 'Silence', 'Vinyl', 'Soprano', 'Percussion',
    'Chorus', 'Dissonance', 'Harmony', 'Tempo', 'Crescendo', 'Blues',
    'Static', 'Reverb', 'Falsetto', 'Drone', 'Staccato', 'Lullaby',
    'Requiem', 'Anthem', 'Interlude', 'Overture', 'Nocturne', 'Fugue',
    'Ballad', 'Improvisation', 'Resonance', 'Treble', 'Pitch', 'Cadence'
  ],
  architecture: [
    'Brutalist', 'Gothic', 'Baroque', 'Minimalist', 'Ruins', 'Scaffold',
    'Vault', 'Facade', 'Atrium', 'Arcade', 'Spire', 'Dome',
    'Corridor', 'Threshold', 'Foundation', 'Arch', 'Colonnade', 'Bunker',
    'Lighthouse', 'Crypt', 'Tower', 'Cellar', 'Rampart', 'Alcove',
    'Terrace', 'Stairwell', 'Rotunda', 'Parapet', 'Nave', 'Apse'
  ],
  time: [
    'Midnight', 'Dusk', 'Dawn', 'Noon', 'Yesterday', 'Ancient',
    'Fleeting', 'Eternal', 'Momentary', 'Decade', 'Instant', 'Era',
    'Epoch', 'Antiquity', 'Adolescence', 'Infancy', 'Senescence', 'Prime',
    'Solstice', 'Equinox', 'Daybreak', 'Nightfall', 'Twilight', 'Liminal',
    'Threshold', 'Interval', 'Pause', 'Surge', 'Lull', 'Culmination'
  ],
  weather: [
    'Heatwave', 'Blizzard', 'Drizzle', 'Hail', 'Gale', 'Humidity',
    'Frost', 'Smog', 'Rainbow', 'Lightning', 'Tornado', 'Monsoon',
    'Overcast', 'Scorching', 'Bitter', 'Balmy', 'Muggy', 'Crisp',
    'Blustery', 'Stifling', 'Freezing', 'Sweltering', 'Temperate', 'Arid',
    'Tropical', 'Polar', 'Subtropical', 'Continental', 'Maritime', 'Alpine'
  ]
}

// Game modes
const MODES = {
  classic: null, // all categories
  emotions: ['emotions'],
  nature: ['nature'],
  food: ['food'],
  places: ['properNouns'],
  abstract: ['abstract'],
  objects: ['objects'],
  music: ['music'],
  architecture: ['architecture'],
  time: ['time'],
  weather: ['weather']
}

function selectWords(mode = 'classic') {
  const allowedCategories = MODES[mode]

  let pool
  if (!allowedCategories) {
    // Classic: pick one word from each of 5 randomly selected categories
    const allCategories = Object.keys(words)
    const selected = []
    while (selected.length < 5) {
      const cat = allCategories[Math.floor(Math.random() * allCategories.length)]
      if (!selected.includes(cat)) selected.push(cat)
    }
    pool = selected.map(cat => {
      const list = words[cat]
      return list[Math.floor(Math.random() * list.length)]
    })
  } else {
    // Specific mode: pick 5 random words from allowed categories
    const allWords = allowedCategories.flatMap(cat => words[cat] || [])
    const selected = []
    while (selected.length < 5 && selected.length < allWords.length) {
      const word = allWords[Math.floor(Math.random() * allWords.length)]
      if (!selected.includes(word)) selected.push(word)
    }
    pool = selected
  }

  return pool
}

module.exports = { selectWords, MODES }