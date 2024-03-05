import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { takeEvery, put } from "redux-saga/effects";
import { toast } from "react-toastify";

// Action Types
export const actionTypes = {
  recentlyView: "ADD_TO_RECENTLY_VIEWED",
};

// Action Creators
export const recentlyView = (product) => {
  // console.log("Adding to recently viewed:", product);
  return {
    type: actionTypes.recentlyView,
    payload: {
      product: product,
    },
  };
};

// Initial State
const initialState = {
  data: [],
};

// Reducer
const recentlyViewedReducer = (state = initialState, action) => {
  // console.log("Reducer is called", action);
  switch (action.type) {
    case actionTypes.recentlyView:
      var findIndex = state.data.findIndex(
        (item) => item?.product_id === action.payload?.product?.product_id
      );
      if (findIndex == -1) {
        return {
          data: [...state.data, action.payload.product],
        };
      }
    default:
      return state;
  }
};

// Sagas

export function* recentlyViewedSaga() {
  yield takeEvery(actionTypes.recentlyView, function* saga(e) {
    // alert("addd");
  });
}
// Persist Configuration
const persistConfig = {
  keyPrefix: "molla-",
  key: "recentlyViewed",
  storage,
};

// Persisted Reducer

export default persistReducer(persistConfig, recentlyViewedReducer);
