import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllMensJoggers,
  fetchAllMensProducts,
  fetchAllMensShorts,
  fetchAllMensTshirts,
  fetchAllMensVests,
  fetchAllProducts,
  fetchAllWomensDresses,
  fetchAllWomensJoggers,
  fetchAllWomensProducts,
  fetchAllWomensTops,
  fetchAllWomensTshirt,
  fetchMenJoggersByFilters,
  fetchMenProductsByFilters,
  fetchMenShortsByFilters,
  fetchMenTshirtsByFilters,
  fetchMenVestByFilters,
  fetchProductById,
  fetchProductsByFilters,
  fetchWomenDresssByFilters,
  fetchWomenJoggersByFilters,
  fetchWomenProductsByFilters,
  fetchWomenTopsByFilters,
  fetchWomenTshirtByFilters,
  updateProduct,
  uploadProduct,
} from "./ProductApi";

const initialState = {
  products: [],
  status: "idle",
  selectedProduct: [],
  totalCount: 0,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const uploadProductAsync = createAsyncThunk(
  "product/uploadProduct",
  async (product) => {
    const response = await uploadProduct(product);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async (filter) => {
    const response = await fetchProductsByFilters(filter);
    return response.data;
  }
);
export const fetchAllMensProductsAsync = createAsyncThunk(
  "product/fetchAllMensProducts",
  async () => {
    const response = await fetchAllMensProducts();
    return response.data;
  }
);
export const fetchAllMensTshirtsAsync = createAsyncThunk(
  "product/fetchAllMensTshirts",
  async () => {
    const response = await fetchAllMensTshirts();
    return response.data;
  }
);
export const fetchAllMensTshirtsByFilterAsync = createAsyncThunk(
  "product/fetchAllMensTshirtsByFilter",
  async () => {
    const response = await fetchMenTshirtsByFilters();
    return response.data;
  }
);
export const fetchAllMensShortsAsync = createAsyncThunk(
  "product/fetchAllMensShorts",
  async () => {
    const response = await fetchAllMensShorts();
    return response.data;
  }
);
export const fetchAllMensShortsByFilterAsync = createAsyncThunk(
  "product/fetchAllMensShortsByFilter",
  async () => {
    const response = await fetchMenShortsByFilters();
    return response.data;
  }
);
export const fetchAllMensJoggerssAsync = createAsyncThunk(
  "product/fetchAllMensJoggers",
  async () => {
    const response = await fetchAllMensJoggers();
    return response.data;
  }
);
export const fetchAllMensJoggersByFilterAsync = createAsyncThunk(
  "product/fetchAllMensJoggersByFilter",
  async () => {
    const response = await fetchMenJoggersByFilters();
    return response.data;
  }
);
export const fetchAllMensVestAsync = createAsyncThunk(
  "product/fetchAllMensVest",
  async () => {
    const response = await fetchAllMensVests();
    return response.data;
  }
);
export const fetchAllMensVestByFilterAsync = createAsyncThunk(
  "product/fetchAllMensVestByFilter",
  async () => {
    const response = await fetchMenVestByFilters();
    return response.data;
  }
);
export const fetchMenProductsByFiltersAsync = createAsyncThunk(
  "product/fetchMenProductsByFilters",
  async (filter) => {
    const response = await fetchMenProductsByFilters(filter);
    return response.data;
  }
);
export const fetchAllWomensProductsAsync = createAsyncThunk(
  "product/fetchAllWomensProducts",
  async () => {
    const response = await fetchAllWomensProducts();
    return response.data;
  }
);
export const fetchWomenProductsByFiltersAsync = createAsyncThunk(
  "product/fetchWomenProductsByFilters",
  async (filter) => {
    const response = await fetchWomenProductsByFilters(filter);
    return response.data;
  }
);
export const fetchAllWomensDressesAsync = createAsyncThunk(
  "product/fetchAllWomensDresses",
  async () => {
    const response = await fetchAllWomensDresses();
    return response.data;
  }
);
export const fetchWomenDressesByFiltersAsync = createAsyncThunk(
  "product/fetchWomenDressesByFilters",
  async (filter) => {
    const response = await fetchWomenDresssByFilters(filter);
    return response.data;
  }
);
export const fetchAllWomensJoggersAsync = createAsyncThunk(
  "product/fetchAllWomensJoggers",
  async () => {
    const response = await fetchAllWomensJoggers();
    return response.data;
  }
);
export const fetchWomenJoggersByFiltersAsync = createAsyncThunk(
  "product/fetchWomenJoggersByFilters",
  async (filter) => {
    const response = await fetchWomenJoggersByFilters(filter);
    return response.data;
  }
);
export const fetchAllWomensTopsAsync = createAsyncThunk(
  "product/fetchAllWomensTops",
  async () => {
    const response = await fetchAllWomensTops();
    return response.data;
  }
);
export const fetchWomenTopsByFiltersAsync = createAsyncThunk(
  "product/fetchWomenTopsByFilters",
  async (filter) => {
    const response = await fetchWomenTopsByFilters(filter);
    return response.data;
  }
);
export const fetchAllWomensTshirtsAsync = createAsyncThunk(
  "product/fetchAllWomensTshirt",
  async () => {
    const response = await fetchAllWomensTshirt();
    return response.data;
  }
);
export const fetchWomenTshirtsByFiltersAsync = createAsyncThunk(
  "product/fetchWomenTshirtsByFilters",
  async (filter) => {
    const response = await fetchWomenTshirtByFilters(filter);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchAllMensProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllMensProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchAllMensTshirtsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllMensTshirtsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchAllMensShortsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllMensShortsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchAllMensTshirtsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllMensTshirtsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchMenProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchAllMensJoggerssAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllMensJoggersByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchAllMensVestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllMensVestByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchWomenProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWomenProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchAllWomensDressesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllWomensDressesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchAllWomensJoggersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllWomensJoggersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchAllWomensTopsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllWomensTopsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchAllWomensTshirtsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllWomensTshirtsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(uploadProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});
export const TotalCount = (state) => state.product.totalCount;

export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;

export default productSlice.reducer;
