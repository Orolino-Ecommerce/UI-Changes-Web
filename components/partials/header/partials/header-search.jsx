import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { LazyLoadImage } from "react-lazy-load-image-component";

import ALink from "~/components/features/alink";
import { SearchTrackGoogleAnalyticsEvent } from "~/pages/trackingevents";
import { safeContent } from "~/utils";
import { searcProducts } from "~/core/requests";
function HeaderSearch() {
  const router = useRouter("");
  const [cat, setCat] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  // const [ searchProducts, { data } ] = useLazyQuery( GET_PRODUCTS );
  // const result = data && data.products.data;
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    document.querySelector("body").addEventListener("click", closeSearchForm);

    return () => {
      document
        .querySelector("body")
        .removeEventListener("click", closeSearchForm);
    };
  }, []);

  // useEffect( () => {
  //     if ( result && searchTerm.length > 2 )
  //         setProducts( result.reduce( ( acc, product ) => {
  //             let max = 0;
  //             let min = 999999;
  //             product.variants.map( item => {
  //                 if ( min > item.price ) min = item.price;
  //                 if ( max < item.price ) max = item.price;
  //             }, [] );

  //             if ( product.variants.length == 0 ) {
  //                 min = product.sale_price
  //                     ? product.sale_price
  //                     : product.price;
  //                 max = product.price;
  //             }

  //             return [
  //                 ...acc,
  //                 {
  //                     ...product,
  //                     minPrice: min,
  //                     maxPrice: max
  //                 }
  //             ];
  //         }, [] ) )
  // }, [ result, searchTerm ] )

  // useEffect( () => {
  //     if ( searchTerm.length > 2 ) {
  //         if ( timer ) clearTimeout( timer );
  //         let timerId = setTimeout( () => {
  //             // searchProducts( {
  //             //     variables: {
  //             //         searchTerm: searchTerm,
  //             //         category: cat
  //             //     }
  //             // } );
  //         }, 500 );
  //         setTimer( timerId );
  //     }
  // }, [ searchTerm, cat ] );

  useEffect(() => {
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
  }, [router.pathname]);

  function matchEmphasize(name) {
    let regExp = new RegExp(searchTerm, "i");
    return name.replace(regExp, (match) => "<strong>" + match + "</strong>");
  }

  function closeSearchForm(e) {
    // document.querySelector(".header .header-search").classList.remove("show");
  }

  function onCatSelect(e) {
    setCat(e.target.value);
  }

  function onSearchChange(e) {
    setSearchTerm(e.target.value);

    searcProducts(e.target.value).then((res) => {
      console.log("searcProducts", res?.data?.data);
      setSearchSuggestions(res?.data?.data);
      // if (res?.data?.Code === 1) {
      //   toast.success(res?.data?.Message);
      // } else {
      //   toast.error(res?.data?.Message);
      // }

      // addressListcall();
    });
    const eventData = {
      event_name: "search",
      items: [
        {
          search_term: e.target.value,
        },
      ],
    };

    console.log("eventData==========", eventData);
    SearchTrackGoogleAnalyticsEvent(eventData.event_name, eventData.items);

    fbq("track", "pixel_search", {
      content_type: "Product Search",
      search_string: e.target.value,

      currency: "BDT",
    });
  }

  function showSearchForm(e) {
    //document.querySelector(".header .header-search").classList.add("show");
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: "/shop/sidebar/3cols",
      query: {
        searchTerm: searchTerm,
      },
    });
  }

  function goProductPage() {
    setSearchTerm("");
    setProducts([]);
  }
  console.log("searchSuggestions", searchSuggestions);
  console.log("searchTerm", searchTerm.length);
  return (
    <div className="header-search   header-search-extended header-search-visible d-none d-lg-block floatCenter">
      <button className="search-toggle">
        <i className="icon-search"></i>
      </button>

      <form
        action="#"
        method="get"
        onSubmit={onSubmitSearchForm}
        onClick={showSearchForm}
      >
        <div className="header-search-wrapper search-wrapper-wide">
          <input
            type="text"
            onChange={onSearchChange}
            value={searchTerm}
            className="form-control"
            name="q"
            placeholder="Search product ..."
            required
          />
          <button className="btn btn-primary" type="submit">
            <i className="icon-search"></i>
          </button>
          <label htmlFor="q" className="sr-only" value={searchTerm} required>
            Search
          </label>
          <div className="live-search-list" onClick={goProductPage}>
            <div className="autocomplete-suggestions">
              {searchTerm.length > 2 &&
                searchSuggestions.map((product, index) => (
                  <ALink
                    href={`/shop/sidebar/3cols/?searchTerm=${searchTerm}`}
                    className="autocomplete-suggestion"
                    key={`search-result-${index}`}
                    onClick={() => setSearchTerm(product.product_name)}
                  >
                    <div
                      className="search-name"
                      dangerouslySetInnerHTML={safeContent(
                        matchEmphasize(product.product_name)
                      )}
                    ></div>
                  </ALink>
                ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default HeaderSearch;
