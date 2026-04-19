const words = {
  emotions: [
    'Joy', 'Grief', 'Rage', 'Envy', 'Hope', 'Dread', 'Calm', 'Guilt',
    'Pride', 'Shame', 'Love', 'Hate', 'Fear', 'Bliss', 'Longing',
    'Nostalgia', 'Anxiety', 'Euphoria', 'Melancholy', 'Serenity',
    'Boredom', 'Awe', 'Disgust', 'Surprise', 'Contempt', 'Regret',
    'Relief', 'Anticipation', 'Jealousy', 'Gratitude', 'Spite', 'Wonder',
    'Despair', 'Courage', 'Tenderness', 'Fury', 'Loneliness', 'Ecstasy',
    'Apathy', 'Restlessness', 'Pity', 'Resentment', 'Compassion', 'Thrill',
    'Vulnerability', 'Contentment', 'Exhilaration', 'Lust', 'Paranoia',
    'Reverence', 'Numbness', 'Elation', 'Humiliation', 'Yearning',
    'Irritation', 'Infatuation', 'Devastation', 'Glee', 'Sullenness',
    'Delight', 'Indignation', 'Remorse', 'Excitement', 'Ambivalence',
    'Foreboding', 'Adoration', 'Wistfulness', 'Panic', 'Defiance',
    'Submission', 'Obsession', 'Innocence', 'Betrayal', 'Satisfaction',
    'Helplessness', 'Empathy', 'Coldness', 'Warmth', 'Hunger',
    'Confusion', 'Clarity', 'Discomfort', 'Ease', 'Tension'
  ],

  nature: [
    'Forest', 'Ocean', 'Dusk', 'Dawn', 'Storm', 'Snow', 'Desert',
    'Fog', 'Thunder', 'Glacier', 'Volcano', 'Swamp', 'Meadow',
    'Tundra', 'Coral', 'Wildfire', 'Rain', 'Drought', 'Monsoon', 'Eclipse',
    'Tide', 'Avalanche', 'Pollen', 'Frost', 'Mud', 'Smoke', 'Moss',
    'Cliff', 'Canyon', 'Lagoon', 'Mist', 'Pebble', 'Dune', 'Jungle',
    'Blizzard', 'Twilight', 'Horizon', 'Rapids', 'Marsh', 'Geyser',
    'Rainforest', 'Steppe', 'Fjord', 'Delta', 'Savanna', 'Permafrost',
    'Sandstorm', 'Aurora', 'Estuary', 'Undergrowth', 'Boulders', 'Creek',
    'Canopy', 'Undergrowth', 'Shoreline', 'Driftwood', 'Bedrock', 'Gorge',
    'Hollow', 'Thicket', 'Prairie', 'Atoll', 'Crevasse', 'Moraine',
    'Silt', 'Lichen', 'Spore', 'Sediment', 'Magma', 'Obsidian',
    'Kelp', 'Plankton', 'Mangrove', 'Bamboo', 'Cactus', 'Thorn',
    'Petal', 'Blossom', 'Willow', 'Birch', 'Cedar', 'Redwood',
    'Nightfall', 'Solstice', 'Equinox', 'Monsoon', 'Zephyr', 'Squall'
  ],

  abstract: [
    'Freedom', 'Chaos', 'Silence', 'Power', 'Truth', 'Memory', 'Time',
    'Justice', 'Luck', 'Faith', 'Doubt', 'Infinity', 'Balance', 'Tension',
    'Mystery', 'Rhythm', 'Energy', 'Dreams', 'Pressure', 'Hunger',
    'Shadow', 'Noise', 'Speed', 'Weight', 'Depth', 'Distance',
    'Warmth', 'Void', 'Order', 'Decay', 'Resistance', 'Momentum',
    'Fragility', 'Instinct', 'Illusion', 'Fate', 'Identity', 'Legacy',
    'Paradox', 'Entropy', 'Solitude', 'Clarity', 'Ambiguity',
    'Gravity', 'Friction', 'Pulse', 'Threshold', 'Echo', 'Static',
    'Duality', 'Symmetry', 'Asymmetry', 'Hierarchy', 'Anarchy',
    'Momentum', 'Stagnation', 'Flux', 'Inertia', 'Catalyst',
    'Absence', 'Presence', 'Transition', 'Rupture', 'Continuity',
    'Mortality', 'Eternity', 'Cyclicality', 'Linearity', 'Recursion',
    'Potential', 'Kinesis', 'Stillness', 'Turbulence', 'Equilibrium',
    'Scarcity', 'Abundance', 'Rarity', 'Ubiquity', 'Obscurity',
    'Revelation', 'Concealment', 'Transparency', 'Opacity', 'Resonance',
    'Dissonance', 'Harmony', 'Discord', 'Unity', 'Division'
  ],

  objects: [
    'Rust', 'Velvet', 'Glass', 'Smoke', 'Neon', 'Marble', 'Ash',
    'Silk', 'Steel', 'Ember', 'Mirror', 'Lace', 'Gravel', 'Wax',
    'Porcelain', 'Concrete', 'Feather', 'Clay', 'Cobweb', 'Candle',
    'Leather', 'Copper', 'Bone', 'Sawdust', 'Tar', 'Tinfoil',
    'Chalk', 'Denim', 'Fur', 'Plastic', 'Ribbon', 'Soot', 'Resin',
    'Tweed', 'Flint', 'Gauze', 'Obsidian', 'Pearl', 'Ivory',
    'Bronze', 'Granite', 'Mesh', 'Straw', 'Parchment', 'Slate',
    'Beeswax', 'Twine', 'Lacquer', 'Enamel', 'Pewter', 'Terracotta',
    'Cork', 'Burlap', 'Muslin', 'Linen', 'Satin', 'Taffeta',
    'Tungsten', 'Titanium', 'Graphite', 'Basalt', 'Pumice', 'Quartz',
    'Sandpaper', 'Rope', 'Chain', 'Wire', 'Needle', 'Thread',
    'Splinter', 'Shard', 'Dust', 'Grain', 'Cinder', 'Flake',
    'Varnish', 'Glaze', 'Patina', 'Tarnish', 'Bloom', 'Rust',
    'Husk', 'Shell', 'Bark', 'Root', 'Twig', 'Pod'
  ],

  properNouns: [
    'Tokyo', 'Mozart', 'Mars', 'Sahara', 'Versailles', 'Everest',
    'Venice', 'Havana', 'Siberia', 'Atlantis', 'Pompeii', 'Nile',
    'Amazon', 'Kyoto', 'Iceland', 'Babylon', 'Cairo', 'Patagonia',
    'Zanzibar', 'Machu Picchu', 'Chernobyl', 'Casablanca', 'Timbuktu',
    'Dracula', 'Cleopatra', 'Medusa', 'Stonehenge', 'Hiroshima',
    'Broadway', 'Narnia', 'Olympus', 'Colosseum', 'Kilimanjaro',
    'Madagascar', 'Mesopotamia', 'Acropolis', 'Petra', 'Angkor',
    'Mariana', 'Gobi', 'Ganges', 'Tiber', 'Danube', 'Volga',
    'Vesuvius', 'Krakatoa', 'Etna', 'Fuji', 'Denali', 'Kilimanjaro',
    'Sahara', 'Kalahari', 'Atacama', 'Mojave', 'Sonoran', 'Gobi',
    'Amazonia', 'Borneo', 'Sumatra', 'Tasmania', 'Greenland', 'Svalbard',
    'Carthage', 'Sparta', 'Troy', 'Rome', 'Athens', 'Thebes',
    'Baghdad', 'Samarkand', 'Persepolis', 'Mohenjo-daro', 'Lhasa',
    'Kathmandu', 'Marrakech', 'Timbuktu', 'Nairobi', 'Lagos', 'Dakar',
    'Reykjavik', 'Helsinki', 'Oslo', 'Lisbon', 'Dubrovnik', 'Istanbul',
    'Beethoven', 'Darwin', 'Newton', 'Tesla', 'Einstein', 'Copernicus',
    'Galileo', 'Socrates', 'Plato', 'Aristotle', 'Pythagoras', 'Euclid'
  ],

  food: [
    'Turmeric', 'Charcoal', 'Mint', 'Saffron', 'Espresso', 'Matcha',
    'Chilli', 'Honey', 'Lavender', 'Mango', 'Truffle', 'Paprika',
    'Vanilla', 'Cinnamon', 'Lime', 'Blueberry', 'Mustard', 'Basil',
    'Pomegranate', 'Cardamom', 'Molasses', 'Wasabi', 'Brine',
    'Caramel', 'Anise', 'Tamarind', 'Tahini', 'Rosewater',
    'Sumac', 'Peppercorn', 'Soy', 'Coconut', 'Ginger', 'Beetroot',
    'Pistachio', 'Squid Ink', 'Miso', 'Butterscotch', 'Horseradish',
    'Juniper', 'Clove', 'Fennel', 'Persimmon', 'Dragonfruit',
    'Jackfruit', 'Lychee', 'Yuzu', 'Ube', 'Pandan', 'Harissa',
    'Chimichurri', 'Tahini', 'Mole', 'Sriracha', 'Kimchi', 'Mirin',
    'Dashi', 'Bonito', 'Nori', 'Wakame', 'Kombu', 'Ponzu',
    'Preserved Lemon', 'Za\'atar', 'Dukkah', 'Baharat', 'Berbere',
    'Ras el Hanout', 'Jerk', 'Achiote', 'Epazote', 'Huitlacoche',
    'Fenugreek', 'Asafoetida', 'Galangal', 'Lemongrass', 'Kaffir',
    'Tamarillo', 'Feijoa', 'Rambutan', 'Mangosteen', 'Salak',
    'Cherimoya', 'Guanabana', 'Mamey', 'Sapodilla', 'Starfruit',
    'Bitter', 'Umami', 'Astringent', 'Briny', 'Smoky', 'Fermented'
  ],

  music: [
    'Jazz', 'Bass', 'Silence', 'Vinyl', 'Soprano', 'Percussion',
    'Chorus', 'Dissonance', 'Harmony', 'Tempo', 'Crescendo', 'Blues',
    'Static', 'Reverb', 'Falsetto', 'Drone', 'Staccato', 'Lullaby',
    'Requiem', 'Anthem', 'Interlude', 'Overture', 'Nocturne', 'Fugue',
    'Ballad', 'Improvisation', 'Resonance', 'Treble', 'Pitch', 'Cadence',
    'Syncopation', 'Arpeggio', 'Glissando', 'Vibrato', 'Tremolo',
    'Fortissimo', 'Pianissimo', 'Allegro', 'Adagio', 'Andante',
    'Diminuendo', 'Accelerando', 'Ritardando', 'Fermata', 'Coda',
    'Prelude', 'Sonata', 'Symphony', 'Concerto', 'Etude', 'Rhapsody',
    'Serenade', 'Minuet', 'Scherzo', 'Cantata', 'Motet', 'Oratorio',
    'Bebop', 'Swing', 'Groove', 'Riff', 'Hook', 'Bridge',
    'Feedback', 'Distortion', 'Delay', 'Chorus', 'Flanger', 'Phaser',
    'Downbeat', 'Upbeat', 'Offbeat', 'Backbeat', 'Polyrhythm', 'Meter',
    'Overtone', 'Undertone', 'Timbre', 'Register', 'Interval', 'Chord'
  ],

  architecture: [
    'Brutalist', 'Gothic', 'Baroque', 'Minimalist', 'Ruins', 'Scaffold',
    'Vault', 'Facade', 'Atrium', 'Arcade', 'Spire', 'Dome',
    'Corridor', 'Threshold', 'Foundation', 'Arch', 'Colonnade', 'Bunker',
    'Lighthouse', 'Crypt', 'Tower', 'Cellar', 'Rampart', 'Alcove',
    'Terrace', 'Stairwell', 'Rotunda', 'Parapet', 'Nave', 'Apse',
    'Buttress', 'Clerestory', 'Transept', 'Narthex', 'Campanile',
    'Minaret', 'Pagoda', 'Ziggurat', 'Stupa', 'Obelisk', 'Pylon',
    'Portico', 'Peristyle', 'Colonnade', 'Loggia', 'Pergola', 'Trellis',
    'Balustrade', 'Finial', 'Keystone', 'Lintel', 'Corbel', 'Pilaster',
    'Grotto', 'Folly', 'Gazebo', 'Belvedere', 'Orangery', 'Conservatory',
    'Mezzanine', 'Clerestory', 'Skylight', 'Oculus', 'Lantern', 'Cupola',
    'Quoin', 'Dentil', 'Modillion', 'Frieze', 'Entablature', 'Pediment',
    'Rustication', 'Ashlar', 'Coursing', 'Pointing', 'Render', 'Cladding'
  ],

  time: [
    'Midnight', 'Dusk', 'Dawn', 'Noon', 'Yesterday', 'Ancient',
    'Fleeting', 'Eternal', 'Momentary', 'Decade', 'Instant', 'Era',
    'Epoch', 'Antiquity', 'Adolescence', 'Infancy', 'Prime',
    'Solstice', 'Equinox', 'Daybreak', 'Nightfall', 'Twilight', 'Liminal',
    'Interval', 'Pause', 'Surge', 'Lull', 'Culmination',
    'Prehistoric', 'Medieval', 'Renaissance', 'Industrial', 'Postmodern',
    'Glacial', 'Geological', 'Astronomical', 'Biological', 'Historical',
    'Nanosecond', 'Millisecond', 'Second', 'Minute', 'Hour', 'Week',
    'Month', 'Year', 'Century', 'Millennium', 'Eon', 'Aeon',
    'Before', 'After', 'During', 'Meanwhile', 'Eventually', 'Suddenly',
    'Gradually', 'Immediately', 'Periodically', 'Cyclically', 'Linearly',
    'Retrospect', 'Foresight', 'Present', 'Past', 'Future', 'Limbo',
    'Stasis', 'Motion', 'Progress', 'Regression', 'Acceleration', 'Deceleration'
  ],

  weather: [
    'Heatwave', 'Blizzard', 'Drizzle', 'Hail', 'Gale', 'Humidity',
    'Frost', 'Smog', 'Rainbow', 'Lightning', 'Tornado', 'Monsoon',
    'Overcast', 'Scorching', 'Bitter', 'Balmy', 'Muggy', 'Crisp',
    'Blustery', 'Stifling', 'Freezing', 'Sweltering', 'Temperate', 'Arid',
    'Tropical', 'Polar', 'Subtropical', 'Continental', 'Maritime', 'Alpine',
    'Whiteout', 'Blackice', 'Permafrost', 'Heatmirror', 'Sundog', 'Halosun',
    'Virga', 'Graupel', 'Rime', 'Hoarfrost', 'Sleet', 'Freezing Rain',
    'Mammatus', 'Lenticular', 'Cumulonimbus', 'Cirrus', 'Stratus', 'Nimbus',
    'Sirocco', 'Mistral', 'Chinook', 'Foehn', 'Harmattan', 'Tramontane',
    'Doldrums', 'Horse Latitudes', 'Trade Winds', 'Jet Stream', 'Thermals',
    'Inversion', 'Microclimate', 'Albedo', 'Dewpoint', 'Humidity', 'Pressure'
  ],

  science: [
    'Gravity', 'Entropy', 'Plasma', 'Quantum', 'Radiation', 'Fusion',
    'Fission', 'Osmosis', 'Diffusion', 'Catalyst', 'Isotope', 'Molecule',
    'Atom', 'Electron', 'Photon', 'Neutrino', 'Quark', 'Fermion',
    'Boson', 'Higgs', 'Dark Matter', 'Dark Energy', 'Antimatter', 'Singularity',
    'Event Horizon', 'Wormhole', 'Pulsar', 'Quasar', 'Nebula', 'Supernova',
    'Magnetism', 'Conductivity', 'Resistance', 'Capacitance', 'Inductance',
    'Refraction', 'Diffraction', 'Interference', 'Polarisation', 'Fluorescence',
    'Phosphorescence', 'Bioluminescence', 'Chemiluminescence', 'Thermoluminescence',
    'Viscosity', 'Density', 'Buoyancy', 'Tension', 'Compression', 'Shear',
    'Crystallisation', 'Polymerisation', 'Oxidation', 'Reduction', 'Hydrolysis',
    'Fermentation', 'Distillation', 'Sublimation', 'Condensation', 'Evaporation',
    'Mutation', 'Evolution', 'Symbiosis', 'Parasitism', 'Mutualism', 'Commensalism',
    'Homeostasis', 'Metabolism', 'Photosynthesis', 'Respiration', 'Mitosis', 'Meiosis'
  ],

  mythology: [
    'Olympus', 'Valhalla', 'Elysium', 'Tartarus', 'Nirvana', 'Purgatory',
    'Hades', 'Avalon', 'Asgard', 'Midgard', 'Bifrost', 'Yggdrasil',
    'Medusa', 'Minotaur', 'Centaur', 'Griffin', 'Sphinx', 'Chimera',
    'Phoenix', 'Dragon', 'Unicorn', 'Kraken', 'Leviathan', 'Behemoth',
    'Zeus', 'Poseidon', 'Hades', 'Apollo', 'Artemis', 'Athena',
    'Ares', 'Aphrodite', 'Hermes', 'Hephaestus', 'Dionysus', 'Demeter',
    'Odin', 'Thor', 'Loki', 'Freya', 'Tyr', 'Baldur',
    'Ra', 'Osiris', 'Isis', 'Anubis', 'Horus', 'Thoth',
    'Shiva', 'Vishnu', 'Brahma', 'Kali', 'Ganesha', 'Lakshmi',
    'Quetzalcoatl', 'Tlaloc', 'Coatlicue', 'Huitzilopochtli', 'Tezcatlipoca',
    'Amaterasu', 'Susanoo', 'Izanagi', 'Izanami', 'Raijin', 'Fujin',
    'Prophecy', 'Oracle', 'Labyrinth', 'Odyssey', 'Hubris', 'Nemesis'
  ],

  colours: [
    'Crimson', 'Scarlet', 'Vermillion', 'Carmine', 'Magenta', 'Fuchsia',
    'Coral', 'Salmon', 'Rose', 'Blush', 'Copper', 'Rust',
    'Amber', 'Ochre', 'Gold', 'Saffron', 'Maize', 'Cream',
    'Ivory', 'Ecru', 'Champagne', 'Wheat', 'Sand', 'Dune',
    'Olive', 'Sage', 'Jade', 'Emerald', 'Viridian', 'Teal',
    'Cerulean', 'Azure', 'Cobalt', 'Indigo', 'Violet', 'Lavender',
    'Lilac', 'Mauve', 'Plum', 'Burgundy', 'Maroon', 'Oxblood',
    'Ebony', 'Onyx', 'Charcoal', 'Slate', 'Pewter', 'Silver',
    'Sepia', 'Umber', 'Sienna', 'Ochre', 'Taupe', 'Khaki',
    'Cyan', 'Aquamarine', 'Turquoise', 'Mint', 'Seafoam', 'Pistachio',
    'Chartreuse', 'Lime', 'Citron', 'Lemon', 'Canary', 'Aureolin',
    'Cerise', 'Amaranth', 'Mulberry', 'Wisteria', 'Periwinkle', 'Denim'
  ],

  textures: [
    'Smooth', 'Rough', 'Coarse', 'Fine', 'Silky', 'Grainy',
    'Bumpy', 'Ridged', 'Grooved', 'Pitted', 'Porous', 'Dense',
    'Fluffy', 'Crispy', 'Crunchy', 'Chewy', 'Rubbery', 'Brittle',
    'Waxy', 'Greasy', 'Sticky', 'Tacky', 'Slippery', 'Dry',
    'Matte', 'Glossy', 'Satin', 'Metallic', 'Iridescent', 'Translucent',
    'Opaque', 'Transparent', 'Frosted', 'Etched', 'Embossed', 'Engraved',
    'Woven', 'Knitted', 'Braided', 'Twisted', 'Tangled', 'Matted',
    'Peeling', 'Cracked', 'Weathered', 'Worn', 'Polished', 'Buffed',
    'Sandblasted', 'Hammered', 'Forged', 'Cast', 'Moulded', 'Carved',
    'Splintered', 'Frayed', 'Tattered', 'Intact', 'Pristine', 'Aged'
  ],

  cosmos: [
    'Nebula', 'Pulsar', 'Quasar', 'Supernova', 'Black Hole', 'Singularity',
    'Galaxy', 'Cluster', 'Void', 'Filament', 'Cosmic Web', 'Dark Matter',
    'Solar Wind', 'Magnetosphere', 'Ionosphere', 'Thermosphere', 'Exosphere',
    'Perihelion', 'Aphelion', 'Conjunction', 'Opposition', 'Transit', 'Occultation',
    'Solstice', 'Equinox', 'Precession', 'Nutation', 'Libration', 'Parallax',
    'Redshift', 'Blueshift', 'Doppler', 'Spectrum', 'Continuum', 'Emission',
    'Absorption', 'Reflection', 'Albedo', 'Luminosity', 'Magnitude', 'Flux',
    'Zenith', 'Nadir', 'Azimuth', 'Declination', 'Ascension', 'Meridian',
    'Constellation', 'Asterism', 'Ecliptic', 'Zodiac', 'Celestial', 'Galactic',
    'Interstellar', 'Intergalactic', 'Cosmic', 'Universal', 'Primordial', 'Infinite'
  ],

  human: [
    'Childhood', 'Adolescence', 'Adulthood', 'Old Age', 'Birth', 'Death',
    'Memory', 'Dream', 'Instinct', 'Habit', 'Ritual', 'Tradition',
    'Language', 'Gesture', 'Touch', 'Gaze', 'Smile', 'Frown',
    'Laughter', 'Tears', 'Breath', 'Heartbeat', 'Pulse', 'Sigh',
    'Whisper', 'Shout', 'Silence', 'Song', 'Prayer', 'Curse',
    'Home', 'Exile', 'Journey', 'Return', 'Departure', 'Arrival',
    'Solitude', 'Community', 'Family', 'Friendship', 'Rivalry', 'Enmity',
    'Love', 'Loss', 'Grief', 'Healing', 'Growth', 'Decline',
    'Hunger', 'Satiety', 'Exhaustion', 'Rest', 'Play', 'Work',
    'Creation', 'Destruction', 'Discovery', 'Forgetting', 'Learning', 'Teaching',
    'Leadership', 'Submission', 'Rebellion', 'Conformity', 'Individuality', 'Belonging',
    'Youth', 'Experience', 'Wisdom', 'Ignorance', 'Curiosity', 'Apathy'
  ]
}

