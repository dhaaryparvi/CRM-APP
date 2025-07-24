// src/redux/slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await axios.get('https://dummyjson.com/products');
  return res.data.products;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch';
      });
  },
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
