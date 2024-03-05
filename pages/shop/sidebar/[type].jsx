import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
// import { useLazyQuery } from '@apollo/react-hooks';
import StickyBox from "react-sticky-box";

import ALink from "~/components/features/alink";
import PageHeader from "~/components/features/page-header";
import ShopListOne from "~/components/partials/shop/list/shop-list-one";
import Pagination from "~/components/features/pagination";
import ShopSidebarOne from "~/components/partials/shop/sidebar/shop-sidebar-one";
import { listProduct, listProductNew } from "~/core/requests";
// import withApollo from '~/server/apollo';
// import { GET_PRODUCTS } from '~/server/queries';
import { scrollToPageContent } from "~/utils";
import HeaderSearch from "~/components/partials/header/partials/header-search";

function ShopGrid() {
  const router = useRouter();
  const type = router.query.type;
  const query = router.query;
  //console.log("typeee", type);
  const [firstLoading, setFirstLoading] = useState(false);
  const [perPage, setPerPage] = useState(0);
  const [pageTitle, setPageTitle] = useState("List");
  const [productsList, setProductsList] = useState();
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [totalCount, setCount] = useState();

  const category = localStorage.getItem("category");
  if (category) {
    var curCat = category;
  } else {
    localStorage.setItem("category", 1);
    var curCat = 1;
  }

  //PRODUCT LIST
  useEffect(() => {
    const queryParams = {
      page: query.page || "1",
      perPage: perPage || "",
      searchTerm: query.searchTerm || "",
      category: query.category || "",
      brand: query.brand || "",
      sortBy: query.sortBy || "",
      minPrice: query.minPrice || "",
      maxPrice: query.maxPrice || "",
      color: query.color ? query.color.split(",") : [],
      size: query.size ? query.size.split(",") : [],
    };

    listProductNew(curCat, queryParams).then((res) => {
      // console.log("listResult=>", res);
      setProductsList(res?.data?.data);
      setCount(res?.data?.totalCount);
    });
    scrollToPageContent();
  }, [query, perPage]);

  // console.log("tete", productsList);

  useEffect(() => {
    window.addEventListener("resize", resizeHandle);
    resizeHandle();
    return () => {
      window.removeEventListener("resize", resizeHandle);
    };
  }, []);

  function resizeHandle() {
    if (document.querySelector("body").offsetWidth < 992) setToggle(true);
    else setToggle(false);
  }

  useEffect(() => {
    if (productsList) setFirstLoading(true);
  }, [productsList]);

  useEffect(() => {
    if (type == "3cols") {
      setPageTitle("Product List");
      setPerPage(9);
    } else if (type == "2cols") {
      setPageTitle("Product List");
      setPerPage(6);
    } else if (type == "list") {
      setPageTitle("Product List");
      setPerPage(5);
    } else if (type == "4cols") {
      setPageTitle("Product List");
      setPerPage(12);
    }
  }, [type]);

  function onSortByChange(e) {
    let queryObject = router.query;
    let url = router.pathname.replace("[type]", query.type) + "?";
    for (let key in queryObject) {
      if (key !== "type" && key !== "sortBy") {
        url += key + "=" + queryObject[key] + "&";
      }
    }

    router.push(url + "sortBy=" + e.target.value);
  }

  function toggleSidebar() {
    if (
      document.querySelector("body").classList.contains("sidebar-filter-active")
    ) {
      document.querySelector("body").classList.remove("sidebar-filter-active");
    } else {
      document.querySelector("body").classList.add("sidebar-filter-active");
    }
  }

  function hideSidebar() {
    document.querySelector("body").classList.remove("sidebar-filter-active");
  }

  // console.log("[type]", query, perPage, totalCount);
  return (
    <main className="main shop">
      <PageHeader title={pageTitle} subTitle="Shop" />

      <nav className="breadcrumb-nav mb-2">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="/shop/sidebar/list">Shop</ALink>
            </li>
          </ol>
        </div>
      </nav>

      <div className="page-content">
        <div className="container">
          <div className="row skeleton-body">
            <div
              className={`col-lg-9 skel-shop-products ${
                !loading ? "loaded" : ""
              }`}
            >
              <div className="toolbox">
                <div className="toolbox-left">
                  {!loading && productsList ? (
                    <div className="toolbox-info">
                      Showing
                      <span>
                        {" "}
                        {productsList.length} of {totalCount}{" "}
                      </span>
                      Products
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="toolbox-right">
                  <div className="toolbox-sort">
                    <label htmlFor="sortby">Sort by:</label>
                    <div className="select-custom">
                      <select
                        name="sortby"
                        id="sortby"
                        className="form-control"
                        onChange={onSortByChange}
                        value={query.sortBy ? query.sortBy : ""}
                      >
                        <option value="">Default</option>
                        <option value="latest">Latest</option>
                        <option value="top">Top</option>
                        <option value="verified">Verified</option>
                      </select>
                    </div>
                  </div>
                  <div className="toolbox-layout">
                    <ALink
                      href="/shop/sidebar/3cols"
                      className={`btn-layout ${
                        type == "3cols" ? "active" : ""
                      }`}
                      scroll={false}
                    >
                      <svg width="16" height="10">
                        <rect x="0" y="0" width="4" height="4" />
                        <rect x="6" y="0" width="4" height="4" />
                        <rect x="12" y="0" width="4" height="4" />
                        <rect x="0" y="6" width="4" height="4" />
                        <rect x="6" y="6" width="4" height="4" />
                        <rect x="12" y="6" width="4" height="4" />
                      </svg>
                    </ALink>
                    <ALink
                      href="/shop/sidebar/list"
                      className={`btn-layout ${type == "list" ? "active" : ""}`}
                      scroll={false}
                    >
                      <svg width="16" height="10">
                        <rect x="0" y="0" width="4" height="4" />
                        <rect x="6" y="0" width="10" height="4" />
                        <rect x="0" y="6" width="4" height="4" />
                        <rect x="6" y="6" width="10" height="4" />
                      </svg>
                    </ALink>

                    <ALink
                      href="/shop/sidebar/2cols"
                      className={`btn-layout ${
                        type == "2cols" ? "active" : ""
                      }`}
                      scroll={false}
                    >
                      <svg width="10" height="10">
                        <rect x="0" y="0" width="4" height="4" />
                        <rect x="6" y="0" width="4" height="4" />
                        <rect x="0" y="6" width="4" height="4" />
                        <rect x="6" y="6" width="4" height="4" />
                      </svg>
                    </ALink>

                    <ALink
                      href="/shop/sidebar/4cols"
                      className={`btn-layout ${
                        type == "4cols" ? "active" : ""
                      }`}
                      scroll={false}
                    >
                      <svg width="22" height="10">
                        <rect x="0" y="0" width="4" height="4" />
                        <rect x="6" y="0" width="4" height="4" />
                        <rect x="12" y="0" width="4" height="4" />
                        <rect x="18" y="0" width="4" height="4" />
                        <rect x="0" y="6" width="4" height="4" />
                        <rect x="6" y="6" width="4" height="4" />
                        <rect x="12" y="6" width="4" height="4" />
                        <rect x="18" y="6" width="4" height="4" />
                      </svg>
                    </ALink>
                  </div>
                </div>
              </div>

              <ShopListOne
                products={productsList}
                perPage={perPage}
                loading={loading}
              ></ShopListOne>

              {totalCount > perPage ? (
                <Pagination perPage={perPage} total={totalCount}></Pagination>
              ) : (
                ""
              )}
            </div>

            <aside
              className={`col-lg-3 skel-shop-sidebar order-lg-first skeleton-body ${
                !loading || firstLoading ? "loaded" : ""
              }`}
            >
              <div className="skel-widget"></div>
              <div className="skel-widget"></div>
              <div className="skel-widget"></div>
              <div className="skel-widget"></div>
              <StickyBox className="sticky-content" offsetTop={70}>
                <ShopSidebarOne toggle={toggle}></ShopSidebarOne>
              </StickyBox>
              {toggle ? (
                <button
                  className="sidebar-fixed-toggler"
                  onClick={toggleSidebar}
                >
                  <i className="icon-cog"></i>
                </button>
              ) : (
                ""
              )}
              <div
                className="sidebar-filter-overlay"
                onClick={hideSidebar}
              ></div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

export default // withApollo( { ssr: typeof window == 'undefined' } )
ShopGrid;
