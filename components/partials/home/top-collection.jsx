import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import React, { useState, useEffect } from "react";
import OwlCarousel from "~/components/features/owl-carousel";
import ProductTwelve from "~/components/features/products/product-twelve";
import { SubHomeCategory } from "~/core/requests";
import { catFilter } from "~/utils";
import { productSlider } from "~/utils/data";
import ALink from "~/components/features/alink";
function TopCollection(props) {
  const [subcat, setsubcat] = useState([]);
  const { products = [], loading } = props;
  const LoCat = localStorage.getItem("category");
  useEffect(() => {
    SubHomeCategory(LoCat, "top").then((res) => {
      setsubcat(res?.data?.data);
    });
  }, []);
  // console.log("subcat-------", subcat);
  return (
    <>
      <div className="container trendy-collection"></div>
      <Tabs defaultIndex={0} selectedTabClassName="show">
        <div className="container trendy-collection">
          <div className="heading heading-center mb-3">
            <h2 className="title-lg">Top Products</h2>
            <TabList className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3">
              <Tab className="nav-item">
                <span className="nav-link">All</span>
              </Tab>

              {subcat?.map((item, index) => {
                return item?.product_count === 0 ? null : (
                  <Tab className="nav-item" key={index}>
                    <span className="nav-link">{item?.subcategory_name}</span>
                  </Tab>
                );
              })}
            </TabList>
          </div>
        </div>

        <div className="container">
          <TabPanel>
            {loading ? (
              <OwlCarousel
                adClass="owl-simple carousel-with-shadow"
                options={productSlider}
              >
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <div className="skel-pro" key={index}></div>
                ))}
              </OwlCarousel>
            ) : (
              <>
                <OwlCarousel
                  adClass="owl-simple carousel-with-shadow"
                  options={productSlider}
                >
                  {products.slice(0, 6).map((item, index) => (
                    <ProductTwelve product={item} key={index} />
                  ))}
                </OwlCarousel>
                <div className="load-more-container text-center">
                  <ALink
                    href="/shop/sidebar/list/?sortBy=top"
                    className="btn btn-outline-darker btn-load-more"
                    //onClick={loadMore}
                  >
                    <span className="mr-3">View more products</span>
                  </ALink>
                </div>
              </>
            )}
          </TabPanel>
          {subcat?.map((itemS, index) => {
            return itemS?.product_count === 0 ? null : (
              <TabPanel key={index}>
                {loading ? (
                  <OwlCarousel
                    adClass="owl-simple carousel-with-shadow"
                    options={productSlider}
                  >
                    {[1, 2, 3, 4, 5, 6].map((item, index) => (
                      <div className="skel-pro" key={index}></div>
                    ))}
                  </OwlCarousel>
                ) : (
                  <OwlCarousel
                    adClass="owl-simple carousel-with-shadow"
                    options={productSlider}
                  >
                    {catFilter(products, [itemS?.subcategory_name]).map(
                      (item, index) => (
                        <ProductTwelve product={item} key={index} />
                      )
                    )}
                  </OwlCarousel>
                )}
              </TabPanel>
            );
          })}
        </div>
      </Tabs>
    </>
  );
}

export default TopCollection;
