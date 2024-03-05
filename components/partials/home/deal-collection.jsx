import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import React, { useState, useEffect } from "react";
import OwlCarousel from "~/components/features/owl-carousel";
import ProductTwelve from "~/components/features/products/product-twelve";
import ProductDeal from "~/components/features/products/product-deal";
import { DealSubCategory } from "~/core/requests";
import { catDealFilter } from "~/utils";
import { productSlider } from "~/utils/data";

function DealCollection(props) {
  const { products = [], loading } = props;
  //functionality
  const LoCat = localStorage.getItem("category");
  const [dealsubcat, setdealsubcat] = useState([]);

  useEffect(() => {
    DealSubCategory(LoCat).then((res) => {
      setdealsubcat(res?.data?.data);
      console.log("tranding", res?.data?.data);
    });
  }, []);
  console.log("products------------", products);
  return (
    <Tabs defaultIndex={0} selectedTabClassName="show">
      <div className="container trending-products trendy">
        <div className="heading heading-flex mb-3">
          <div className="heading-left">
            <h2 className="title">Trending Today</h2>
          </div>

          <div className="heading-right">
            <TabList className="nav nav-pills justify-content-center">
              <Tab className="nav-item">
                <span className="nav-link">All</span>
              </Tab>
              {dealsubcat?.map((item, index) => {
                console.log("item", item);
                return item?.product_count === 0 ? null : (
                  <Tab className="nav-item" key={index}>
                    <span className="nav-link">{item?.subcategory_name}</span>
                  </Tab>
                );
              })}
            </TabList>
          </div>
        </div>
        <div className="tab-content tab-content-carousel">
          <TabPanel>
            {loading ? (
              <OwlCarousel
                adClass="owl-simple carousel-equal-height carousel-with-shadow"
                options={productSlider}
              >
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <div className="skel-pro" key={index}></div>
                ))}
              </OwlCarousel>
            ) : (
              <OwlCarousel
                adClass="owl-simple carousel-equal-height carousel-with-shadow"
                options={productSlider}
              >
                {products.slice(0, 6).map((item, index) => (
                  <ProductDeal product={item} key={index} />
                ))}
              </OwlCarousel>
            )}
          </TabPanel>
          {dealsubcat?.map((itemS, index) => {
            return itemS?.product_count === 0 ? null : (
              <TabPanel key={index}>
                {loading ? (
                  <OwlCarousel
                    adClass="owl-simple carousel-equal-height carousel-with-shadow"
                    options={productSlider}
                  >
                    {[1, 2, 3, 4, 5, 6].map((item, index) => (
                      <div className="skel-pro" key={index}></div>
                    ))}
                  </OwlCarousel>
                ) : (
                  <OwlCarousel
                    adClass="owl-simple carousel-equal-height carousel-with-shadow"
                    options={productSlider}
                  >
                    {catDealFilter(products, [itemS?.subcategory_name]).map(
                      (item, index) => (
                        <ProductDeal product={item} key={index} />
                      )
                    )}
                  </OwlCarousel>
                )}
              </TabPanel>
            );
          })}
        </div>
      </div>
    </Tabs>
  );
}

export default DealCollection;