const MODES = {
  classic: null,
  emotions: ['emotions'],
  nature: ['nature'],
  food: ['food'],
  places: ['properNouns'],
  abstract: ['abstract'],
  objects: ['objects'],
  music: ['music'],
  architecture: ['architecture'],
  time: ['time'],
  weather: ['weather'],
  science: ['science'],
  mythology: ['mythology'],
  colours: ['colours'],
  textures: ['textures'],
  cosmos: ['cosmos'],
  human: ['human']
}

function selectWords(mode = 'classic') {
  const allowedCategories = MODES[mode]

  if (!allowedCategories) {
    // Classic: one word from each of 5 randomly selected categories
    const allCategories = Object.keys(words)
    const selected = []
    while (selected.length < 5) {
      const cat = allCategories[Math.floor(Math.random() * allCategories.length)]
      if (!selected.includes(cat)) selected.push(cat)
    }
    return selected.map(cat => {
      const list = words[cat]
      return list[Math.floor(Math.random() * list.length)]
    })
  }

  // Specific mode: 5 random words from allowed categories, no repeats
  const allWords = allowedCategories.flatMap(cat => words[cat] || [])
  const selected = []
  while (selected.length < 5 && selected.length < allWords.length) {
    const word = allWords[Math.floor(Math.random() * allWords.length)]
    if (!selected.includes(word)) selected.push(word)
  }
  return selected
}

module.exports = { selectWords, MODES }