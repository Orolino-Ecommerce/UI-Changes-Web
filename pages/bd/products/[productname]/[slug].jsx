import { useRouter } from "next/router";

import Breadcrumb from "~/components/partials/product/breadcrumb";
import GalleryDefault from "~/components/partials/product/gallery/gallery-default";
import DetailOne from "~/components/partials/product/details/detail-one";
import InfoOne from "~/components/partials/product/info-tabs/info-one";
import RelatedProductsOne from "~/components/partials/product/related/related-one";
import React, { useState, useEffect } from "react";
import { productDetails, getRelatedProducts } from "~/core/requests";
import Microdata from "~/pages/Microdata";
function ProductDefault() {
  const router = useRouter();
  const slugs = useRouter().query.slug;
  const [selectedColor, setSelectedColor] = useState(null);
  const [OutofStock, setOutofStock] = useState(null);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const outofstockGet = (value) => {
    // console.log("clickedfromdetail===============",value);
    setOutofStock(value);
  };
  const parts = slugs.split("-");
  const slug = parts[0];
  // console.log("slug==========", slug);
  const [product, setproduct] = useState([]);
  const [related, setrelated] = useState([]);
  const [loading, setloading] = useState(true);
  // console.log("product", product?.product_subcategory_id);
  //functionality
  useEffect(() => {
    productDetails(slug).then((res) => {
      setproduct(res?.data?.data[0]);
      setloading(false);
    });
  }, [slug]);
  useEffect(() => {
    getRelatedProducts(product?.product_subcategory_id, slug).then((res) => {
      // console.log("res", res);
      setrelated(res?.data);
    });
  }, [product]);
  if (!product) {
    return (
      <div>
        <div style={{ textAlign: "-webkit-center" }}>
          <img src={"/images/loader.gif"} style={{ width: "300px" }} />{" "}
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <Breadcrumb
        // prev={prev} next={next}
        current={product?.product_name}
      />
      <Microdata
        product={product}
        price={1000}
        availability={OutofStock ? "Out of stock" : "In stock"}
      />
      <div className="page-content">
        <div className="container skeleton-body">
          <div className="product-details-top">
            <div className={`row skel-pro-single ${loading ? "" : "loaded"}`}>
              <div className="col-md-6">
                <div className="skel-product-gallery"></div>
                {!loading ? (
                  <GalleryDefault
                    product={product}
                    color={selectedColor}
                    OutofStock={OutofStock}
                  />
                ) : (
                  ""
                )}
              </div>

              <div className="col-md-6">
                <div className="entry-summary row">
                  <div className="col-md-12">
                    <div className="entry-summary1 mt-2 mt-md-0"></div>
                  </div>
                  <div className="col-md-12">
                    <div className="entry-summary2"></div>
                  </div>
                </div>
                {!loading ? (
                  <DetailOne
                    product={product}
                    onColorClick={handleColorClick}
                    OutofStockGet={outofstockGet}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="skel-pro-tabs"></div>
          ) : (
            <InfoOne product={product} slug={slug} />
          )}
          {related?.length > 0 && (
            <RelatedProductsOne products={related} loading={""} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDefault;
