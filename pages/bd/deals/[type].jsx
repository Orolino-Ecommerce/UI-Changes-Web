import { useRouter } from "next/router";
import { useState, useEffect, useLayoutEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";

import ALink from "~/components/features/alink";
import PageHeader from "~/components/features/page-header";
import ShopListThree from "~/components/partials/shop/list/shop-list-three";
import ShopSidebarOne from "~/components/partials/shop/sidebar/shop-sidebar-one";

import { scrollToPageContent } from "~/utils";
import { listFilterProducts } from "~/core/requests";
function ShopNoSidebar() {
  const router = useRouter();
  const type = router.query.type;
  const query = router.query;
  const curCat = localStorage.getItem("category");
  const [DealProduct, setDealProduct] = useState([]);

  const [perPage, setPerPage] = useState(8);
  const [containerClass, setContainerClass] = useState("container");
  const [pageTitle, setPageTitle] = useState("Boxed No Sidebar");
  const [moreLoading, setMoreLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalCount, setcount] = useState(0);

  useEffect(() => {
    const queryParams = {
      page: 1,
      perPage: perPage,
    };
    listFilterProducts(curCat, queryParams).then((res) => {
      console.log(
        "productsCount==================",
        res?.data?.productsCount[0]?.today_deal_details.length
      );
      setcount(res?.data?.productsCount[0]?.today_deal_details.length);
      console.log("res=========,", res?.data?.data[0]?.today_deal_details);
      setProducts(res?.data?.data[0]?.today_deal_details);
      setDealProduct(res?.data?.data);
    });
  }, [perPage]);

  function loadMore(e) {
    e.preventDefault();
    if (perPage < totalCount) {
      setMoreLoading(true);

      setTimeout(() => {
        setPerPage(perPage + 4);
        const queryParams = {
          page: 1,
          perPage: perPage + 4,
        };
        listFilterProducts(curCat, queryParams).then((res) => {
          console.log(
            "productsCount==================",
            res?.data?.productsCount[0]?.today_deal_details.length
          );
          setcount(res?.data?.productsCount[0]?.today_deal_details.length);
          console.log("res=========,", res?.data?.data[0]?.today_deal_details);
          setProducts((prevProducts) => [
            ...prevProducts,
            ...res?.data?.data[0]?.today_deal_details,
          ]);
        });
        setMoreLoading(false);
      }, 500);
    }
  }

  // if (error) {
  //   return <div></div>;
  // }
  console.log("setProducts=========", products);
  return (
    <main className="main shop">
      <PageHeader
        title={DealProduct[0]?.today_deal_heading}
        subTitle={DealProduct[0]?.today_deals_title}
      />
      <nav className="breadcrumb-nav mb-2">
        <div className="container-fluid">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>

            <li className="breadcrumb-item active">
              Promotions - {DealProduct[0]?.today_deals_title}
            </li>
          </ol>
        </div>
      </nav>

      <div className="page-content">
        <div className="container-fluid">
          <ShopListThree products={products} loading={""}></ShopListThree>
          <div
            className={`load-more-container text-center ${
              totalCount > perPage || moreLoading ? "" : "d-none"
            }`}
          >
            <a
              href="#"
              className="btn btn-outline-darker btn-load-more"
              onClick={loadMore}
            >
              More Products
              <i
                className={`icon-refresh ${
                  moreLoading ? "load-more-rotating" : ""
                }`}
              ></i>
            </a>
          </div>

          <ShopSidebarOne toggle={true}></ShopSidebarOne>
          <button
            className="sidebar-fixed-toggler d-lg-none"
            // onClick={toggleSidebar}
          >
            <i className="icon-cog"></i>
          </button>
        </div>
      </div>
    </main>
  );
}

export default ShopNoSidebar;
