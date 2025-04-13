import { getDatabase, ref, set, get, remove, update, onValue, off } from 'firebase/database';

const db = getDatabase();

// Food operations
export const foodService = {
  // Get all foods
  getAllFoods: async () => {
    try {
      const snapshot = await get(ref(db, 'foods'));
      return snapshot.val() || {};
    } catch (error) {
      console.error('Error getting foods:', error);
      throw error;
    }
  },

  // Get food by ID
  getFoodById: async (id) => {
    try {
      const snapshot = await get(ref(db, `foods/${id}`));
      return snapshot.val();
    } catch (error) {
      console.error('Error getting food:', error);
      throw error;
    }
  },

  // Add new food
  addFood: async (food) => {
    try {
      const foodRef = ref(db, `foods/${food.id}`);
      await set(foodRef, food);
      return food;
    } catch (error) {
      console.error('Error adding food:', error);
      throw error;
    }
  },

  // Update food
  updateFood: async (id, food) => {
    try {
      const foodRef = ref(db, `foods/${id}`);
      await update(foodRef, food);
      return food;
    } catch (error) {
      console.error('Error updating food:', error);
      throw error;
    }
  },

  // Delete food
  deleteFood: async (id) => {
    try {
      const foodRef = ref(db, `foods/${id}`);
      await remove(foodRef);
    } catch (error) {
      console.error('Error deleting food:', error);
      throw error;
    }
  },

  // Subscribe to foods changes
  subscribeToFoods: (callback) => {
    const foodsRef = ref(db, 'foods');
    onValue(foodsRef, (snapshot) => {
      const foods = snapshot.val() || {};
      callback(foods);
    });
    return () => off(foodsRef);
  }
};

// User operations
export const userService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const snapshot = await get(ref(db, 'users'));
      return snapshot.val() || {};
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const snapshot = await get(ref(db, `users/${id}`));
      return snapshot.val();
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  // Add new user
  addUser: async (user) => {
    try {
      const userRef = ref(db, `users/${user.id}`);
      await set(userRef, user);
      return user;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  // Update user
  updateUser: async (id, user) => {
    try {
      const userRef = ref(db, `users/${id}`);
      await update(userRef, user);
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const userRef = ref(db, `users/${id}`);
      await remove(userRef);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Subscribe to users changes
  subscribeToUsers: (callback) => {
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val() || {};
      callback(users);
    });
    return () => off(usersRef);
  }
}; 