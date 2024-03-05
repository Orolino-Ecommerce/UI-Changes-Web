import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";

import ProductTwelve from "~/components/features/products/product-twelve";

import { catFilter } from "~/utils";
import { SubHomeCategory } from "~/core/requests";
import ALink from "~/components/features/alink";
function NewCollection(props) {
  const { products = [], loading } = props;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  useEffect(() => {
    if (products.length > 0) {
      if (hasMore) {
        setItems(products.slice(0, 8));
      } else setItems(products.slice(0, 12));
    }
  }, [products, hasMore]);

  function loadMore(e) {
    e.preventDefault();
    setLoadMoreLoading(true);

    setTimeout(() => {
      setHasMore(false);
      setLoadMoreLoading(false);
    }, 500);
  }
  //functionality
  const LoCat = localStorage.getItem("category");
  const [subcat, setsubcat] = useState([]);

  useEffect(() => {
    SubHomeCategory(LoCat, "new").then((res) => {
      setsubcat(res?.data?.data);
      
    });
  }, []);

  return (
    <Tabs
      defaultIndex={0}
      selectedTabClassName="show"
      onSelect={(index) => setCurrentTabIndex(index)}
    >
      <div className="container">
        <div className="heading heading-center mb-2">
          <h2 className="title">New Arrivals</h2>
          <TabList className="nav nav-pills nav-border-anim justify-content-center">
            <Tab className="nav-item">
              <span className="nav-link">All</span>
            </Tab>
            {subcat?.map((item, index) => {
              return item?.product_count === 0 ? null : ( // or you can use an empty string: ""
                <Tab className="nav-item" key={index}>
                  <span className="nav-link">{item?.subcategory_name}</span>
                </Tab>
              );
            })}
          </TabList>
        </div>
        <TabPanel>
          <div className="products">
            <div className="row justify-content-center">
              {loading || items.length == 0
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                    <div className="col-6 col-md-4 col-lg-3" key={index}>
                      <div className="skel-pro"></div>
                    </div>
                  ))
                : items.map((item, index) => (
                    <div className="col-6 col-md-4 col-lg-3" key={index}>
                      <ProductTwelve product={item} />
                    </div>
                  ))}
            </div>
          </div>
        </TabPanel>
        {subcat?.map((itemS, index) => {
          return itemS?.product_count === 0 ? null : (
            <TabPanel key={index}>
              <div className="products">
                <div className="row justify-content-center">
                  {loading || items.length == 0
                    ? [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div className="col-6 col-md-4 col-lg-3" key={index}>
                          <div className="skel-pro"></div>
                        </div>
                      ))
                    : catFilter(items, [itemS?.subcategory_name]).map(
                        (item, index) => {
                          // console.log("item", item);
                          return (
                            <div
                              className="col-6 col-md-4 col-lg-3"
                              key={index}
                            >
                              <ProductTwelve product={item} />
                            </div>
                          );
                        }
                      )}
                </div>
              </div>
            </TabPanel>
          );
        })}{" "}
        {currentTabIndex === 0 && hasMore ? (
          <div className="load-more-container text-center mt-0 mb-7">
            <ALink
              href="/shop/sidebar/list/?sortBy=latest"
              className="btn btn-outline-darker btn-load-more"
              //onClick={loadMore}
            >
              <span className="mr-3">View more products</span>
            </ALink>
          </div>
        ) : (
          ""
        )}
      </div>
    </Tabs>
  );
}

export default NewCollection;
