import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ALink from "~/components/features/alink";
import Ratings from "~/core/Ratings";
import { actions as wishlistAction } from "~/store/wishlist";
import { actions as cartAction } from "~/store/cart";
import { actions as compareAction } from "~/store/compare";
import { actions as demoAction } from "~/store/demo";

import { isInWishlist, isInCompare } from "~/utils";

function ProductDeal(props) {
  const router = useRouter();
  const { product, wishlist } = props;
  const [products, setproduct] = useState(product?.product);

  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(99999);

  function onCartClick(e) {
    e.preventDefault();
    props.addToCart(products);
  }

  function onWishlistClick(e) {
    e.preventDefault();
    if (!isInWishlist(props.wishlist, products)) {
      // console.log("addddddddd");
      props.addToWishlist(products);
    } else {
      router.push("/pages/wishlist");
    }
  }

  function onCompareClick(e) {
    e.preventDefault();
    if (!isInCompare(props.comparelist, products)) {
      props.addToCompare(products);
    }
  }

  function onQuickView(e) {
    e.preventDefault();
    props.showQuickView(products.product_id);
  }
  const ratingAvg = Ratings(products?.reviews || []);

  const firstVariant = products?.product_variant_prices
    ?.sort((a, b) => a.product_variant_price_id - b.product_variant_price_id)
    .filter((item, index, self) => {
      return (
        index ===
        self.findIndex((t) => t.product_color_code === item.product_color_code)
      );
    })[0];
  const firstSize = products?.product_variant_prices?.reduce((acc, cur) => {
    if (acc.findIndex((item) => item.size === cur.size) !== -1) return acc;
    return [...acc, cur];
  }, [])[0];

  const variantInfo = `${
    firstSize?.product_variant_size_detail
  }${firstVariant?.product_color_code.replace(/#/g, "")}`;
  return (
    <div className="product product-7 text-center">
      <>
        <figure className="product-media">
          {products?.product_top ? (
            <span className="product-label label-top">Top</span>
          ) : (
            ""
          )}
          {product?.product_verify ? (
            <span
              className="product-label mt-3 label-top"
              style={{ backgroundColor: "#d02b2f" }}
            >
              Verified
            </span>
          ) : (
            ""
          )}

          <ALink
            href={`/bd/products/${products?.product_name
              .trim()
              .replace(/\s+/g, "-")
              .toLowerCase()}/${products?.product_id}-${products?.product_code
              .trim()
              .replace(/\s+/g, "-")
              .toLowerCase()}/?variant=${variantInfo}`}
          >
            <LazyLoadImage
              alt="product"
              src={products?.product_image}
              threshold={500}
              effect="black and white"
              wrapperClassName="product-image"
            />
            {products?.product_galleries?.length >= 2 ? (
              <LazyLoadImage
                alt="product"
                src={products?.product_galleries[0]?.gallery_image}
                threshold={500}
                effect="black and white"
                wrapperClassName="product-image-hover"
              />
            ) : (
              ""
            )}
          </ALink>

          <div className="product-action-vertical">
            {isInWishlist(wishlist, products) ? (
              <ALink
                href="/shop/wishlist"
                className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist"
              >
                <span>go to wishlist</span>
              </ALink>
            ) : (
              <a
                href="#"
                className="btn-product-icon btn-wishlist btn-expandable"
                onClick={onWishlistClick}
              >
                <span>add to wishlist</span>
              </a>
            )}
            <ALink
              href={`/bd/products/${products?.product_name
                .trim()
                .replace(/\s+/g, "-")
                .toLowerCase()}/${products?.product_id}-${products?.product_code
                .trim()
                .replace(/\s+/g, "-")
                .toLowerCase()}/?variant=${variantInfo}`}
              className="btn-product-icon btn-quickview"
              title="Quick View"
              //onClick={onQuickView}
            >
              <span>quick view</span>
            </ALink>
          </div>

          <div className="product-action product-action-transparent">
            {products?.product_variant_prices?.length > 0 ? (
              <ALink
                href={`/bd/products/${products?.product_name
                  .trim()
                  .replace(/\s+/g, "-")
                  .toLowerCase()}/${
                  products?.product_id
                }-${products?.product_code
                  .trim()
                  .replace(/\s+/g, "-")
                  .toLowerCase()}/?variant=${variantInfo}`}
                className="btn-product btn-cart btn-select"
              >
                <span>select options</span>
              </ALink>
            ) : (
              <button className="btn-product btn-cart" onClick={onCartClick}>
                <span>add to cart</span>
              </button>
            )}
          </div>
        </figure>

        <div className="product-body">
          <div className="product-cat">
            <React.Fragment>
              <ALink
                href={`/bd/products/${products?.product_name
                  .trim()
                  .replace(/\s+/g, "-")
                  .toLowerCase()}/${
                  products?.product_id
                }-${products?.product_code
                  .trim()
                  .replace(/\s+/g, "-")
                  .toLowerCase()}/?variant=${variantInfo}`}
              >
                {products?.subcategory?.subcategory_name}
              </ALink>
            </React.Fragment>
          </div>
          <h3 className="product-title">
            <ALink
              href={`/bd/products/${products?.product_name
                .trim()
                .replace(/\s+/g, "-")
                .toLowerCase()}/${products?.product_id}-${products?.product_code
                .trim()
                .replace(/\s+/g, "-")
                .toLowerCase()}/?variant=${variantInfo}`}
            >
              {products?.product_name}
            </ALink>
            <div className="product-price">
              <span className="out-price">
                {"\u09F3 "}
                {products &&
                products?.product_variant_prices &&
                products?.product_variant_prices[0] &&
                products?.product_variant_prices[0]?.product_variant_offer_price
                  ? products?.product_variant_prices[0]?.product_variant_offer_price.toFixed(
                      2
                    )
                  : ""}
              </span>
            </div>
          </h3>
          <div className="ratings-container">
            <div className="ratings">
              <div
                className="ratings-val"
                style={{ width: ratingAvg * 20 + "%" }}
              ></div>
              <span className="tooltip-text">{ratingAvg}</span>
            </div>
            <span className="ratings-text">
              ( {products?.reviews?.length} Reviews )
            </span>
          </div>
          <div className="product-nav product-nav-dots">
            {products?.product_variant_prices
              ?.sort(
                (a, b) =>
                  a.product_variant_price_id - b.product_variant_price_id
              )
              .filter((item, index, self) => {
                return (
                  index ===
                  self.findIndex(
                    (t) => t.product_color_code === item.product_color_code
                  )
                );
              })
              .map((item, index) => (
                <ALink
                  href={`/bd/products/${products?.product_name
                    .trim()
                    .replace(/\s+/g, "-")
                    .toLowerCase()}/${
                    products?.product_id
                  }-${products?.product_code
                    .trim()
                    .replace(/\s+/g, "-")
                    .toLowerCase()}/?variant=${variantInfo}`}
                  style={{
                    backgroundColor: item.product_color_code,
                    border: "1px solid #d7d2d2",
                  }}
                  key={index}
                ></ALink>
              ))}
          </div>
        </div>
      </>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    wishlist: state.wishlist.data,
    comparelist: state.comparelist.data,
  };
};

export default connect(mapStateToProps, {
  ...wishlistAction,
  ...cartAction,
  ...compareAction,
  ...demoAction,
})(ProductDeal);
