import config from './config';

const adjectives = [
  'crunchy', 'smooth', 'chunky', 'creamy', 'toasted', 'grilled',
  'fresh', 'wild', 'organic', 'natural', 'homemade', 'artisan',
  'crispy', 'fluffy', 'golden', 'warm', 'sweet', 'savory',
  'tangy', 'spicy', 'mild', 'bold', 'classic', 'fancy',
  'simple', 'rustic', 'gourmet', 'premium', 'deluxe', 'perfect',
];

const ingredients = [
  // Spreads & proteins
  'peanut', 'butter', 'jelly', 'jam', 'honey', 'nutella', 'almond',
  'cashew', 'hazelnut', 'tahini', 'hummus', 'avocado', 'cream', 'cheese',
  'ricotta', 'mayo', 'mustard', 'aioli', 'pesto', 'olive', 'tapenade',
  // Fruits & veggies
  'banana', 'strawberry', 'grape', 'raspberry', 'apricot', 'blueberry',
  'apple', 'pear', 'peach', 'plum', 'cherry', 'mango', 'fig',
  'tomato', 'cucumber', 'lettuce', 'spinach', 'arugula', 'kale',
  // Nuts & seeds
  'walnut', 'pecan', 'pistachio', 'sunflower', 'pumpkin',
  'flax', 'chia', 'sesame', 'poppy', 'hemp',
  // Flavors
  'chocolate', 'vanilla', 'cinnamon', 'coconut', 'maple', 'caramel',
  'marshmallow', 'pretzel', 'granola', 'oat', 'bacon', 'ham',
];

const things = [
  'sandwich', 'burger', 'bun', 'wrap', 'bagel', 'roll',
  'toast', 'melt', 'panini', 'hoagie', 'sub', 'hero',
  'club', 'grinder', 'slider', 'pocket', 'pretzel', 'waffle',
];

function generateSandwichId(): string {
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);

  const adjective = adjectives[bytes[0] % adjectives.length];
  const ingredient1 = ingredients[bytes[1] % ingredients.length];
  const ingredient2 = ingredients[bytes[2] % ingredients.length];
  const ingredient3 = ingredients[bytes[3] % ingredients.length];
  const thing = things[bytes[4] % things.length];

  return `${adjective}-${ingredient1}-${ingredient2}-${ingredient3}-${thing}`;
}

function generateShortId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => chars[b % chars.length]).join('');
}

function generateUuid(): string {
  return crypto.randomUUID();
}

export function generateId(): string {
  switch (config.idStyle) {
    case 'short':
      return generateShortId();
    case 'uuid':
      return generateUuid();
    case 'sandwich':
    default:
      return generateSandwichId();
  }
}
