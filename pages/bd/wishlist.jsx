import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ALink from "~/components/features/alink";
import PageHeader from "~/components/features/page-header";
import { GetColorName } from "hex-color-to-color-name";
import { actions as wishlistAction } from "~/store/wishlist";
import { actions as cartAction } from "~/store/cart";
import { wishLists, removeWishList } from "~/core/requests";
import { toast } from "react-toastify";
import { getCategory } from "~/core/requests";
import { useRouter } from "next/router";
import { useWishlist } from "~/components/partials/header/partials/WishlistContext";

function Wishlist(props) {
  const router = useRouter();
  const { wishlistCount, updateWishlistCount } = useWishlist();
  const [wishItems, setWishItems] = useState([]);
  const category = localStorage.getItem("category");
  if (category && category != "undefined") {
    var LoCat = category;
  } else {
    localStorage.setItem("category", 1);
    var LoCat = 1;
  }
  const [getcat, setcat] = useState("");
  //For Wishlists from API
  let userId = "";
  const UserDetail = JSON.parse(localStorage.getItem("User"));
  if (UserDetail) {
    userId = UserDetail.userId;
  }
  if (userId) {
    useEffect(() => {
      getWishlistData();
    }, []);
  }
  const getWishlistData = () => {
    wishLists(userId).then((res) => {
      // console.log("------------", res?.data?.data);
      setWishItems(res?.data?.data);
    });
  };

  useEffect(() => {
    getCategory(LoCat).then((res) => {
      setcat(res?.data?.data);
    });
  }, []);

  function moveToCart(product) {
    // console.log("product----------", product);
    const colorName = GetColorName(
      product?.product_variant_price?.product_color_code
    );
    // console.log("colorName", colorName);
    const newProduct = {
      name:
        product?.product?.product_name +
        " - " +
        colorName +
        ", " +
        product?.product_variant_price?.product_variant_size_detail,
      price: product?.product_variant_price?.product_variant_offer_price,
      variantId: product?.product_variant_price?.product_variant_price_id,
      product_image: product?.product?.product_image,
      product_delivery_charge: product?.product?.product_delivery_charge,
      product_id: product?.productid,
      product_name: product?.product?.product_name,
    };
    props.removeFromWishlist();
    props.addToCart(newProduct);
  }
  console.log(wishItems);
  function removeFromWishlist(wishlistId) {
    // console.log("wishlistId", wishlistId);
    removeWishList(wishlistId).then((res) => {
      toast.success(res?.data?.Message);
      updateWishlistCount(wishlistCount - 1);
      getWishlistData();
    });
  }
  if (!wishItems) {
    return (
      <div>
        <div style={{ textAlign: "-webkit-center" }}>
          <img src={"/images/loader.gif"} style={{ width: "300px" }} />{" "}
        </div>
      </div>
    );
  }
  return (
    <main className="main">
      <PageHeader title="Wishlist" subTitle="Shop" />
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href={`/bd/shop/${getcat}/3cols`}>Shop</ALink>
            </li>
            <li className="breadcrumb-item active">Wishlist</li>
          </ol>
        </div>
      </nav>

      <div className="page-content pb-5">
        {wishItems?.length > 0 ? (
          <div className="container">
            <table className="table table-wishlist table-mobile">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock Status</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {wishItems?.map((product, index) => (
                  <tr key={index}>
                    <td className="product-col">
                      <div className="product">
                        <figure className="product-media">
                          <ALink
                            href={`/bd/products/${product?.product?.product_name
                              .trim()
                              .replace(/\s+/g, "-")
                              .toLowerCase()}/${
                              product?.product?.product_id
                            }-${product?.product?.product_code
                              .trim()
                              .replace(/\s+/g, "-")
                              .toLowerCase()}`}
                            className="product-image"
                          >
                            <img
                              src={product?.product?.product_image}
                              alt="product"
                            />
                          </ALink>
                        </figure>

                        <h4 className="product-title">
                          <ALink
                            href={`/bd/products/${product?.product?.product_name
                              .trim()
                              .replace(/\s+/g, "-")
                              .toLowerCase()}/${
                              product?.product?.product_id
                            }-${product?.product?.product_code
                              .trim()
                              .replace(/\s+/g, "-")
                              .toLowerCase()}`}
                          >
                            {product?.product?.product_name}
                          </ALink>
                          <div
                            style={{ marginTop: "10px" }}
                            className="details-filter-row details-row-size"
                          >
                            <label
                              style={{
                                fontSize: "12px",
                                color: "rgb(158 154 154)",
                              }}
                            >
                              Color :
                            </label>
                            <div className="product-nav product-nav-dots">
                              <span
                                className="active"
                                style={{
                                  backgroundColor:
                                    product?.product_variant_price
                                      ?.product_color_code,
                                  fontSize: "14px",
                                }}
                              ></span>
                            </div>
                          </div>
                          <div
                            style={{ marginTop: "10px" }}
                            className="details-filter-row details-row-size"
                          >
                            <label
                              style={{
                                fontSize: "12px",
                                color: "rgb(158 154 154)",
                              }}
                            >
                              Size :
                            </label>
                            <div className="product-nav product-nav-dots">
                              <span
                                className="active"
                                style={{ fontSize: "14px" }}
                              >
                                {
                                  product?.product_variant_price
                                    ?.product_variant_size_detail
                                }
                              </span>
                            </div>
                          </div>
                        </h4>
                      </div>
                    </td>
                    <td className="price-col">
                      {product?.product_variant_price?.outofstock != 0 ? (
                        <div className="product-price d-inline-block mb-0">
                          <span className="out-price">
                            {" "}
                            {product?.product_variant_price?.product_variant_offer_price.toFixed(
                              2
                            )}
                          </span>
                        </div>
                      ) : (
                        <div className="product-price d-inline-block mb-0">
                          <span className="new-price">
                            {"\u09F3 "}
                            {product?.product_variant_price?.product_variant_offer_price.toFixed(
                              2
                            )}
                          </span>
                          <span className="old-price">
                            {"\u09F3 "}
                            {product?.product_variant_price?.product_variant_price_mrp.toFixed(
                              2
                            )}
                          </span>
                        </div>
                      )}
                    </td>
                    {/* <td className="stock-col">
                      <span
                        className={`${
                          product?.product_variant_price?.outofstock != 0
                            ? "in-stock"
                            : "out-of-stock"
                        }`}
                      >
                        {product?.product_variant_price?.outofstock != 0
                          ? "In stock"
                          : "Out of stock"}
                      </span>
                    </td> */}
                    <td className="stock-col">
                      <span
                        className={`${
                          product?.product_variant_price?.outofstock !== null &&
                          product?.product_variant_price?.outofstock !== 0
                            ? "out-of-stock"
                            : "in-stock"
                        }`}
                      >
                        {product?.product_variant_price?.outofstock !== null &&
                        product?.product_variant_price?.outofstock !== 0
                          ? "Out of stock"
                          : "In stock"}
                      </span>
                      {/* Add logging */}
                      {console.log("Outofstock value:", product)}
                    </td>

                    <td className="action-col">
                      <div className="dropdown">
                        {product?.product_variant_price?.length > 0 ||
                        product?.product_variant_price?.outofstock != 0 ? (
                          <ALink
                            href={`/bd/products/${product?.product?.product_name
                              .trim()
                              .replace(/\s+/g, "-")
                              .toLowerCase()}/${
                              product?.product?.product_id
                            }-${product?.product?.product_code
                              .trim()
                              .replace(/\s+/g, "-")
                              .toLowerCase()}`}
                            className="btn btn-block btn-outline-primary-2 btn-select"
                          >
                            <i className="icon-list-alt"></i>
                            {product?.product_variant_price?.outofstock != 0
                              ? "View Details"
                              : "select"}
                          </ALink>
                        ) : (
                          <button
                            className="btn btn-block btn-outline-primary-2"
                            onClick={(e) => moveToCart(product)}
                          >
                            <i className="icon-cart-plus"></i>
                            add to cart
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="remove-col">
                      <button
                        className="btn-remove"
                        onClick={(e) => removeFromWishlist(product?.id)}
                      >
                        <i className="icon-close"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="container">
            <div className="text-center">
              <i
                className="icon-heart-o wishlist-empty d-block"
                style={{ fontSize: "15rem", lineHeight: "1" }}
              ></i>
              <span className="d-block mt-2">
                No products added to wishlist
              </span>
              <ALink
                href={`/bd/shop/${getcat}/3cols`}
                className="btn btn-primary mt-2"
              >
                Go Shop
              </ALink>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const mapStateToProps = (state) => ({
  wishlist: state.wishlist.data,
});

export default connect(mapStateToProps, { ...wishlistAction, ...cartAction })(
  Wishlist
);
