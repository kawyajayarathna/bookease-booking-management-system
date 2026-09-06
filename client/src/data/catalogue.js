export const categories = {
  Speakers: ['Active Speakers', 'Passive Speakers', 'PA Speakers', 'Line Array', 'Stage Speakers'],
  Subwoofers: ['Powered Subwoofers', 'Passive Subwoofers', '18-inch Subwoofers', '15-inch Subwoofers'],
  Microphones: ['Wired Microphones', 'Wireless Microphones', 'Vocal Microphones', 'Condenser Microphones', 'Instrument Microphones', 'Conference Microphones'],
  'Mixers & Consoles': ['Analog Mixers', 'Digital Mixers', 'DJ Mixers', 'Audio Consoles'],
  'DJ Equipment': ['DJ Controllers', 'DJ Players', 'Turntables', 'DJ Monitors', 'DJ Accessories'],
  Amplifiers: ['Power Amplifiers', 'Speaker Amplifiers', 'Multi-channel Amplifiers'],
  'Wireless Systems': ['Wireless Microphone Systems', 'Receivers', 'Transmitters', 'In-Ear Monitoring Systems', 'Wireless Accessories'],
  Monitoring: ['Stage Monitors', 'Studio Monitors', 'Headphones', 'In-Ear Monitors'],
  Accessories: ['Microphone Stands', 'Speaker Stands', 'Cables', 'DI Boxes', 'Audio Interfaces', 'Cases & Bags', 'Power Accessories'],
}

export const events = [
  ['W', 'Wedding'], ['DJ', 'DJ Party'], ['♪', 'Live Music'], ['CO', 'Corporate Event'],
  ['CF', 'Conference'], ['P', 'Private Party'], ['OD', 'Outdoor Event'], ['ST', 'Studio / Production'],
]

export const packages = [
  { id: 'wedding-sound-package', name: 'Wedding Sound Package', description: 'A balanced setup for ceremonies, speeches, and receptions.', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80', events: ['Wedding'], items: [{ equipmentId: 'yamaha-dxr12', quantity: 2 }, { equipmentId: 'jbl-prx818xlf', quantity: 2 }, { equipmentId: 'shure-sm58', quantity: 2 }, { equipmentId: 'yamaha-mg12xu', quantity: 1 }], packagePricePerDay: 36000 },
  { id: 'dj-party-package', name: 'DJ Party Package', description: 'The essential setup for parties and DJ-led celebrations.', image: 'https://images.unsplash.com/photo-1571266028243-d220c9c3b6f8?auto=format&fit=crop&w=900&q=80', events: ['DJ Party'], items: [{ equipmentId: 'yamaha-dxr12', quantity: 2 }, { equipmentId: 'jbl-prx818xlf', quantity: 2 }, { equipmentId: 'pioneer-controller', quantity: 1 }], packagePricePerDay: 48000 },
  { id: 'conference-package', name: 'Conference Package', description: 'Clear, dependable audio for presentations and meetings.', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80', events: ['Conference', 'Corporate Event'], items: [{ equipmentId: 'jbl-eon715', quantity: 2 }, { equipmentId: 'shure-sm58', quantity: 4 }, { equipmentId: 'yamaha-mg12xu', quantity: 1 }], packagePricePerDay: 34000 },
]
