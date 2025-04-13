import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { storage, db } from '../firebaseConfig';

export const foodService = {
  // Upload food image to Firebase Storage
  async uploadFoodImage(file) {
    try {
      const storageRef = ref(storage, `foods/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading food image:', error);
      throw error;
    }
  },

  // Add new food item
  async addFood(foodData) {
    try {
      const foodRef = collection(db, 'foods');
      const docRef = await addDoc(foodRef, {
        ...foodData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return { id: docRef.id, ...foodData };
    } catch (error) {
      console.error('Error adding food:', error);
      throw error;
    }
  },

  // Get all food items
  async getAllFoods() {
    try {
      const foodRef = collection(db, 'foods');
      const snapshot = await getDocs(foodRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting foods:', error);
      throw error;
    }
  },

  // Update food item
  async updateFood(foodId, foodData) {
    try {
      const foodRef = doc(db, 'foods', foodId);
      await updateDoc(foodRef, {
        ...foodData,
        updatedAt: new Date().toISOString(),
      });
      return { id: foodId, ...foodData };
    } catch (error) {
      console.error('Error updating food:', error);
      throw error;
    }
  },

  // Delete food item
  async deleteFood(foodId) {
    try {
      const foodRef = doc(db, 'foods', foodId);
      await deleteDoc(foodRef);
      return foodId;
    } catch (error) {
      console.error('Error deleting food:', error);
      throw error;
    }
  }
}; 