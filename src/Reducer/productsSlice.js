import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://dummyjson.com/products');
  return response.data.products;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const response = await axios.post('https://dummyjson.com/products/add', product);
  return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id,title,brand }) => {
  const response = await axios.put(`https://dummyjson.com/products/${id}`, {title:title,brand:brand})
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await axios.delete(`https://dummyjson.com/products/${id}`);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => action.payload)
      .addCase(addProduct.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.findIndex(product => product.id === action.payload.id);
        state[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        return state.filter(product => product.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;