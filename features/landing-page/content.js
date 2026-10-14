// Replace these remote demo photographs with your own licensed assets later.
// No inventory, prices, suppliers, or booking availability are connected.
export const CATEGORIES = [
  {
    id: 'expert',
    label: 'Travel expert',
    icon: 'sparkles',
    eyebrow: 'A little inspiration. An entire island of possibilities.',
    title: 'The islands are calling.',
    accent: 'Go explore.',
    subtitle:
      'A seaside escape, a scenic drive, or a little of everything. Start with a conversation and make Hawaiʻi your own.',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
    imagePosition: '70% center',
    fallback: 'linear-gradient(135deg, #d7edf6, #48a5ce)',
    cta: 'Start planning',
  },
  {
    id: 'cars',
    label: 'Cars',
    icon: 'car',
    eyebrow: 'Take the scenic route',
    title: 'More freedom.',
    accent: 'More island.',
    subtitle:
      'From your first coastal drive to your next unplanned stop, find a car that fits the way you want to explore.',
    image: '/cars.png',
    imagePosition: 'center',
    fallback: 'linear-gradient(135deg, #d8eae8, #699a9c)',
    cta: 'Find your drive',
    cardTitle: 'Your own way around',
    cardDescription: 'Cars for the journey, not just the destination.',
  },
  {
    id: 'stays',
    label: 'Stays',
    icon: 'bed',
    eyebrow: 'Find your place in paradise',
    title: 'Check in.',
    accent: 'Slow down.',
    subtitle:
      'Ocean mornings and easy evenings. Discover a place to stay that feels like part of the adventure.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    imagePosition: 'center',
    fallback: 'linear-gradient(135deg, #e5efea, #8cb6bb)',
    cta: 'Explore stays',
    cardTitle: 'Somewhere to unwind',
    cardDescription: 'Find the setting for your island escape.',
  },
  {
    id: 'flights',
    label: 'Flights',
    icon: 'plane',
    eyebrow: 'Your next chapter starts in the sky',
    title: 'A window seat.',
    accent: 'A new perspective.',
    subtitle:
      'Come for one island or dream a little bigger. Start planning the flights that bring your getaway together.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
    imagePosition: 'center',
    fallback: 'linear-gradient(135deg, #e4eff8, #8aabc9)',
    cta: 'Explore flights',
    cardTitle: 'Let the journey begin',
    cardDescription: 'Plan your arrival and your next island hop.',
  },
  {
    id: 'activities',
    label: 'Activities',
    icon: 'compass',
    eyebrow: 'Make room for a little wonder',
    title: 'Less ordinary.',
    accent: 'More unforgettable.',
    subtitle:
      'Get out on the water, try something new, and leave a little space for the moments you did not plan.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    imagePosition: 'center',
    fallback: 'linear-gradient(135deg, #d8f2f3, #4995a5)',
    cta: 'Find an experience',
    cardTitle: 'Stories worth bringing home',
    cardDescription: 'Make space for something a little different.',
  },
];

export const DEFAULT_CATEGORY = CATEGORIES[0].id;

export function getCategory(id) {
  return CATEGORIES.find((category) => category.id === id) || CATEGORIES[0];
}

export function photoUrl(category, width = 1920) {
  return `${category.image}?auto=format&fit=crop&w=${width}&q=85`;
}
