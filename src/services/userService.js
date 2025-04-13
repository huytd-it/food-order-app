import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, doc, getDocs, deleteDoc, onSnapshot } from 'firebase/firestore';

export const userService = {
  // Subscribe to real-time user updates
  subscribeToUsers(callback) {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(users);
    }, (error) => {
      console.error('Error subscribing to users:', error);
    });
    return unsubscribe;
  },

  // Get all users
  async getAllUsers() {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      return usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Add a new user
  async addUser(userData) {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return { id: docRef.id, ...userData };
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  // Update user role
  async updateUserRole(userId, role) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        role,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  },

  // Delete user
  async deleteUser(userId) {
    try {
      await deleteDoc(doc(db, 'users', userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}; 