import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

export const actionTypes = {
  addToWishlist: "ADD_TO_WISHLIST",
  removeFromWishlist: "REMOVE_FROM_WISHLIST",
  refreshStore: "REFRESH_STORE",
};

const initialState = {
  data: [],
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.addToWishlist:
      var findIndex = state.data.findIndex(
        (item) =>
          item.product_id === action.payload.product.product_id &&
          item.product_variant_prices.findIndex(
            (variant) =>
              variant.product_color_code === payload.productColor &&
              variant.product_variant_size === payload.productSize &&
              variant.product_variant_offer_price === payload.productPrice
          ) !== -1
      );
      if (findIndex == -1) {
        return {
          data: [
            ...state.data,
            {
              ...action.payload.product,
              productColor: action.payload.productColor,
              productSize: action.payload.productSize,
              productPrice: action.payload.productPrice,
            },
          ],
        };
      }

    case actionTypes.removeFromWishlist:
      return {
        data: state.data.filter(
          (item) => item.product_id !== action.payload.product.product_id
        ),
      };

    case actionTypes.refreshStore:
      return initialState;

    default:
      return state;
  }
};

export const actions = {
  addToWishlist: (product, productColor, productSize, productPrice) => ({
    type: actionTypes.addToWishlist,
    payload: {
      product: {
        ...product,
        productColor,
        productSize,
        productPrice,
      },
    },
  }),

  removeFromWishlist: (product) => ({
    type: actionTypes.removeFromWishlist,
    payload: {
      product,
    },
  }),
};

export function* wishlistSaga() {
  yield takeEvery(actionTypes.addToWishlist, function* saga(e) {
    toast.success("Product added to Wishlist");
  });
}

const persistConfig = {
  keyPrefix: "molla-",
  key: "wishlist",
  storage,
};

export default persistReducer(persistConfig, wishlistReducer);
