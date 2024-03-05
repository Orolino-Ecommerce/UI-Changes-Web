import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import ALink from "~/components/features/alink";
import Login from "~/pages/login";
import HeaderSearch from "~/components/partials/header/partials/header-search";
import WishlistMenu from "~/components/partials/header/partials/wishlist-menu";
import CartMenu from "~/components/partials/header/partials/cart-menu";
import MainMenu from "~/components/partials/header/partials/main-menu";
import StickyHeader from "~/components/features/sticky-header";
import { Category, getCategoryDetail, SubCategory } from "~/core/requests";

function Header() {
  const router = useRouter();
  let path = router.asPath;
  let query = router.query;
  const [userSaved, setUserSaved] = useState(false);
  const [AuthUser, setAuthUser] = useState({});
  const [containerClass, setContainerClass] = useState("container");
  const [curCat, setcurCat] = useState();
  const [subcat, setsubcat] = useState([]);
  function openMobileMenu() {
    document.querySelector("body").classList.add("mmenu-active");
  }
  const category = localStorage.getItem("category");
  if (category && category != "undefined") {
    var LoCat = category;
  } else {
    localStorage.setItem("category", 1);
    var LoCat = 1;
  }
  const categoryFromQuery = useRouter().query.category;
  useEffect(() => {
    const userSave = localStorage.getItem("User");
    if (userSave) {
      setUserSaved(true);
      setAuthUser(JSON.parse(userSave));
    }
  }, []);
  useEffect(() => {
    SubCategory(LoCat).then((res) => {
      setsubcat(res?.data?.data);
    });
  }, []);
  const logInUser = () => {
    // Perform login actions
    // Then update the state and localStorage
    setUserSaved(true);
    localStorage.setItem("userSaved", "true");
  };
  useEffect(() => {
    setContainerClass(
      router.asPath.includes("fullwidth") ? "container-fluid" : "container"
    );
  }, [router.asPath]);

  const logOutPage = () => {
    // console.log("clif");
    localStorage.removeItem("User");
    setUserSaved(false);
    localStorage.setItem("userSaved", "false");
    router.reload();

    // There is a newer version of the code available.
  };
  //functionality
  const [cat, setCategory] = useState([]);
  useEffect(() => {
    Category().then((res) => {
      setCategory(res?.data?.data);
    });
  }, []);
  const categoryChange = (catid, name) => {
    localStorage.setItem("category", catid);
    const lowercaseName = name.toLowerCase();

    window.location.href = `/bd/${lowercaseName}`;
  };
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
  }, [curCat]);

  return (
    <header className="header header-6">
      {/* <div className="header-top" style={{ marginTop: "10px" }}>
        <div className={containerClass} style={{ paddingBottom: "7px" }}>
          <div className="header-left" style={{ marginRight: "20rem" }}>
            <ul className="top-menu top-link-menu d-none d-md-block">
              <li>
                <ALink href="#">Links</ALink>
                <ul>
                  <a href="tel:#">
                    <i className="icon-phone"></i>Call: +88 01329-668419
                  </a>
                </ul>
              </li>
            </ul>
          </div>
          <div className="header-center"></div>

          <div className="header-right">
            
          </div>
        </div>
      </div> */}

      <div className="header-category d-none">
        <div className={containerClass}>
          <div className=" " style={{ margin: "0px auto" }}>
            <nav className="main-nav ">
              <ul className="menu sf-arrows">
                {cat?.map((item, i) => {
                  var locId = localStorage.getItem("category");
                  if (curCat == item.category_id) {
                    var color = "active";
                  } else {
                    var color = "";
                  }
                  return (
                    <li key={i} className={`categoryMenus ${color}`}>
                      <a
                        style={{ cursor: "pointer", padding: "2rem 3rem" }}
                        onClick={(e) => {
                          categoryChange(item.category_id, item?.category_name);
                        }}
                      >
                        {item?.category_name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="header-middle s">
        <div className="container split-3">
          <div className="header-left blk">
            <ALink href="/" className="logo">
              <img
                className="img-fluid"
                src="images/home/logo.svg"
                alt="Molla Logo"
              />
            </ALink>
          </div>

          <div className="header-center blk">
            <nav className="main-nav m-0">
              <ul className="menu sf-arrows">
                {cat?.map((item, i) => {
                  var locId = localStorage.getItem("category");
                  if (curCat == item.category_id) {
                    var color = "active";
                  } else {
                    var color = "";
                  }
                  return (
                    <li key={i} className={`categoryMenus ${color}`}>
                      <a
                        style={{ cursor: "pointer", padding: "2rem 3rem" }}
                        onClick={(e) => {
                          categoryChange(item.category_id, item?.category_name);
                        }}
                      >
                        {item?.category_name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="header-right blk">
            {/* <div className="social-icons social-icons-color">
              <a
                href="https://www.facebook.com/profile.php?id=100091343259804&mibextid=ZbWKwL"
                className="social-icon social-instagram m-0"
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="icon-facebook-f"></i>
              </a>

              <a
                href="https://www.instagram.com/orolino.official/"
                className="social-icon social-instagram ml-4"
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="icon-instagram"></i>
              </a>
            </div> */}
            <ul className="top-menu top-link-menu ml-3">
              {!userSaved ? (
                <li>
                  <ALink href="#">Links</ALink>
                  <ul>
                    <Login onLogin={logInUser} />
                  </ul>
                </li>
              ) : (
                ""
              )}
            </ul>
            {userSaved ? (
              <div className="header-dropdown">
                <ALink href="#" style={{ fontSize: "13px" }}>
                  Hi, {AuthUser?.userName}
                </ALink>

                <div className="header-menu">
                  <ul>
                    <li>
                      <ALink
                        style={{ fontSize: "13px" }}
                        href="/shop/dashboard"
                      >
                        My Account
                      </ALink>
                    </li>
                    <li>
                      <ALink
                        style={{ fontSize: "13px" }}
                        href="/shop/orders-list/"
                      >
                        My Orders
                      </ALink>
                    </li>
                    <li>
                      <a
                        style={{ fontSize: "13px", cursor: "pointer" }}
                        onClick={logOutPage}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              ""
            )}

            <ALink href="/shop/sidebar/3cols" className="hdr-search">
              <i className="icon-search"></i>
            </ALink>
            <WishlistMenu />
            <CartMenu />
          </div>
        </div>
        <div className="category-menu">
          <ul className="nav">
            {subcat?.map((itemS, index) => {
              return (
                <li
                  className={
                    path.indexOf("shop/sidebar") > -1 && query.type == "3cols"
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
      {/* <StickyHeader>
        <div className="sticky-header">
          <div className="header-category">
            <div className={containerClass}>
              <div className=" " style={{ margin: "0px auto" }}>
                <nav className="main-nav">
                  <ul className="menu sf-arrows">
                    {cat?.map((item, i) => {
                      var locId = localStorage.getItem("category");
                      // console.log("hrrhhr", locId, item.category_id);
                      if (locId == item.category_id) {
                        var color = "active";
                      } else {
                        var color = "";
                      }
                      return (
                        <li key={i} className={`categoryMenus ${color}`}>
                          <a
                            style={{ cursor: "pointer", padding: "2rem 3rem" }}
                            onClick={(e) => {
                              categoryChange(item.category_id);
                            }}
                          >
                            {item?.category_name}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="header-bottom">
            <div className={containerClass}>
              <div className="header-left">
                <MainMenu />

                <button
                  className="mobile-menu-toggler"
                  onClick={openMobileMenu}
                >
                  <span className="sr-only">Toggle mobile menu</span>
                  <i className="icon-bars"></i>
                </button>
              </div>

              <div className="header-center"></div>

              <div className="header-right overflow-hidden">
                <i className="icon-medapps"></i>
                <p className="font-weight-semibold">Clearance Up to 30% Off</p>
                <HeaderSearch/>
              </div>
            </div>
          </div>
        </div>
      </StickyHeader> */}
    </header>
  );
}

export default Header;
