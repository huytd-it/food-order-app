import { doc, updateDoc, getDocs, query, where, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const setUserAsAdmin = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      role: 'admin'
    });
    return true;
  } catch (error) {
    console.error('Error setting user as admin:', error);
    throw error;
  }
};

export const isUserAdmin = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    return userDoc.data()?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

export const adminService = {
  // Set user as admin by email
  async setUserAsAdminByEmail(email) {
    try {
      // Find user by email
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('User not found');
      }

      // Update the first matching user
      const userDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, 'users', userDoc.id), {
        role: 'admin',
        updatedAt: new Date().toISOString()
      });

      return { success: true, message: 'User set as admin successfully' };
    } catch (error) {
      console.error('Error setting user as admin:', error);
      throw error;
    }
  }
}; 