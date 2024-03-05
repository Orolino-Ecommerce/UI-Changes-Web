import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ALink from "~/components/features/alink";

import { actions as wishlistAction } from "~/store/wishlist";
import { actions as cartAction } from "~/store/cart";
import { actions as compareAction } from "~/store/compare";
import { actions as demoAction } from "~/store/demo";
import Microdata from "~/pages/Microdata";
function ProductThirteen(props) {
  const { product } = props;
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(99999);

  useEffect(() => {
    let min = minPrice;
    let max = maxPrice;

    setMinPrice(min);
    setMaxPrice(max);
  }, []);
  console.log("productdeal----------", product);

  const firstVariant = product?.product_variant_prices
    ?.sort((a, b) => a.product_variant_price_id - b.product_variant_price_id)
    .filter((item, index, self) => {
      return (
        index ===
        self.findIndex((t) => t.product_color_code === item.product_color_code)
      );
    })[0];
  const firstSize = product?.product_variant_prices?.reduce((acc, cur) => {
    if (acc.findIndex((item) => item.size === cur.size) !== -1) return acc;
    return [...acc, cur];
  }, [])[0];

  const variantInfo = `${
    firstSize?.product_variant_size_detail
  }${firstVariant?.product_color_code.replace(/#/g, "")}`;

  return (
    <div className="product product-7 text-center">
      <Microdata
        product={product}
        price={product?.product_variant_prices[0]?.product_variant_offer_price}
        availability={"In stock"}
      />
      <figure className="product-media">
        <ALink
          href={`/bd/products/${product?.product_name
            .trim()
            .replace(/\s+/g, "-")
            .toLowerCase()}/${product?.product_id}-${product?.product_code
            .trim()
            .replace(/\s+/g, "-")
            .toLowerCase()}/?variant=${variantInfo}`}
        >
          <LazyLoadImage
            alt="product"
            src={product?.product_image}
            threshold={500}
            effect="black and white"
            wrapperClassName="product-image"
          />
          {product?.product_galleries.length >= 2 ? (
            <LazyLoadImage
              alt="product"
              src={product?.product_galleries[0]?.gallery_image}
              threshold={500}
              effect="black and white"
              wrapperClassName="product-image-hover"
            />
          ) : (
            ""
          )}
        </ALink>
      </figure>

      <div className="product-body pt-2">
        <h3 className="product-title">
          <ALink
            href={`/bd/products/${product?.product_name
              .trim()
              .replace(/\s+/g, "-")
              .toLowerCase()}/${product?.product_id}-${product?.product_code
              .trim()
              .replace(/\s+/g, "-")
              .toLowerCase()}/?variant=${variantInfo}`}
          >
            {product?.product_name}
          </ALink>
        </h3>

        <div className="product-price">
          <span
            className=" "
            style={{
              marginRight: "10px",
              color: "#cccccc",
              textDecoration: "line-through",
              fontSize: "12px",
            }}
          >
            {"\u09F3 "}
            {product &&
            product?.product_variant_prices &&
            product?.product_variant_prices[0] &&
            product?.product_variant_prices[0]?.product_variant_price_mrp
              ? product?.product_variant_prices[0]?.product_variant_price_mrp.toFixed(
                  2
                )
              : ""}
          </span>
          <span
            className=" "
            style={{
              color: "#d02b2f",
            }}
          >
            {"\u09F3 "}
            {product &&
            product?.product_variant_prices &&
            product?.product_variant_prices[0] &&
            product?.product_variant_prices[0]?.product_variant_offer_price
              ? product?.product_variant_prices[0]?.product_variant_offer_price.toFixed(
                  2
                )
              : ""}
          </span>
        </div>
        <div
          className="product-nav product-nav-dots"
          style={{ justifyContent: "center" }}
        >
          {product?.product_variant_prices
            ?.sort(
              (a, b) => a.product_variant_price_id - b.product_variant_price_id
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
                href={`/bd/products/${product?.product_name
                  .trim()
                  .replace(/\s+/g, "-")
                  .toLowerCase()}/${product?.product_id}-${product?.product_code
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
      {/* <ALink href="/shop/sidebar/list" className="action">
        Shop Now
      </ALink> */}
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
})(ProductThirteen);
