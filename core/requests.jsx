import axios from "axios";
import { toast } from "react-toastify";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

//console.log("API_URL", API_URL);
const emailOtps = (email, name) => {
  // console.log("email", email);
  return axios
    .post(`${API_URL}/login/emailOtp`, { email, name })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const mobileOtps = (mobile, userId, email) => {
  // console.log("email", email);
  return axios
    .post(`${API_URL}/buyNow/checkoutOTP`, { mobile, userId, email })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const loginOtps = (mobile, name) => {
  // console.log("email", email);
  return axios
    .post(`${API_URL}/login`, { mobile, name })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const mobileverifyOtps = (mobile, otp, id) => {
  return axios
    .post(`${API_URL}/buyNow/checkoutVerifyotp`, { mobile, otp, id })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const loginverifyOtps = (mobile, otp) => {
  return axios
    .post(`${API_URL}/login/verifyOtp`, { mobile, otp })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const verifyOtps = (email, otp) => {
  return axios
    .post(`${API_URL}/login/verifyEmailotp`, { email, otp })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const Slider = (catID) => {
  return axios
    .get(`${API_URL}/banner/listBanner/${catID}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      // alert("pls wait")
      //
      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const Category = () => {
  return axios
    .get(`${API_URL}/category/listCategories`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const SubCategory = (catID) => {
  return axios
    .get(`${API_URL}/category/listSubCategories/${catID}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const SubHomeCategory = (catID, type) => {
  return axios
    .get(`${API_URL}/category/listHomeSubCategories/${catID}/${type}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const DealSubCategory = (catID) => {
  return axios
    .get(`${API_URL}/category/listDealSubCategories/${catID}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const latestProduct = (type, catID) => {
  return axios
    .post(`${API_URL}/product/listProduct/${catID}`, { type })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const productDetails = (id) => {
  return axios
    .get(`${API_URL}/product/productDetail/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const listProduct = (catID, type = "") => {
  // console.log("catID", catID);
  return axios
    .post(`${API_URL}/product/listProduct/${catID}`, { type })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const listDeal = (catID) => {
  return axios
    .get(`${API_URL}/product/listDealProduct/${catID}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const DivCategory = (catID, type) => {
  return axios
    .get(`${API_URL}/category/DivSubCategories/${catID}/${type}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const brandInfo = () => {
  return axios
    .get(`${API_URL}/brand/listBrand`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const wishLists = (userId) => {
  return axios
    .get(`${API_URL}/wishlist/${userId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const addToWishlist = (productId, userId, variantId) => {
  //console.log("formattedData",data)
  return axios
    .post(`${API_URL}wishlist/addWishList`, { productId, userId, variantId })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const removeWishList = (wishlistId) => {
  return axios
    .delete(`${API_URL}/wishlist/removeWishList/${wishlistId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const addReview = (formData) => {
  return axios
    .post(`${API_URL}/review/addReview`, formData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const listReviews = (id) => {
  return axios
    .get(`${API_URL}/review/listReview/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const getOutOfStock = (id, color, size) => {
  return axios
    .post(`${API_URL}/product/getOutofstock`, { id, color, size })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const getRelatedProducts = (catID, PID) => {
  return axios
    .get(`${API_URL}/product/relatedProduct/${catID}/${PID}`)
    .then((response) => {
      // console.log("response", response);
      return response.data;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const getBuyNow = (id, varId) => {
  return axios
    .get(`${API_URL}/product/getBuyNow/${id}/${varId}`)
    .then((response) => {
      // console.log("response", response);
      return response.data;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const getCoupon = (code, amt, user_id) => {
  return axios
    .get(`${API_URL}/product/couponCheck/${code}/${amt}/${user_id}`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const getAddressList = (id) => {
  return axios
    .get(`${API_URL}/buyNow/addressList/${id}`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const removeAddressList = (id) => {
  return axios
    .get(`${API_URL}/buyNow/removeAddressList/${id}`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const addAddressList = (data) => {
  return axios
    .post(`${API_URL}/buyNow/addAddress`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const addOrder = (data) => {
  return axios
    .post(`${API_URL}/order/addOrder`, data)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const getOrderList = (id) => {
  return axios
    .get(`${API_URL}/order/orderList/${id}`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};

const getOrderView = (id) => {
  return axios
    .get(`${API_URL}/order/viewOrdersList/${id}`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const settings = () => {
  return axios
    .get(`${API_URL}/banner/web/settings`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const addContactList = (data) => {
  return axios
    .post(`${API_URL}/banner/addContact`, data)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};

//Filter in product List
const filterData = (catId) => {
  return axios
    .get(`${API_URL}/product/filterData/${catId}`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const addCartOrder = (data) => {
  return axios
    .post(`${API_URL}/order/addCartOrder`, data)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const listProductNew = (catID, queryParams) => {
  const queryString = new URLSearchParams(queryParams).toString();
  // console.log("queryString==================", queryString);
  return axios
    .post(`${API_URL}/product/list-product/${catID}?${queryString}`)
    .then((response) => {
      // console.log("core response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const addOnlineOrder = (data) => {
  return axios
    .post(`${API_URL}/paymentGateway/initializePayment`, data)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
//Filter in product List
const paymentLists = (catId) => {
  return axios
    .get(`${API_URL}/paymentGateway/listPaymentOptions`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const addBuyOnlineOrder = (data) => {
  return axios
    .post(`${API_URL}/paymentGateway/initializeBuyPayment`, data)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const paymentHistory = (data) => {
  return axios
    .post(`${API_URL}/paymentGateway/transactionHistory`, data)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const getTracker = (id) => {
  return axios
    .get(`${API_URL}/order/callTracker/${id}`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const returnProduct = (id, reason, notes, status) => {
  return axios
    .post(`${API_URL}/order/returnProduct`, { id, reason, notes, status })
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const getTrackerTimeline = (id) => {
  return axios
    .get(`${API_URL}/order/getOrderTimeline/${id}`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const getOverview = (id) => {
  return axios
    .get(`${API_URL}/order/orderOverview/${id}`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const getReturnDate = (id) => {
  return axios
    .get(`${API_URL}/order/getReturnDate/${id}`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const searcProducts = (searchTerm) => {
  return axios
    .get(`${API_URL}/product/searchProduct/${searchTerm}`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const getTransactionDetails = (id) => {
  return axios
    .get(`${API_URL}/order/viewOrdersByTransaction/${id}`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const getCategoryDetail = (id) => {
  return axios
    .get(`${API_URL}/category/viewCategory/${id}`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const listFilterProducts = (catID, queryParams) => {
  const queryString = new URLSearchParams(queryParams);
  console.log(
    "queryString==================",
    `${API_URL}/product/listDealFilerProduct/${catID}?${queryString}`
  );
  return axios
    .post(`${API_URL}/product/listDealFilerProduct/${catID}?${queryString}`)
    .then((response) => {
      console.log("core response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
const getCategory = (id) => {
  return axios
    .get(`${API_URL}category/getCategory/${id}`)
    .then((response) => {
      // console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.error("An error occurred:", error);

      // Display a popup with the error message
      // showErrorPopup('Something went wrong'); // You would need to implement your own showErrorPopup function
    });
};
export {
  emailOtps,
  verifyOtps,
  Slider,
  Category,
  latestProduct,
  productDetails,
  listProduct,
  SubCategory,
  listDeal,
  DivCategory,
  DealSubCategory,
  brandInfo,
  wishLists,
  removeWishList,
  addToWishlist,
  addReview,
  listReviews,
  getOutOfStock,
  addAddressList,
  addOrder,
  getRelatedProducts,
  getBuyNow,
  getCoupon,
  getAddressList,
  removeAddressList,
  getOrderList,
  listProductNew,
  addCartOrder,
  settings,
  addContactList,
  getOrderView,
  filterData,
  addOnlineOrder,
  paymentLists,
  paymentHistory,
  addBuyOnlineOrder,
  getTracker,
  SubHomeCategory,
  returnProduct,
  getTrackerTimeline,
  getOverview,
  getReturnDate,
  searcProducts,
  getTransactionDetails,
  getCategoryDetail,
  listFilterProducts,
  getCategory,
  mobileOtps,
  mobileverifyOtps,
  loginOtps,
  loginverifyOtps,
};
