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

const populateMenu = async () => {
  const menuItems = [
    // Món chính
    {
      id: 'pho-bo',
      name: 'Phở Bò',
      description: 'Phở bò truyền thống với nước dùng đậm đà, thịt bò tái và bánh phở mềm',
      price: 45000,
      image: 'https://example.com/pho-bo.jpg',
      category: 'mon-chinh',
      rating: 4.9,
      isPopular: true
    },
    {
      id: 'bun-cha',
      name: 'Bún Chả',
      description: 'Bún chả Hà Nội với thịt nướng, nước mắm chua ngọt và rau sống',
      price: 40000,
      image: 'https://example.com/bun-cha.jpg',
      category: 'mon-chinh',
      rating: 4.8,
      isPopular: true
    },
    {
      id: 'com-tam',
      name: 'Cơm Tấm',
      description: 'Cơm tấm Sài Gòn với sườn nướng, bì, chả và nước mắm đặc trưng',
      price: 35000,
      image: 'https://example.com/com-tam.jpg',
      category: 'mon-chinh',
      rating: 4.7,
      isPopular: true
    },
    {
      id: 'banh-mi',
      name: 'Bánh Mì',
      description: 'Bánh mì Việt Nam với pate, thịt nguội, rau và gia vị',
      price: 25000,
      image: 'https://example.com/banh-mi.jpg',
      category: 'mon-chinh',
      rating: 4.8,
      isPopular: true
    },
    {
      id: 'bun-bo-hue',
      name: 'Bún Bò Huế',
      description: 'Bún bò Huế với nước dùng đậm đà, thịt bò, giò heo và chả',
      price: 45000,
      image: 'https://example.com/bun-bo-hue.jpg',
      category: 'mon-chinh',
      rating: 4.8,
      isPopular: true
    },
    {
      id: 'mi-quang',
      name: 'Mì Quảng',
      description: 'Mì Quảng với nước dùng đậm đà, thịt gà, tôm và rau sống',
      price: 40000,
      image: 'https://example.com/mi-quang.jpg',
      category: 'mon-chinh',
      rating: 4.7,
      isPopular: true
    },
    {
      id: 'bun-rieu',
      name: 'Bún Riêu',
      description: 'Bún riêu cua với nước dùng chua ngọt, cua đồng và đậu hũ',
      price: 35000,
      image: 'https://example.com/bun-rieu.jpg',
      category: 'mon-chinh',
      rating: 4.6,
      isPopular: false
    },
    {
      id: 'bun-mam',
      name: 'Bún Mắm',
      description: 'Bún mắm miền Tây với nước dùng đậm đà, thịt heo và tôm',
      price: 40000,
      image: 'https://example.com/bun-mam.jpg',
      category: 'mon-chinh',
      rating: 4.7,
      isPopular: false
    },
    {
      id: 'com-ga',
      name: 'Cơm Gà',
      description: 'Cơm gà Hội An với gà xé phay, rau sống và nước mắm',
      price: 40000,
      image: 'https://example.com/com-ga.jpg',
      category: 'mon-chinh',
      rating: 4.8,
      isPopular: true
    },
    {
      id: 'com-chien-duong-chau',
      name: 'Cơm Chiên Dương Châu',
      description: 'Cơm chiên Dương Châu với tôm, thịt, trứng và rau củ',
      price: 45000,
      image: 'https://example.com/com-chien-duong-chau.jpg',
      category: 'mon-chinh',
      rating: 4.7,
      isPopular: false
    },

    // Món khai vị
    {
      id: 'goi-cuon',
      name: 'Gỏi Cuốn',
      description: 'Gỏi cuốn tôm thịt với bánh tráng, rau sống và nước chấm',
      price: 30000,
      image: 'https://example.com/goi-cuon.jpg',
      category: 'khai-vi',
      rating: 4.7,
      isPopular: true
    },
    {
      id: 'nem-ran',
      name: 'Nem Rán',
      description: 'Nem rán giòn với nhân thịt heo, mộc nhĩ và miến',
      price: 35000,
      image: 'https://example.com/nem-ran.jpg',
      category: 'khai-vi',
      rating: 4.8,
      isPopular: true
    },
    {
      id: 'cha-gio',
      name: 'Chả Giò',
      description: 'Chả giò Sài Gòn với nhân tôm thịt và rau củ',
      price: 40000,
      image: 'https://example.com/cha-gio.jpg',
      category: 'khai-vi',
      rating: 4.7,
      isPopular: false
    },
    {
      id: 'goi-ga',
      name: 'Gỏi Gà',
      description: 'Gỏi gà với thịt gà xé phay, rau răm và nước mắm',
      price: 45000,
      image: 'https://example.com/goi-ga.jpg',
      category: 'khai-vi',
      rating: 4.6,
      isPopular: false
    },
    {
      id: 'goi-ngu-sac',
      name: 'Gỏi Ngũ Sắc',
      description: 'Gỏi ngũ sắc với thịt heo, tôm, rau củ và nước mắm',
      price: 50000,
      image: 'https://example.com/goi-ngu-sac.jpg',
      category: 'khai-vi',
      rating: 4.7,
      isPopular: false
    },

    // Món chay
    {
      id: 'pho-chay',
      name: 'Phở Chay',
      description: 'Phở chay với nước dùng rau củ và các loại nấm',
      price: 40000,
      image: 'https://example.com/pho-chay.jpg',
      category: 'mon-chay',
      rating: 4.6,
      isPopular: false
    },
    {
      id: 'bun-chay',
      name: 'Bún Chay',
      description: 'Bún chay với đậu hũ, nấm và rau củ',
      price: 35000,
      image: 'https://example.com/bun-chay.jpg',
      category: 'mon-chay',
      rating: 4.5,
      isPopular: false
    },
    {
      id: 'com-chay',
      name: 'Cơm Chay',
      description: 'Cơm chay với đậu hũ, nấm và rau củ xào',
      price: 40000,
      image: 'https://example.com/com-chay.jpg',
      category: 'mon-chay',
      rating: 4.6,
      isPopular: false
    },
    {
      id: 'mi-xao-chay',
      name: 'Mì Xào Chay',
      description: 'Mì xào chay với đậu hũ, nấm và rau củ',
      price: 45000,
      image: 'https://example.com/mi-xao-chay.jpg',
      category: 'mon-chay',
      rating: 4.7,
      isPopular: false
    },
    {
      id: 'bun-chay-nam',
      name: 'Bún Chay Nấm',
      description: 'Bún chay với các loại nấm và rau củ',
      price: 40000,
      image: 'https://example.com/bun-chay-nam.jpg',
      category: 'mon-chay',
      rating: 4.6,
      isPopular: false
    },

    // Đồ uống
    {
      id: 'tra-dao',
      name: 'Trà Đào',
      description: 'Trà đào thơm ngon, mát lạnh',
      price: 25000,
      image: 'https://example.com/tra-dao.jpg',
      category: 'do-uong',
      rating: 4.7,
      isPopular: true
    },
    {
      id: 'cafe-sua-da',
      name: 'Cà Phê Sữa Đá',
      description: 'Cà phê sữa đá truyền thống Việt Nam',
      price: 20000,
      image: 'https://example.com/cafe-sua-da.jpg',
      category: 'do-uong',
      rating: 4.8,
      isPopular: true
    },
    {
      id: 'nuoc-chanh',
      name: 'Nước Chanh',
      description: 'Nước chanh tươi mát lạnh',
      price: 15000,
      image: 'https://example.com/nuoc-chanh.jpg',
      category: 'do-uong',
      rating: 4.6,
      isPopular: false
    },
    {
      id: 'sinh-to-bo',
      name: 'Sinh Tố Bơ',
      description: 'Sinh tố bơ thơm ngon, béo ngậy',
      price: 30000,
      image: 'https://example.com/sinh-to-bo.jpg',
      category: 'do-uong',
      rating: 4.8,
      isPopular: true
    },
    {
      id: 'nuoc-mia',
      name: 'Nước Mía',
      description: 'Nước mía tươi mát lạnh',
      price: 15000,
      image: 'https://example.com/nuoc-mia.jpg',
      category: 'do-uong',
      rating: 4.5,
      isPopular: false
    },
    {
      id: 'tra-sua',
      name: 'Trà Sữa',
      description: 'Trà sữa thơm ngon với trân châu',
      price: 35000,
      image: 'https://example.com/tra-sua.jpg',
      category: 'do-uong',
      rating: 4.7,
      isPopular: true
    },
    {
      id: 'nuoc-dau',
      name: 'Nước Dừa',
      description: 'Nước dừa tươi mát lạnh',
      price: 20000,
      image: 'https://example.com/nuoc-dau.jpg',
      category: 'do-uong',
      rating: 4.6,
      isPopular: false
    }
  ];

  try {
    // Check if menu items already exist
    const menuCollection = collection(db, 'menus');
    const existingItems = await getDocs(menuCollection);
    
    if (existingItems.empty) {
      let successCount = 0;
      for (const item of menuItems) {
        try {
          await addDoc(menuCollection, item);
          successCount++;
          console.log(`✅ Đã thêm món: ${item.name}`);
        } catch (error) {
          console.error(`❌ Lỗi khi thêm món ${item.name}:`, error);
        }
      }
      console.log(`\n🎉 Đã thêm thành công ${successCount}/${menuItems.length} món vào menu!`);
    } else {
      console.log('ℹ️ Menu đã có dữ liệu, không cần thêm mới.');
    }
  } catch (error) {
    console.error('❌ Lỗi khi kiểm tra menu:', error);
  }
};

// Execute the function
populateMenu(); 
