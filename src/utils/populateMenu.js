import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const populateMenu = async () => {
  const menuItems = [
    {
      name: 'Chả Nem Hà Nội',
      description: 'Chả nem truyền thống Hà Nội với nhân thịt heo, mộc nhĩ, miến và rau củ',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem',
      rating: 4.8
    },
    {
      name: 'Chả Nem Sài Gòn',
      description: 'Chả nem Sài Gòn với nhân tôm, thịt heo, nấm và rau củ',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem',
      rating: 4.9
    },
    {
      name: 'Chả Nem Hải Sản',
      description: 'Chả nem đặc biệt với nhân tôm, mực, thịt heo và rau củ',
      price: 7.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem',
      rating: 4.7
    },
    {
      name: 'Chả Nem Chay',
      description: 'Chả nem chay với nhân đậu phụ, nấm, rau củ và miến',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem',
      rating: 4.6
    },
    {
      name: 'Chả Nem Cua',
      description: 'Chả nem cao cấp với nhân thịt cua, thịt heo và rau củ',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem',
      rating: 4.9
    },
    {
      name: 'Chả Nem Tôm Thịt',
      description: 'Chả nem với nhân tôm và thịt heo xay nhuyễn',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem',
      rating: 4.8
    },
    {
      name: 'Chả Nem Rế',
      description: 'Chả nem rế với nhân thịt heo, mộc nhĩ và rau củ',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem',
      rating: 4.7
    },
    {
      name: 'Chả Nem Cá',
      description: 'Chả nem với nhân cá thác lác, thịt heo và rau củ',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
      category: 'cha-nem',
      rating: 4.6
    }
  ];

  try {
    const menuCollection = collection(db, 'menus');
    for (const item of menuItems) {
      await addDoc(menuCollection, item);
      console.log(`Added ${item.name} to menu`);
    }
    console.log('Menu population completed successfully');
  } catch (error) {
    console.error('Error populating menu:', error);
  }
};

export default populateMenu;