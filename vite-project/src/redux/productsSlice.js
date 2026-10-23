
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async () => {
//     const response = await fetch('https://dummyjson.com/products');

//     if (!response.ok) {
//       throw new Error('Failed to fetch products');
//     }

//     const data = await response.json();
//     return data.products;
//   }
// );

// const productsSlice = createSlice({
//   name: 'products',

//   initialState: {
//     items: [],
//     loading: false,
//     error: ''
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = '';
//       })

//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })

//       .addCase(fetchProducts.rejected, (state) => {
//         state.loading = false;
//         state.error = 'Unable to load products. Please try again.';
//       });
//   }
// });

// export default productsSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(
      'https://fakestoreapi.com/products'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = 'Unable to load products. Please try again.';
      });
  }
});

export default productsSlice.reducer;
