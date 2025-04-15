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

const populateMenu2 = async () => {
  const menuItems = [
    {
      name: 'Chả Nem Tré Huế',
      description: 'Chả nem tré đặc sản Huế với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.9,
      isPopular: true
    },
    {
      name: 'Chả Nem Tré Đà Nẵng',
      description: 'Chả nem tré Đà Nẵng với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng miền Trung',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.8,
      isPopular: true
    },
    {
      name: 'Chả Nem Tré Quảng Nam',
      description: 'Chả nem tré Quảng Nam với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.7
    },
    {
      name: 'Chả Nem Tré Bình Định',
      description: 'Chả nem tré Bình Định với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.8
    },
    {
      name: 'Chả Nem Tré Phú Yên',
      description: 'Chả nem tré Phú Yên với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.7
    },
    {
      name: 'Chả Nem Tré Khánh Hòa',
      description: 'Chả nem tré Khánh Hòa với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.8
    },
    {
      name: 'Chả Nem Tré Ninh Thuận',
      description: 'Chả nem tré Ninh Thuận với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.7
    },
    {
      name: 'Chả Nem Tré Bình Thuận',
      description: 'Chả nem tré Bình Thuận với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.8
    },
    {
      name: 'Chả Nem Tré Đồng Nai',
      description: 'Chả nem tré Đồng Nai với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.7
    },
    {
      name: 'Chả Nem Tré Bình Dương',
      description: 'Chả nem tré Bình Dương với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.8
    },
    {
      name: 'Chả Nem Tré Tây Ninh',
      description: 'Chả nem tré Tây Ninh với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.7
    },
    {
      name: 'Chả Nem Tré Bình Phước',
      description: 'Chả nem tré Bình Phước với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.8
    },
    {
      name: 'Chả Nem Tré Long An',
      description: 'Chả nem tré Long An với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.7
    },
    {
      name: 'Chả Nem Tré Tiền Giang',
      description: 'Chả nem tré Tiền Giang với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.8
    },
    {
      name: 'Chả Nem Tré Bến Tre',
      description: 'Chả nem tré Bến Tre với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.7
    },
    {
      name: 'Chả Nem Tré Vĩnh Long',
      description: 'Chả nem tré Vĩnh Long với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.8
    },
    {
      name: 'Chả Nem Tré Cần Thơ',
      description: 'Chả nem tré Cần Thơ với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.7
    },
    {
      name: 'Chả Nem Tré Sóc Trăng',
      description: 'Chả nem tré Sóc Trăng với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.8
    },
    {
      name: 'Chả Nem Tré Bạc Liêu',
      description: 'Chả nem tré Bạc Liêu với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.7
    },
    {
      name: 'Chả Nem Tré Cà Mau',
      description: 'Chả nem tré Cà Mau với thịt heo, da heo, mộc nhĩ và gia vị đặc trưng',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem-tre',
      rating: 4.8
    }
  ];

  try {
    // Check if menu items already exist
    const existingItems = await getDocs(collection(db, 'menus'));
   // if (!existingItems.empty) {
   //   console.log('Menu items already exist. Skipping population.');
     // return;
   // }

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
populateMenu2()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 