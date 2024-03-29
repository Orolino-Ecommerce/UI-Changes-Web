import { connect } from "react-redux";

import ALink from "~/components/features/alink";

import { actions } from "~/store/cart";
import { cartQtyTotal, cartPriceTotal } from "~/utils/index";

function CartMenu(props) {
  const { cartlist } = props;
  // console.log("----------", cartlist);
  return (
    <div className="dropdown cart-dropdown pl-3">
      <ALink
        href="/bd/cart"
        className="dropdown-toggle"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        data-display="static"
      >
        <i className="icon-shopping-cart"></i>
        <span className="cart-count"> {cartQtyTotal(cartlist)}</span>
        <span className="cart-txt font-weight-semibold">
          {"\u09F3 "}
          {cartPriceTotal(cartlist).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </ALink>

      <div
        className={`dropdown-menu dropdown-menu-right ${
          cartlist.length === 0 ? "text-center" : ""
        }`}
      >
        {0 === cartlist.length ? (
          <p>No products in the cart.</p>
        ) : (
          <>
            <div className="dropdown-cart-products">
              {cartlist.map((item, index) => (
                <div className="product justify-content-between" key={index}>
                  <div className="product-cart-details">
                    <h4 className="product-title">
                      <ALink href={`/product/default/${item.product_id}`}>
                        {item.product_name}
                      </ALink>
                    </h4>

                    <span className="cart-product-info">
                      <span className="cart-product-qty">{item.qty} </span>x{" "}
                      {"\u09F3 "}
                      {item.sale_price ? item.sale_price : item.price}
                    </span>
                  </div>

                  <figure className="product-image-container ml-2">
                    <ALink
                      href={`/product/default/${item.slug}`}
                      className="product-image"
                    >
                      <img src={item.product_image} alt="product" />
                    </ALink>
                  </figure>
                  <button
                    className="btn-remove"
                    title="Remove Product"
                    onClick={() => props.removeFromCart(item)}
                  >
                    <i className="icon-close"></i>
                  </button>
                </div>
              ))}
            </div>
            <div className="dropdown-cart-total">
              <span>Total</span>

              <span className="cart-total-price">
                {"\u09F3 "}
                {cartPriceTotal(cartlist).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="dropdown-cart-action">
              <ALink href="/bd/cart" className="btn btn-primary">
                View Cart
              </ALink>
              <ALink
                href="/shop/checkout"
                className="btn btn-outline-primary-2"
              >
                <span>Checkout</span>
                <i className="icon-long-arrow-right"></i>
              </ALink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartlist: state.cartlist.data,
  };
}

export default connect(mapStateToProps, { ...actions })(CartMenu);
