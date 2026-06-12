export const CATEGORIES = [
  { key: 'all', label: 'Tout' },
  { key: 'pool', label: 'Pool' },
  { key: 'rooftop', label: 'Rooftop' },
  { key: 'brunch', label: 'Brunch' },
  { key: 'bar', label: 'Bar' },
  { key: 'spa', label: 'Spa' },
  { key: 'events', label: 'Events' },
  { key: 'restaurant', label: 'Restaurant' },
  { key: 'work', label: 'Work' },
]

export const SUBCATEGORIES = {
  all: [],
  pool: ['Accès public', 'Pool party', 'Aqua fitness'],
  rooftop: ['Bar rooftop', 'Terrasse', 'Vue panoramique'],
  brunch: ['Brunch classique', 'Brunch jazz', 'Brunch cocktails'],
  bar: ['Afterwork', 'Cocktails', 'Wine bar'],
  spa: ['Massage', 'Hammam', 'Yoga', 'Fitness'],
  events: ['DJ Set', 'Live Music', 'Expo', 'Pop-up', 'Projection'],
  restaurant: ['Déjeuner', 'Dîner', "Table d'hôte"],
  work: ['Coworking', 'Séminaire'],
}

export const HOTELS = [
  { key: 'all', label: 'Tous' },
  { key: 'molitor', label: 'Molitor' },
  { key: 'so', label: 'SO/ Paris' },
  { key: 'hoxton', label: 'Hoxton' },
  { key: 'madame', label: 'Madame Rêve' },
  { key: 'lutetia', label: 'Lutetia' },
]

export const EVENTS = [
  { hotel: 'Molitor', hotelKey: 'molitor', name: 'Piscine publique', exp: 'pool', sub: 'Accès public', days: [1, 2, 4], time: '10h–20h', price: 'Entrée libre', access: 'gratuit', recurrent: true },
  { hotel: 'Molitor', hotelKey: 'molitor', name: 'Yoga au bord de la piscine', exp: 'spa', sub: 'Yoga', days: [6], time: '8h30–10h', price: '25€', access: 'payant', recurrent: true },
  { hotel: 'Molitor', hotelKey: 'molitor', name: 'Spa & Hammam', exp: 'spa', sub: 'Hammam', days: [0, 1, 2, 3, 4, 5, 6], time: '9h–20h', price: 'Sur réservation', access: 'resa', recurrent: true },
  { hotel: 'SO/ Paris', hotelKey: 'so', name: 'DJ Set en rooftop', exp: 'events', sub: 'DJ Set', days: [5], time: '19h–00h', price: 'Entrée libre', access: 'gratuit', recurrent: true },
  { hotel: 'SO/ Paris', hotelKey: 'so', name: 'Bar du rooftop', exp: 'rooftop', sub: 'Bar rooftop', days: [3, 4, 5, 6], time: '17h–01h', price: 'Conso. seule', access: 'gratuit', recurrent: true },
  { hotel: 'SO/ Paris', hotelKey: 'so', name: 'Restaurant Le Mixo', exp: 'restaurant', sub: 'Déjeuner', days: [1, 2, 3, 4, 5], time: '12h–14h30', price: 'Sur réservation', access: 'resa', recurrent: true },
  { hotel: 'Hoxton', hotelKey: 'hoxton', name: 'Brunch du dimanche', exp: 'brunch', sub: 'Brunch classique', days: [0], time: '11h–15h', price: '45€ / pers.', access: 'resa', recurrent: true },
  { hotel: 'Hoxton', hotelKey: 'hoxton', name: 'Espace coworking', exp: 'work', sub: 'Coworking', days: [1, 2, 3, 4, 5], time: '8h–18h', price: '25€ / jour', access: 'payant', recurrent: true },
  { hotel: 'Madame Rêve', hotelKey: 'madame', name: 'Afterwork en terrasse', exp: 'bar', sub: 'Afterwork', days: [3, 4], time: '18h–22h', price: 'Conso. seule', access: 'gratuit', recurrent: true },
  { hotel: 'Lutetia', hotelKey: 'lutetia', name: 'Jazz Club', exp: 'events', sub: 'Live Music', days: [5], time: '21h–23h', price: 'Sur réservation', access: 'resa', recurrent: true },
  { hotel: 'Madame Rêve', hotelKey: 'madame', name: 'Déjeuner en terrasse', exp: 'restaurant', sub: 'Déjeuner', days: [0, 1, 2, 3, 4, 5, 6], time: '12h–15h', price: 'Sur réservation', access: 'resa', recurrent: true },
  { hotel: 'Molitor', hotelKey: 'molitor', name: 'Pool Party Solstice', exp: 'pool', sub: 'Pool party', date: '2026-06-21', time: '20h–02h', price: '45€', access: 'payant', recurrent: false },
  { hotel: 'SO/ Paris', hotelKey: 'so', name: 'Fête de la Musique', exp: 'events', sub: 'Live Music', date: '2026-06-21', time: '18h–23h', price: 'Gratuit', access: 'gratuit', recurrent: false },
  { hotel: 'Hoxton', hotelKey: 'hoxton', name: 'Brunch Jazz — Édition Été', exp: 'brunch', sub: 'Brunch jazz', date: '2026-06-28', time: '11h–15h', price: '55€', access: 'resa', recurrent: false },
  { hotel: 'Lutetia', hotelKey: 'lutetia', name: 'Exposition Photo', exp: 'events', sub: 'Expo', date: '2026-06-18', time: '10h–19h', price: 'Entrée libre', access: 'gratuit', recurrent: false },
]

export const ACCESS_LABELS = {
  gratuit: 'Gratuit',
  resa: 'Sur réservation',
  payant: 'Payant',
  residents: 'Résidents',
}

export const EDITORIAL_BLOCKS = {
  3: {
    gradient: 'linear-gradient(135deg, #1A1A2E, #4A7FD4)',
    eyebrow: 'Hôtel de la semaine',
    title: 'Le Molitor, ouvert à tous',
    text: "Depuis sa rénovation, le Molitor ouvre sa piscine Art Déco au public. Un privilège rare à Paris.",
  },
  8: {
    gradient: 'linear-gradient(135deg, #0A0A0A, #2A2A4A)',
    eyebrow: 'Ce week-end',
    title: 'Rooftops & couchers de soleil',
    text: "SO/ Paris et Madame Rêve proposent leurs terrasses jusqu'à minuit ce vendredi. Entrée libre.",
  },
}