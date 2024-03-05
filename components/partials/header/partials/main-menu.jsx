import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ALink from "~/components/features/alink";
import { SubCategory, getCategory } from "~/core/requests";
function MainMenu() {
  const router = useRouter();
  let path = router.asPath;
  let query = router.query;
  const [subcat, setsubcat] = useState([]);
  const [getcat, setcat] = useState("");
  const category = localStorage.getItem("category");
  if (category && category != "undefined") {
    var LoCat = category;
  } else {
    localStorage.setItem("category", 1);
    var LoCat = 1;
  }
  function showAllDemos(e) {
    let demoItems = document.querySelectorAll(".demo-item.hidden");

    for (let i = 0; i < demoItems.length; i++) {
      demoItems[i].classList.toggle("show");
    }

    document
      .querySelector(".view-all-demos")
      .classList.toggle("disabled-hidden");
    e.preventDefault();
  }
  useEffect(() => {
    SubCategory(LoCat).then((res) => {
      setsubcat(res?.data?.data);
    });
  }, []);
  useEffect(() => {
    getCategory(LoCat).then((res) => {
      setcat(res?.data?.data);
    });
  }, []);
  return (
    <nav className="main-nav">
      <ul className="menu sf-arrows">
        <li
          className={`megamenu-container ${path === "/" ? "active" : ""}`}
          id="menu-home"
        >
          <ALink href="/">Home</ALink>
        </li>
        <li
          className={path.indexOf(`/shop/sidebar/3cols`) > -1 ? "active" : ""}
        >
          <ALink
            href={`/shop/sidebar/3cols`}
            className="sf-with-ul"
            scroll={false}
          >
            Shop
          </ALink>
          {subcat?.length > 0 ? (
            <div className="megamenu megamenu-md">
              <div className="row no-gutters">
                <div className="col-md-8">
                  <div className="menu-col">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="menu-title">Shop with Category</div>
                        <ul>
                          {subcat?.map((itemS, index) => {
                            return (
                              <li
                                className={
                                  path.indexOf("shop/sidebar") > -1 &&
                                  query.type == "3cols"
                                    ? "active"
                                    : ""
                                }
                                key={index}
                              >
                                <ALink
                                  href={`/shop/sidebar/3cols/?category=${itemS?.subcategory_id}`}
                                  scroll={false}
                                >
                                  {itemS?.subcategory_name}
                                </ALink>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="banner banner-overlay">
                    <ALink
                      href={`/bd/shop/${getcat}/3cols`}
                      className="banner banner-menu"
                    >
                      <img src="images/menu/banner-1.webp" alt="Banner" />

                      <div className="banner-content banner-content-top">
                        <div className="banner-title text-black">
                          <br />
                          Winter
                          <br />
                          <span>
                            <strong>Sale</strong>
                          </span>
                        </div>
                      </div>
                    </ALink>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </li>

        {/* <li className={path.indexOf("pages/about/") > -1 ? "active" : ""}>
          <ALink
            href="/pages/about/"
            
          >
            Affiliate Marketing
          </ALink>

          
        </li> */}

        <li className={path.indexOf("bd/about/") > -1 ? "active" : ""}>
          <ALink href="/bd/about/">About</ALink>
        </li>
        <li className={path.indexOf("bd/contact") > -1 ? "active" : ""}>
          <ALink href="/bd/contact/">Contact</ALink>
        </li>
      </ul>
    </nav>
  );
}

export default MainMenu;
