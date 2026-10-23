
import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: []
  },
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;

      const alreadyExists = state.items.find(
        (item) => item.id === product.id
      );

      if (!alreadyExists) {
        state.items.push(product);
      }
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    }
  }
});

export const {
  addToWishlist,
  removeFromWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
