const menu_items = {
  "Hot-drinks": {
    espresso: ["Espresso"],

    americano: ["Espresso", "Hot Water"],

    latte: ["Espresso", "Steamed Milk"],

    cappuccino: ["Espresso", "Steamed Milk", "Foamed Milk"],

    "flat-white": ["Espresso", "Steamed Milk", "Microfoam"],

    mocha: ["Espresso", "Chocolate Syrup", "Steamed Milk", "Whipped Cream"],

    macchiato: ["Espresso", "Foamed Milk"],

    "hot-chocolate": ["Chocolate", "Steamed Milk", "Whipped Cream"],

    tea: ["Black Tea", "Hot Water"],

    "green-tea": ["Green Tea Leaves", "Hot Water"],

    "masala-tea": [
      "Black Tea",
      "Milk",
      "Cardamom",
      "Cinnamon",
      "Ginger",
      "Cloves",
    ],

    "karak-tea": ["Black Tea", "Evaporated Milk", "Cardamom", "Sugar"],
  },
  "Cold-drinks": {
    "iced-americano": ["Espresso", "Cold Water", "Ice"],

    "iced-latte": ["Espresso", "Cold Milk", "Ice"],

    "iced-cappuccino": ["Espresso", "Cold Milk", "Milk Foam", "Ice"],

    "iced-caramel-macchiato": ["Espresso", "Cold Milk", "Caramel Syrup", "Ice"],

    "iced-matcha-latte": ["Matcha Powder", "Cold Milk", "Ice"],

    "iced-green-tea": ["Green Tea", "Ice", "Lemon"],

    "iced-matcha": ["Matcha Powder", "Cold Water", "Ice"],
  },
  Shakes: {
    "vanilla-shake": ["Vanilla Ice Cream", "Milk", "Whipped Cream"],

    "chocolate-fudge-shake": [
      "Chocolate Ice Cream",
      "Chocolate Fudge",
      "Milk",
      "Whipped Cream",
    ],

    "strawberry-dream-shake": [
      "Strawberries",
      "Vanilla Ice Cream",
      "Milk",
      "Whipped Cream",
    ],

    "caramel-shake": [
      "Vanilla Ice Cream",
      "Caramel Sauce",
      "Milk",
      "Whipped Cream",
    ],

    "cookies-and-cream-shake": [
      "Vanilla Ice Cream",
      "Chocolate Cookies",
      "Milk",
      "Whipped Cream",
    ],

    "mocha-coffee-shake": [
      "Espresso",
      "Chocolate Syrup",
      "Vanilla Ice Cream",
      "Milk",
    ],

    "lotus-shake": [
      "Lotus Biscoff Spread",
      "Lotus Biscuits",
      "Vanilla Ice Cream",
      "Milk",
    ],

    "peanut-butter-shake": [
      "Peanut Butter",
      "Banana",
      "Milk",
      "Vanilla Ice Cream",
    ],

    "vanilla-protein-shake": [
      "Vanilla Protein Powder",
      "Milk",
      "Banana",
      "Honey",
    ],

    "berry-blast-shake": [
      "Blueberries",
      "Strawberries",
      "Raspberries",
      "Vanilla Yogurt",
      "Milk",
    ],

    "banana-honey-shake": ["Banana", "Honey", "Milk", "Vanilla Ice Cream"],

    "mango-lassi-shake": ["Mango", "Yogurt", "Milk", "Cardamom"],

    "avocado-shake": ["Avocado", "Milk", "Honey", "Vanilla Ice Cream"],
  },
  Breakfast: {
    "butter-croissant": ["Butter", "Flour", "Yeast"],

    "chocolate-croissant": ["Butter", "Flour", "Chocolate"],

    muffin: ["Flour", "Egg", "Butter", "Sugar"],

    egg: ["Egg"],

    omelet: ["Egg", "Tomato", "Onion", "Bell Pepper", "Salt", "Black Pepper"],

    "avocado-toast": [
      "Sourdough Bread",
      "Avocado",
      "Olive Oil",
      "Black Pepper",
      "Lemon",
    ],

    "smashed-pea-feta-toast": [
      "Sourdough Bread",
      "Green Peas",
      "Feta Cheese",
      "Mint",
      "Olive Oil",
    ],

    "tomato-mozzarella-toast": [
      "Sourdough Bread",
      "Tomato",
      "Fresh Mozzarella",
      "Basil",
      "Olive Oil",
    ],

    oatmeal: ["Rolled Oats", "Milk", "Honey", "Banana", "Cinnamon"],

    burrito: [
      "Tortilla",
      "Scrambled Eggs",
      "Cheddar Cheese",
      "Sausage",
      "Bell Pepper",
      "Onion",
    ],
  },
  Cakes: {
    "vanilla-cake": ["Vanilla Sponge", "Vanilla Buttercream"],

    "carrot-cake": ["Carrot", "Walnuts", "Cream Cheese Frosting"],

    "chocolate-cake": ["Chocolate Sponge", "Chocolate Ganache"],

    cheesecake: ["Cream Cheese", "Biscuit Base", "Butter"],

    "san-sebastian-cheesecake": [
      "Cream Cheese",
      "Eggs",
      "Heavy Cream",
      "Sugar",
    ],

    "red-velvet": ["Cocoa", "Cream Cheese Frosting"],

    "black-forest": ["Chocolate Sponge", "Cherries", "Whipped Cream"],

    "peanut-butter-cake": ["Peanut Butter", "Vanilla Sponge", "Buttercream"],

    tiramisu: ["Mascarpone", "Espresso", "Ladyfingers", "Cocoa Powder"],

    cookie: ["Butter", "Chocolate Chips", "Flour"],

    "apple-pie": ["Apple", "Cinnamon", "Butter", "Pie Crust"],

    "espresso-cake": ["Espresso", "Coffee Sponge", "Buttercream"],

    "lotus-cake": ["Lotus Biscoff Spread", "Lotus Biscuits", "Cream Cheese"],
  },
  Food: {
    // 🍕 Pizza
    "pepperoni-pizza": [
      "Pizza Dough",
      "Tomato Sauce",
      "Mozzarella",
      "Pepperoni",
    ],

    "margherita-pizza": [
      "Pizza Dough",
      "Tomato Sauce",
      "Fresh Mozzarella",
      "Basil",
    ],

    "bbq-chicken-pizza": [
      "Pizza Dough",
      "BBQ Sauce",
      "Grilled Chicken",
      "Mozzarella",
      "Red Onion",
    ],

    "veggie-pizza": [
      "Pizza Dough",
      "Tomato Sauce",
      "Mozzarella",
      "Bell Pepper",
      "Mushroom",
      "Olives",
      "Onion",
    ],

    "meat-lovers-pizza": [
      "Pizza Dough",
      "Tomato Sauce",
      "Mozzarella",
      "Pepperoni",
      "Beef",
      "Turkey Ham",
    ],

    // 🍝 Pasta
    "chicken-alfredo": [
      "Fettuccine",
      "Grilled Chicken",
      "Parmesan",
      "Cream",
      "Butter",
    ],

    "spaghetti-bolognese": [
      "Spaghetti",
      "Ground Beef",
      "Tomato Sauce",
      "Parmesan",
    ],

    "penne-arrabbiata": [
      "Penne",
      "Tomato Sauce",
      "Garlic",
      "Chili Flakes",
      "Parmesan",
    ],

    // 🍔 Burgers
    "classic-beef-burger": [
      "Burger Bun",
      "Beef Patty",
      "Cheddar Cheese",
      "Lettuce",
      "Tomato",
      "Onion",
      "Pickles",
    ],

    "crispy-chicken-burger": [
      "Burger Bun",
      "Crispy Chicken",
      "Lettuce",
      "Cheddar Cheese",
      "Mayonnaise",
    ],

    "mushroom-swiss-burger": [
      "Burger Bun",
      "Beef Patty",
      "Swiss Cheese",
      "Grilled Mushrooms",
      "Caramelized Onion",
    ],

    // 🥪 Cold Sandwiches
    "turkey-club-sandwich": [
      "Toast Bread",
      "Turkey",
      "Lettuce",
      "Tomato",
      "Cheese",
      "Mayonnaise",
    ],

    "tuna-sandwich": ["Bread", "Tuna", "Mayonnaise", "Lettuce", "Cucumber"],

    "caprese-sandwich": [
      "Ciabatta Bread",
      "Fresh Mozzarella",
      "Tomato",
      "Basil",
      "Pesto",
    ],

    // 🥩 Steak & Fries
    "grilled-ribeye-steak": ["Ribeye Steak", "French Fries", "Garlic Butter"],

    "sirloin-steak": ["Sirloin Steak", "French Fries", "Pepper Sauce"],

    "steak-and-mushroom-sauce": [
      "Grilled Steak",
      "French Fries",
      "Creamy Mushroom Sauce",
    ],
  },
};

export default menu_items;
