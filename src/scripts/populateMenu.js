import { collection, addDoc, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const menuItems = [
  // Burgers
  {
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with melted cheese, lettuce, and special sauce',
    price: 8.99,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    rating: 4.8,
    isPopular: true
  },
  {
    name: 'Bacon Double Cheeseburger',
    description: 'Double beef patties with crispy bacon and cheddar cheese',
    price: 12.99,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b',
    rating: 4.9,
    isPopular: true
  },
  {
    name: 'Veggie Burger',
    description: 'Plant-based patty with fresh vegetables and vegan mayo',
    price: 9.99,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1553272725-086100aecf5e',
    rating: 4.5
  },
  {
    name: 'Spicy Chicken Burger',
    description: 'Crispy chicken with spicy sauce and coleslaw',
    price: 10.99,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710',
    rating: 4.7
  },

  // Pizzas
  {
    name: 'Margherita Pizza',
    description: 'Classic tomato sauce, mozzarella, and fresh basil',
    price: 12.99,
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    rating: 4.8,
    isPopular: true
  },
  {
    name: 'Pepperoni Pizza',
    description: 'Tomato sauce, mozzarella, and spicy pepperoni',
    price: 14.99,
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1581873372796-635b67ca2008',
    rating: 4.9,
    isPopular: true
  },
  {
    name: 'Vegetarian Pizza',
    description: 'Tomato sauce, mozzarella, and assorted vegetables',
    price: 13.99,
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212',
    rating: 4.6
  },
  {
    name: 'BBQ Chicken Pizza',
    description: 'BBQ sauce, chicken, red onions, and cilantro',
    price: 15.99,
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1593504049359-24ca32427c77',
    rating: 4.7
  },

  // Sushi
  {
    name: 'California Roll',
    description: 'Crab, avocado, and cucumber wrapped in seaweed',
    price: 8.99,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    rating: 4.7
  },
  {
    name: 'Salmon Nigiri',
    description: 'Fresh salmon slices on pressed rice',
    price: 10.99,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1617196701538-27c8a0a6b5a3',
    rating: 4.8,
    isPopular: true
  },
  {
    name: 'Dragon Roll',
    description: 'Eel, crab, and avocado topped with eel sauce',
    price: 14.99,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1617196701538-27c8a0a6b5a3',
    rating: 4.9,
    isPopular: true
  },
  {
    name: 'Vegetable Tempura Roll',
    description: 'Assorted tempura vegetables wrapped in rice',
    price: 9.99,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1617196701538-27c8a0a6b5a3',
    rating: 4.5
  },

  // Desserts
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center',
    price: 7.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1562007908-859b4ba9a1a2',
    rating: 4.9,
    isPopular: true
  },
  {
    name: 'New York Cheesecake',
    description: 'Classic creamy cheesecake with berry compote',
    price: 8.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d',
    rating: 4.8
  },
  {
    name: 'Tiramisu',
    description: 'Coffee-flavored Italian dessert with mascarpone',
    price: 8.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
    rating: 4.7
  },
  {
    name: 'Ice Cream Sundae',
    description: 'Vanilla ice cream with chocolate sauce and toppings',
    price: 6.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
    rating: 4.6
  },

  // Drinks
  {
    name: 'Iced Coffee',
    description: 'Cold brewed coffee with milk and ice',
    price: 4.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5',
    rating: 4.7
  },
  {
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 5.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1603561590544-9c8a0a0a0a0a',
    rating: 4.8
  },
  {
    name: 'Strawberry Smoothie',
    description: 'Blended strawberries with yogurt and honey',
    price: 6.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
    rating: 4.6
  },
  {
    name: 'Green Tea',
    description: 'Premium Japanese green tea',
    price: 3.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9',
    rating: 4.5
  }
];

const populateMenu = async () => {
  try {
    // Check if menu items already exist
    const existingItems = await getDocs(collection(db, 'menus'));
    if (!existingItems.empty) {
      console.log('Menu items already exist. Skipping population.');
      return;
    }

    const menusCollection = collection(db, 'menus');
    let successCount = 0;
    
    for (const item of menuItems) {
      try {
        await addDoc(menusCollection, item);
        console.log(`✅ Added ${item.name} to the menu`);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to add ${item.name}:`, error.message);
      }
    }
    
    console.log(`\nMenu population completed!`);
    console.log(`Successfully added ${successCount} out of ${menuItems.length} items`);
  } catch (error) {
    console.error('Error populating menu:', error);
    process.exit(1);
  }
};

// Run the population script
populateMenu()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 