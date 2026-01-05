import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { cart, cartGuest, orders } from "../constants/URLs";

import { toast } from "react-toastify";

import axios from "../axios";

export const getUserCart = createAsyncThunk(
  "getUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(cart);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getGuestCart = createAsyncThunk(
  "getGuestCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(cartGuest);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postUserCart = createAsyncThunk(
  "postUserCart",
  async (userCart, { rejectWithValue }) => {
    try {
      const response = await axios.post(orders, userCart);
      return response.data;
    } catch (error) {
      toast.error("Ошибка! Сделайте заказ по-позже", {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
      });

      return rejectWithValue(error);
    }
  }
);

const initialState = {
  items: [],
  devices: 0,
  deliveryMethod: "delivery",
  isCartOpen: false,
  isCartLoading: false,
  error: null,
  displayModal: false,
};

const selectCartItems = (state) => state.cart.items;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setMethod: (state, action) => {
      state.deliveryMethod = action.payload;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    removeAllFromCart: (state) => {
      state.items = [];
    },
    deviceQuantity: (state, action) => {
      const { quantity } = action.payload;
      if (quantity >= 0) {
        state.devices = quantity;
      } else {
        return;
      }
    },
    setDisplayModal: (state, action) => {
      state.displayModal = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getGuestCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(getGuestCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(postUserCart.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(postUserCart.fulfilled, (state) => {
        state.items = [];
        state.devices = 1;
        state.deliveryMethod = "delivery";
        state.isCartLoading = false;
      })
      .addCase(postUserCart.rejected, (state) => {
        state.isCartLoading = false;
      }),
});

export const selectTotalAmount = createSelector(selectCartItems, (items) =>
  items.reduce((acc, item) => acc + item.quantity * item.price, 0)
);

export const selectTotalQuantity = createSelector(selectCartItems, (items) =>
  items.reduce((acc, item) => acc + item.quantity, 0)
);

export const {
  setMethod,
  closeCart,
  toggleCart,
  addToCart,
  removeAllFromCart,
  deviceQuantity,
  cartItemQuantity,
  setDisplayModal,
} = cartSlice.actions;
export default cartSlice.reducer;
