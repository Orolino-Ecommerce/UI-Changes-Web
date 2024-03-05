import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ALink from "~/components/features/alink";
import Qty from "~/components/features/qty";
import PageHeader from "~/components/features/page-header";

import { actions as cartAction } from "~/store/cart";
import { cartPriceTotal } from "~/utils/index";
import { TrackGoogleAnalyticsEvent } from "~/pages/trackingevents";
function Cart(props) {
  const [cartList, setCartList] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCartList(props.cartItems);
  }, [props.cartItems]);

  useEffect(() => {
    // Calculate total when cartList or shippingCost changes
    const subtotal = cartPriceTotal(cartList);
    const newTotal = subtotal + shippingCost;
    setTotal(newTotal);
  }, [cartList, shippingCost]);

  function onChangeShipping(value) {
    setShippingCost(value);
  }

  // function changeQty(value, index) {
  //   setCartList(
  //     cartList.map((item, ind) => {
  //       if (ind === index)
  //         return {
  //           ...item,
  //           qty: value,
  //           sum: (item.sale_price ? item.sale_price : item.price) * value,
  //         };
  //       return item;
  //     })
  //   );
  // }
  function changeQty(value, index) {
    const updatedCartList = cartList.map((item, ind) => {
      if (ind === index) {
        return {
          ...item,
          qty: value,
          sum: (item.sale_price ? item.sale_price : item.price) * value,
        };
      }
      return item;
    });

    // Update the cart immediately when the quantity changes
    props.updateCart(updatedCartList);

    // Update the local state
    setCartList(updatedCartList);
  }

  function updateCart(e) {
    let button = e.currentTarget;
    button.querySelector(".icon-refresh").classList.add("load-more-rotating");

    setTimeout(() => {
      props.updateCart(cartList);
      button
        .querySelector(".icon-refresh")
        .classList.remove("load-more-rotating");
    }, 400);
  }
  const handleRemovefromCart = (item) => {
    console.log("removed item------------", item);
    const eventData = {
      event_name: "remove_from_cart",
      items: [
        {
          product_id: item.product_id,
          product_code: item?.product_code,
          product_name: item?.product_name,
          subcategory: item?.subcategory,
          product_variant_prices: [
            {
              product_variant_size_detail: item.size,
              product_color_code: item.color,
              product_variant_price_mrp: item.price,
            },
          ],
        },
      ],
      value: item.price,
      currency: "BDT",
    };

    TrackGoogleAnalyticsEvent(
      eventData.event_name,
      eventData.items,
      eventData.value,
      eventData.currency
    );
  };
  console.log("cartList", cartList);
  return (
    <div className="main">
      <PageHeader title="Shopping Cart" subTitle="Shop" />
      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="/shop/sidebar/3cols">Shop</ALink>
            </li>
            <li className="breadcrumb-item active">Shopping Cart</li>
          </ol>
        </div>
      </nav>

      <div className="page-content pb-5">
        <div className="cart">
          <div className="container">
            {cartList.length > 0 ? (
              <div className="row">
                <div className="col-lg-9">
                  <table className="table table-cart table-mobile">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartList.length > 0 ? (
                        cartList.map((item, index) => (
                          <tr key={index}>
                            <td className="product-col">
                              <div className="product">
                                <figure className="product-media">
                                  <ALink
                                    href={`/bd/products/${item?.product_name
                                      .trim()
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()}/${
                                      item?.product_id
                                    }-${item?.product_code
                                      .trim()
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()}`}
                                    className="product-image"
                                  >
                                    <img
                                      src={item.product_image}
                                      alt="product"
                                    />
                                  </ALink>
                                </figure>

                                <h4 className="product-title">
                                  <ALink
                                    href={`/bd/products/${item?.product_name
                                      .trim()
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()}/${
                                      item?.product_id
                                    }-${item?.product_code
                                      .trim()
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()}`}
                                  >
                                    {item.product_name}
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
                                          backgroundColor: item?.color,
                                          border: "1px solid #ddd",
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
                                        {item?.size}
                                      </span>
                                    </div>
                                  </div>
                                </h4>
                              </div>
                            </td>

                            <td className="price-col">
                              ৳
                              {item.price
                                ? item.price.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })
                                : item.price(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                            </td>

                            <td className="quantity-col">
                              <Qty
                                value={item.qty}
                                changeQty={(current) =>
                                  changeQty(current, index)
                                }
                                adClass="cart-product-quantity"
                              ></Qty>
                            </td>

                            <td className="total-col">
                              ৳
                              {item.sum.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </td>

                            <td className="remove-col">
                              <button
                                className="btn-remove"
                                onClick={() => {
                                  props.removeFromCart(item);
                                  handleRemovefromCart(item);
                                }}
                              >
                                <i className="icon-close"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>
                            <p className="pl-2 pt-1 pb-1">
                              {" "}
                              No Products in Cart{" "}
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {/* 
                  <div className="cart-bottom">
                    <button
                      className="btn btn-outline-dark-2"
                      onClick={updateCart}
                    >
                      <span>UPDATE CART</span>
                      <i className="icon-refresh"></i>
                    </button>
                  </div> */}
                </div>
                <aside className="col-lg-3">
                  <div className="summary summary-cart">
                    <h3 className="summary-title">Cart Total</h3>

                    <table className="table table-summary">
                      <tbody>
                        <tr className="summary-subtotal">
                          <td>Sub Total:</td>
                          <td>
                            ৳
                            {cartPriceTotal(cartList).toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </td>
                        </tr>
                        <tr className="summary-total">
                          <td>Total:</td>
                          <td>
                            ৳
                            {total.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <ALink
                      className="btn btn-outline-primary-2 btn-order btn-block"
                      href="/shop/checkout"
                    >
                      PROCEED TO CHECKOUT
                    </ALink>
                  </div>

                  <ALink
                    href="/shop/sidebar/3cols"
                    className="btn btn-outline-dark-2 btn-block mb-3"
                  >
                    <span>CONTINUE SHOPPING</span>
                    <i className="icon-refresh"></i>
                  </ALink>
                </aside>
              </div>
            ) : (
              <div className="row">
                <div className="col-12">
                  <div className="cart-empty-page text-center">
                    <i
                      className="cart-empty icon-shopping-cart"
                      style={{ lineHeight: 1, fontSize: "15rem" }}
                    ></i>
                    <p className="px-3 py-2 cart-empty mb-3">
                      No products added to the cart
                    </p>
                    <p className="return-to-shop mb-0">
                      <ALink
                        href="/shop/sidebar/3cols"
                        className="btn btn-primary"
                      >
                        RETURN TO SHOP
                      </ALink>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.cartlist.data,
});

export default connect(mapStateToProps, { ...cartAction })(Cart);
