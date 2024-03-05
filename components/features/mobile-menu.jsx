import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import SlideToggle from "react-slide-toggle";
import { Category } from "~/core/requests";
import ALink from "~/components/features/alink";
import { SubCategory } from "~/core/requests";
function MobileMenu() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const LoCat = localStorage.getItem("category");
  const [subcat, setsubcat] = useState([]);
  useEffect(() => {
    router.events.on("routeChangeComplete", hideMobileMenu);
  }, []);

  function hideMobileMenu() {
    document.querySelector("body").classList.remove("mmenu-active");
  }

  function onSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: "/shop/sidebar/list",
      query: {
        searchTerm: searchTerm,
        // category: "",
      },
    });
  }
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
    SubCategory(LoCat).then((res) => {
      setsubcat(res?.data?.data);
    });
  }, []);
  return (
    <div className="mobile-menu-container">
      <div className="mobile-menu-wrapper">
        <span className="mobile-menu-close" onClick={hideMobileMenu}>
          <i className="icon-close"></i>
        </span>
        <div className="header-category">
          <div className="">
            <div className=" " style={{ margin: "0px auto" }}>
              <nav className="mobile-nav ">
                <ul className="mobile  sf-arrows">
                  {cat?.map((item, i) => {
                    var locId = localStorage.getItem("category");
                    if (locId == item.category_id) {
                      var color = "active";
                    } else {
                      var color = "";
                    }
                    return (
                      <li className={`categoryMenus ${color}`} key={i}>
                        <a
                          style={{ cursor: "pointer", padding: "2rem 3rem" }}
                          onClick={(e) => {
                            categoryChange(
                              item.category_id,
                              item?.category_name
                            );
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
        <form
          action="#"
          method="get"
          onSubmit={onSubmitSearchForm}
          className="mobile-search"
        >
          <label htmlFor="mobile-search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={onSearchChange}
            name="mobile-search"
            id="mobile-search"
            placeholder="Search product ..."
            required
          />
          <button className="btn btn-primary" type="submit">
            <i className="icon-search"></i>
          </button>
        </form>

        <nav className="mobile-nav">
          <ul className="mobile-menu">
            <li className="">
              <ALink href="/">Home</ALink>
            </li>

            <SlideToggle collapsed={true}>
              {({ onToggle, setCollapsibleElement, toggleState }) => (
                <li
                  className={
                    toggleState.toLowerCase() == "expanded" ? "open" : ""
                  }
                >
                  <ALink href="/shop/sidebar/list">
                    Shop
                    <span
                      className="mmenu-btn"
                      onClick={(e) => {
                        onToggle(e);
                        e.preventDefault();
                      }}
                    ></span>
                  </ALink>

                  <ul ref={setCollapsibleElement}>
                    {subcat?.map((itemS, index) => {
                      return (
                        <li>
                          <ALink
                            href={`/shop/sidebar/list/?category=${itemS?.subcategory_id}`}
                            key={index}
                          >
                            {itemS?.subcategory_name}
                          </ALink>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              )}
            </SlideToggle>
            <li className="">
              <ALink href="/pages/about/">About</ALink>
            </li>
            <li className="">
              <ALink href="/pages/contact/">Contact</ALink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default React.memo(MobileMenu);
