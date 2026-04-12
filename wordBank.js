const words = {
  emotions: [
    'Joy', 'Grief', 'Rage', 'Envy', 'Hope', 'Dread', 'Calm', 'Guilt',
    'Pride', 'Shame', 'Love', 'Hate', 'Fear', 'Bliss', 'Longing',
    'Nostalgia', 'Anxiety', 'Euphoria', 'Melancholy', 'Serenity',
    'Boredom', 'Awe', 'Disgust', 'Surprise', 'Contempt', 'Regret',
    'Relief', 'Anticipation', 'Jealousy', 'Gratitude'
  ],
  nature: [
    'Forest', 'Ocean', 'Dusk', 'Dawn', 'Storm', 'Snow', 'Desert',
    'Fog', 'Thunder', 'Glacier', 'Volcano', 'Swamp', 'Meadow',
    'Tundra', 'Coral', 'Wildfire', 'Rain', 'Drought', 'Monsoon', 'Eclipse',
    'Tide', 'Avalanche', 'Pollen', 'Frost', 'Mud', 'Smoke', 'Moss',
    'Cliff', 'Canyon', 'Lagoon'
  ],
  abstract: [
    'Freedom', 'Chaos', 'Silence', 'Power', 'Truth', 'Memory', 'Time',
    'Justice', 'Luck', 'Faith', 'Doubt', 'Infinity', 'Balance', 'Tension',
    'Mystery', 'Rhythm', 'Energy', 'Dreams', 'Pressure', 'Hunger',
    'Shadow', 'Noise', 'Speed', 'Weight', 'Depth', 'Distance',
    'Warmth', 'Void', 'Order', 'Decay'
  ],
  objects: [
    'Rust', 'Velvet', 'Glass', 'Smoke', 'Neon', 'Marble', 'Ash',
    'Silk', 'Steel', 'Ember', 'Mirror', 'Lace', 'Gravel', 'Wax',
    'Porcelain', 'Concrete', 'Feather', 'Clay', 'Cobweb', 'Candle',
    'Leather', 'Copper', 'Bone', 'Sawdust', 'Tar', 'Tinfoil',
    'Chalk', 'Denim', 'Fur', 'Plastic'
  ],
  properNouns: [
    'Tokyo', 'Mozart', 'Mars', 'Sahara', 'Versailles', 'Everest',
    'Venice', 'Havana', 'Siberia', 'Atlantis', 'Pompeii', 'Nile',
    'Amazon', 'Kyoto', 'Iceland', 'Babylon', 'Cairo', 'Patagonia',
    'Zanzibar', 'Machu Picchu', 'Chernobyl', 'Casablanca', 'Timbuktu',
    'Dracula', 'Cleopatra', 'Medusa', 'Stonehenge', 'Hiroshima',
    'Broadway', 'Jurassic'
  ],
  food: [
    'Turmeric', 'Charcoal', 'Mint', 'Saffron', 'Espresso', 'Matcha',
    'Chilli', 'Honey', 'Lavender', 'Mango', 'Truffle', 'Paprika',
    'Vanilla', 'Cinnamon', 'Lime', 'Blueberry', 'Mustard', 'Basil',
    'Pomegranate', 'Cardamom', 'Molasses', 'Wasabi', 'Brine',
    'Caramel', 'Anise', 'Tamarind', 'Tahini', 'Rosewater',
    'Sumac', 'Peppercorn'
  ]
}

// Pick 5 random words, one from each of 5 randomly selected categories
// This ensures variety across categories rather than 5 food words in a row
function selectWords() {
  const categories = Object.keys(words)
  const selectedCategories = []

  while (selectedCategories.length < 5) {
    const cat = categories[Math.floor(Math.random() * categories.length)]
    if (!selectedCategories.includes(cat)) {
      selectedCategories.push(cat)
    }
  }

  return selectedCategories.map(cat => {
    const list = words[cat]
    return list[Math.floor(Math.random() * list.length)]
  })
}

module.exports = { selectWords }