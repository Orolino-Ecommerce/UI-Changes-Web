import { useQuery } from "@apollo/react-hooks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Reveal from "react-awesome-reveal";
import React, { useState, useEffect } from "react";
import ALink from "~/components/features/alink";
import OwlCarousel from "~/components/features/owl-carousel";
import { useRouter } from "next/router";
import DealCollection from "~/components/partials/home/deal-collection";

import DealSection from "~/components/partials/home/deal-section";
import NewCollection from "~/components/partials/home/new-collection";
import TopCollection from "~/components/partials/home/top-collection";

import {
  Slider,
  Category,
  latestProduct,
  listProduct,
  listDeal,
  DivCategory,
  brandInfo,
  getCategoryDetail,
} from "~/core/requests";
import {
  introSlider,
  brandSlider,
  fadeInUpShorter,
  fadeInLeftShorter,
  fadeInRightShorter,
  fadeIn,
  fadeInUp,
} from "~/utils/data";
import { useSelector } from "react-redux";
import BrowsingCollection from "~/components/partials/home/browsing-collection";
function Home() {
  var browsedata = useSelector((state) => state);
  var browsingHistory = browsedata?.recentlyViewed?.data;

  //functionality
  const [banner, setBanner] = useState([]);
  const [cat, setCategory] = useState([]);
  const [curCat, setcurCat] = useState();
  const [product, setProduct] = useState([]);
  const [TopProduct, setTopProduct] = useState([]);
  const [DealProduct, setDealProduct] = useState([]);
  const [DivFirst, setDivFirst] = useState([]);
  const [DivSecond, setDivSecond] = useState([]);
  const [Browsedata, setBrowsedata] = useState([]);
  const [brand, setbrand] = useState([]);
  const categoryFromQuery = useRouter().query.category;
  // console.log("curCat-----------", category);
  // const category = localStorage.getItem("category");

  // if (category) {
  //   var curCat = category;
  // } else {
  //   localStorage.setItem("category", 1);
  //   var curCat = 1;
  // }

  useEffect(() => {
    const fetchCatData = async () => {
      if (categoryFromQuery) {
        try {
          const response = await getCategoryDetail(categoryFromQuery);

          console.log("response:", response);

          // Assuming your API response contains the category ID
          const categoryIdFromApi = response?.data?.data;
          console.log("categoryIdFromApi:", categoryIdFromApi);

          // Set the curCat variable
          setcurCat(categoryIdFromApi);

          // Save the category ID to localStorage for future use
          localStorage.setItem("category", categoryIdFromApi);

          // ... (similarly for other promises)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        const category = localStorage.getItem("category");
        if (category) {
          setcurCat(category);
        } else {
          localStorage.setItem("category", 1);
          setcurCat(1);
        }
      }
    };

    fetchCatData();
  }, []);
  console.log("curCat==", curCat);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching Slider Data...");
        const sliderData = await Slider(curCat);
        setBanner(sliderData?.data?.data);

        // ... (similarly for other promises)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [curCat]);

  useEffect(() => {
    console.log("Fetching Category Data...");
    Category()
      .then((res) => {
        setCategory(res?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching Category data:", error);
      });
  }, []);

  useEffect(() => {
    latestProduct("latest", curCat).then((res) => {
      setProduct(res?.data?.data);
    });
    listProduct(curCat, "top").then((res) => {
      setTopProduct(res?.data?.data);
    });
    listDeal(curCat).then((res) => {
      setDealProduct(res?.data?.data);
    });
    DivCategory(curCat, 1).then((res) => {
      setDivFirst(res?.data?.data);
    });
    DivCategory(curCat, 2).then((res) => {
      setDivSecond(res?.data?.data);
    });
    brandInfo().then((res) => {
      setbrand(res?.data?.data);
    });
    // setBrowsedata(browsingHistory);
  }, [curCat]);
  // console.log("DivFirst", DivFirst);
  // console.log("Final state values:", {
  //   banner,
  //   cat,
  //   product,
  //   TopProduct,
  //   DealProduct,
  //   DivFirst,
  //   DivSecond,
  //   Browsedata,
  //   brand,
  // });
  console.log("browsingHistory================", browsingHistory);
  return (
    <main className="main home-page skeleton-body">
      <div className="intro-slider-container">
        <OwlCarousel
          adClass="intro-slider owl-theme owl-nav-inside owl-light"
          options={introSlider}
        >
          {banner?.map((item, i) => {
            return (
              <div
                className="intro-slide dark-overlay"
                style={{
                  backgroundImage: `url(${item.banner_image})`,
                }}
                key={i}
              >
                <div
                  className="container intro-content text-center"
                  style={{
                    background: `${item?.banner_color}50`,
                  }}
                >
                  <Reveal
                    keyframes={fadeInUpShorter}
                    delay={100}
                    duration={1000}
                  >
                    <>
                      {/* <h3 className="intro-subtitle text-white">
                        You're Looking Good
                      </h3> */}
                      <h1
                        className="intro-title text-white"
                        style={{
                          fontFamily: `${item?.banner_fontfamily}`,
                          fontSize: `${item?.banner_size}px`,
                        }}
                      >
                        {item?.banner_name}
                      </h1>

                      {/* <ALink
                        href="/shop/sidebar/list"
                        className="btn btn-outline-white-4"
                      >
                        <span>Discover More</span> 
                      </ALink> */}
                    </>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </OwlCarousel>
      </div>

      <div className="mb-5"></div>

      <div className="mb-5"></div>

      <div className="mb-6"></div>
      <Reveal keyframes={fadeIn} delay={100} duration={1000} triggerOnce>
        <NewCollection products={product} loading={""} />
      </Reveal>
      <div className="mb-5"></div>

      <div className="pt-5 pb-3" style={{ backgroundColor: "#222" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-sm-6">
              <Reveal
                keyframes={fadeInRightShorter}
                delay={100}
                duration={1000}
                triggerOnce
              >
                <div className="icon-box text-center">
                  <span className="icon-box-icon">
                    <i className="icon-truck"></i>
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Payment & Delivery</h3>
                    <p>Free shipping for orders over $50</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-lg-3 col-sm-6">
              <Reveal
                keyframes={fadeInRightShorter}
                delay={100}
                duration={1000}
                triggerOnce
              >
                <div className="icon-box text-center">
                  <span className="icon-box-icon">
                    <i className="icon-rotate-left"></i>
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Return & Refund</h3>
                    <p>Free 100% money back guarantee</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-lg-3 col-sm-6">
              <Reveal
                keyframes={fadeInLeftShorter}
                delay={100}
                duration={1000}
                triggerOnce
              >
                <div className="icon-box text-center">
                  <span className="icon-box-icon">
                    <i className="icon-unlock"></i>
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Secure Payment</h3>
                    <p>100% secure payment</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-lg-3 col-sm-6">
              <Reveal
                keyframes={fadeInLeftShorter}
                delay={100}
                duration={1000}
                triggerOnce
              >
                <div className="icon-box text-center">
                  <span className="icon-box-icon">
                    <i className="icon-headphones"></i>
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Quality Support</h3>
                    <p>Alway online feedback 24/7</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5 mb-lg-7"></div>
      <Reveal keyframes={fadeIn} delay={100} duration={1000} triggerOnce>
        <TopCollection products={TopProduct} loading={""} />
      </Reveal>
      <div className="mb-5 mb-lg-7"></div>
      <div className="container pt-6">
        <h2 className="title-lg text-center mb-4">Shop by Categories</h2>
        <div className="row justify-content-center">
          {DivFirst?.map((item, i) => {
            return (
              <div
                className={`col-sm-6 col-lg-3  ${
                  i != 0 ? "order-lg-last" : ""
                }`}
                key={i}
              >
                <div className="banner banner-cat banner-link-anim banner-large">
                  <ALink href="#">
                    <div className="lazy-overlay"></div>

                    <LazyLoadImage
                      alt="banner"
                      width={270}
                      height={549}
                      src={item?.image}
                      threshold={200}
                      effect="opacity"
                    />
                  </ALink>

                  <div className="banner-content banner-content-bottom">
                    <h3 className="banner-title">
                      {item?.subcategory?.subcategory_name}
                    </h3>

                    <h4 className="banner-subtitle">
                      {item?.product_count} Products
                    </h4>

                    <ALink
                      href={`/shop/sidebar/list/?category=${item?.subcat_id}`}
                      className="banner-link p-0"
                    >
                      Shop Now
                    </ALink>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="col-lg-6">
            <div className="row">
              {DivSecond?.map((item, i) => {
                return (
                  <div className="col-sm-6 col-lg-12" key={i}>
                    <div className="banner banner-cat banner-link-anim">
                      <ALink href="#">
                        <div className="lazy-overlay"></div>
                        <LazyLoadImage
                          alt="banner"
                          width={750}
                          height={270}
                          src={item?.image}
                          threshold={200}
                          effect="opacity"
                        />
                      </ALink>

                      <div className="banner-content">
                        <h3 className="banner-title">
                          {item?.subcategory?.subcategory_name}
                        </h3>

                        <h4 className="banner-subtitle">
                          {item?.product_count} Products
                        </h4>

                        <ALink
                          href={`/shop/sidebar/list/?category=${item?.subcat_id}`}
                          className="banner-link p-0"
                        >
                          Shop Now
                        </ALink>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Brand div */}
        {brand?.length > 1 ? (
          <Reveal keyframes={fadeInUp} delay={500} duration="500" triggerOnce>
            <OwlCarousel
              adClass="brands-slider brands-carousel brands-border bannerbrand"
              options={brandSlider}
              style={{ margin: "0px auto" }}
            >
              {brand?.map((brand, index) => {
                return (
                  <ALink href="#" className="brand" key={index}>
                    <img
                      src={brand.brand_icon}
                      alt="brand"
                      // width={brand.width}
                      // height={brand.height}
                    />
                  </ALink>
                );
              })}
            </OwlCarousel>
          </Reveal>
        ) : (
          ""
        )}
      </div>

      <div className="mb-5 mb-lg-7"></div>
      {DealProduct?.length > 0 && (
        <>
          <h2 className="title-lg text-center mb-4">
            {DealProduct[0]?.today_deal_heading}
          </h2>

          <Reveal
            keyframes={fadeInRightShorter}
            delay={300}
            duration="1000"
            triggerOnce
          >
            <DealSection products={DealProduct[0]} loading={""} />
          </Reveal>
        </>
      )}
      <div className="mb-5 mb-lg-7"></div>
      {browsingHistory?.length > 0 && (
        <BrowsingCollection products={browsingHistory} loading={""} />
      )}
    </main>
  );
}

export default Home;
