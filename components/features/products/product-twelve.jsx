import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import ALink from "~/components/features/alink";
import Ratings from "~/core/Ratings";
import { actions as wishlistAction } from "~/store/wishlist";
import { actions as cartAction } from "~/store/cart";
import { actions as compareAction } from "~/store/compare";
import { actions as demoAction } from "~/store/demo";

import Microdata from "~/pages/Microdata";
function ProductTwelve(props) {
  const router = useRouter();
  const { product, wishlist } = props;

  const ratingAvg = Ratings(product?.reviews || []);

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
      <>
        {/* <Microdata
          product={product}
          price={
            product?.product_variant_prices[0]?.product_variant_offer_price
          }
          availability={"In stock"}
        /> */}
        <figure className="product-media">
          {product?.product_top ? (
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
          {product?.product_newarrival ? (
            <span className="product-label label-new">New</span>
          ) : (
            ""
          )}
          {product?.product_variant_prices[0]?.product_variant_price_mrp !=
          product?.product_variant_prices[0]?.product_variant_offer_price ? (
            <span className="product-label mt-3 promotionalLable">
              Promotional
            </span>
          ) : (
            ""
          )}
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
            {product?.product_galleries?.length >= 2 ? (
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

          <div className="product-action-vertical">
            <ALink
              href={`/bd/products/${product?.product_name
                .trim()
                .replace(/\s+/g, "-")
                .toLowerCase()}/${product?.product_id}-${product?.product_code
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
            <ALink
              href={`/bd/products/${product?.product_name
                .trim()
                .replace(/\s+/g, "-")
                .toLowerCase()}/${product?.product_id}-${product?.product_code
                .trim()
                .replace(/\s+/g, "-")
                .toLowerCase()}/?variant=${variantInfo}`}
              className="btn-product btn-cart btn-select"
            >
              <span>View Product</span>
            </ALink>
          </div>
        </figure>

        <div className="product-body">
          <div className="product-cat">
            <React.Fragment>
              <ALink
                href={`/bd/products/${product?.product_name
                  .trim()
                  .replace(/\s+/g, "-")
                  .toLowerCase()}/${product?.product_id}-${product?.product_code
                  .trim()
                  .replace(/\s+/g, "-")
                  .toLowerCase()}/?variant=${variantInfo}`}
              >
                {product?.subcategory?.subcategory_name}
              </ALink>
            </React.Fragment>
          </div>
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
            <div className="product-price">
              {product?.product_variant_prices[0]?.product_variant_price_mrp !=
              product?.product_variant_prices[0]
                ?.product_variant_offer_price ? (
                <span
                  className=" "
                  style={{
                    marginRight: "10px",
                    color: "#86848469",
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
              ) : (
                ""
              )}
              <span
                className="out-price"
                style={{
                  color: "#db4646",
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
              ( {product?.reviews?.length} Reviews )
            </span>
          </div>

          <div className="product-nav product-nav-dots">
            {product?.product_variant_prices
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
                  href={`/bd/products/${product?.product_name
                    .trim()
                    .replace(/\s+/g, "-")
                    .toLowerCase()}/${
                    product?.product_id
                  }-${product?.product_code
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
})(ProductTwelve);
