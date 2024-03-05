import { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";
import { connect } from "react-redux";
import SlideToggle from "react-slide-toggle";
import ALink from "~/components/features/alink";
import Card from "~/components/features/accordion/card";
import Accordion from "~/components/features/accordion/accordion";

import { GetColorName } from "hex-color-to-color-name";
import Qty from "~/components/features/qty";
import { useDispatch } from "react-redux";
import { actions as wishlistAction } from "~/store/wishlist";
import { actions as cartAction } from "~/store/cart";
import { recentlyView } from "~/store/recentlyViewed";
import { canAddToCart, isInWishlist } from "~/utils";
import ReactHtmlParser from "react-html-parser";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useWishlist } from "../../header/partials/WishlistContext";
import Logindiv from "~/pages/logindiv";
import { wishLists, addToWishlist, getOutOfStock } from "~/core/requests";
//import { useFacebookPixel } from "react-facebook-pixel";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
} from "react-share";
import {
  TrackGoogleAnalyticsEvent,
  SearchTrackGoogleAnalyticsEvent,
} from "~/pages/trackingevents";
function DetailOne(props) {
  const dispatch = useDispatch();
  // const fbq = useFacebookPixel();
  const router = useRouter();
  const { updateWishlistCount } = useWishlist();
  const ref = useRef(null);
  const { product } = props;
  const { onColorClick, OutofStockGet } = props;
  const [variant, setVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const [qty2, setQty2] = useState(1);
  const [wishList, setWishList] = useState(true);
  const [variationGroup, setVariationGroup] = useState([]);
  const [sizeArray, setSizeArray] = useState([]);
  const [colorArray, setColorArray] = useState([]);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState({
    color: null,
    colorName: null,
    price: null,
    Orgprice: null,
    size: "",
    variantId: "",
  });

  useEffect(() => {
    const variantFromUrl = router.query.variant;
    console.log("router.query.variant", router.query.variant);
    setVariant(variantFromUrl);
  }, [router.query.variant]);

  const [showClear, setShowClear] = useState(false);
  const [OutofStock, setOutofStock] = useState(false);

  const [Showguide, setShowguide] = useState(false);
  const [showVariationPrice, setShowVariationPrice] = useState(false);

  const [wishlistData, setWishlistData] = useState([]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  // Get the Title of the current page dynamically
  const title =
    typeof document !== "undefined"
      ? document.title
      : "Check out this awesome content!";
  console.log("============", shareUrl, title);
  //For Wishlists from API
  let userId = "";
  const UserDetail = JSON.parse(localStorage.getItem("User"));
  if (UserDetail) {
    userId = UserDetail.userId;
  }

  if (userId) {
    useEffect(() => {
      wishLists(userId).then((res) => {
        setWishlistData(res?.data?.data);
      });
    }, []);
  }
  useEffect(() => {
    dispatch(recentlyView(product));
  }, []);
  useEffect(() => {
    setVariationGroup(
      product?.product_variant_prices?.reduce((acc, cur) => {
        // console.log("cur=========", cur);

        acc.push({
          color: cur.product_color_code,
          colorName: cur.product_color_code,
          size: cur.product_variant_size_detail,
          price: cur.product_variant_offer_price,
          Orgprice: cur.product_variant_price_mrp,
          variantId: cur.product_variant_price_id,
          productId: cur.product_variant_product_id,
        });

        return acc;
      }, [])
    );
  }, [product]);
  useEffect(() => {
    onColorClick(product?.product_variant_prices[0]?.product_color_code);

    setSelectedVariant({
      color: product?.product_variant_prices[0]?.product_color_code,
      colorName: null,
      price: product?.product_variant_prices[0]?.product_variant_offer_price,
      Orgprice: product?.product_variant_prices[0]?.product_variant_price_mrp,
      size: product?.product_variant_prices[0]?.product_variant_size_detail,
      variantId: product?.product_variant_prices[0]?.product_variant_price_id,
      productId: product?.product_variant_prices[0]?.product_variant_product_id,
    });
    getOutOfStocks(
      product?.product_variant_prices[0]?.product_variant_product_id,
      product?.product_variant_prices[0]?.product_color_code,
      product?.product_variant_prices[0]?.product_variant_size_detail
    );
    setQty(1);
    setQty2(1);
  }, [router.query.slug, product]);

  useEffect(() => {
    refreshSelectableGroup();

    // updateURLWithVariant(selectedVariant.color, selectedVariant.size);
  }, [variationGroup, selectedVariant, product]);

  // console.log("selectedVariant----------", selectedVariant);
  useEffect(() => {
    setShowClear(
      selectedVariant.product_color_code ||
        selectedVariant.product_variant_size_detail != ""
        ? true
        : false
    );
    setShowVariationPrice(
      selectedVariant.product_color_code &&
        selectedVariant.product_variant_size_detail != ""
        ? true
        : false
    );
    let toggle = ref?.current?.querySelector(".variation-toggle");

    if (toggle) {
      if (
        selectedVariant.color &&
        selectedVariant.size != "" &&
        toggle.classList.contains("collapsed")
      ) {
        toggle.click();
      }

      if (
        !(selectedVariant.color && selectedVariant.size != "") &&
        !toggle.classList.contains("collapsed")
      ) {
        toggle.click();
      }
    }
  }, [selectedVariant, product]);
  useEffect(() => {
    if (
      selectedVariant.size &&
      selectedVariant.color &&
      selectedVariant.price
    ) {
      const eventData = {
        event_name: "view_item",
        currency: "BDT",
        value: selectedVariant.price,
        items: [
          {
            product_id: product.product_id,
            product_code: product?.product_code,
            product_name: product?.product_name,
            subcategory: product?.subcategory,
            product_variant_prices: [
              {
                product_variant_size_detail: selectedVariant.size,
                product_color_code: selectedVariant.color,
                product_variant_price_mrp: selectedVariant.price,
              },
            ],
          },
        ],
      };

      TrackGoogleAnalyticsEvent(
        eventData.event_name,
        eventData.currency,
        eventData.value,
        eventData.items
      );

      // fbq("track", "pixel_view-content", {
      //   content_ids: product?.product_code,
      //   content_name: product?.product_name,
      //   content_type: "Product contents view",
      //   content_category: product?.subcategory?.subcategory_name,
      //   contents: [
      //     {
      //       size: selectedVariant.size,
      //       color: selectedVariant.color,
      //       Quantity: qty,
      //     },
      //   ],

      //   value: selectedVariant.price,
      //   currency: "BDT",
      // });
    }
  }, [selectedVariant]);

  var productColor = selectedVariant.color;
  var productSize = selectedVariant.size;
  var productPrice = selectedVariant.price;
  var variantId = selectedVariant.variantId;
  var productId = selectedVariant.productId;

  //Check wishlist if Duplicate
  const checkWishList = (wishlistData, productColor, productSize) => {
    const foundIndex = wishlistData.findIndex((item) => {
      return (
        item?.product_variant_price?.product_color_code === productColor &&
        item?.product_variant_price?.product_variant_size_detail === productSize
      );
    });
    return foundIndex >= 0;
  };
  //buynow
  const onBuyNowClick = (e, index = 0) => {
    e.preventDefault();
    const data = {
      productId: selectedVariant?.productId,
      variantId: selectedVariant?.variantId,
      qty: qty,
      price: selectedVariant?.price,
    };
    const dataJSON = JSON.stringify(data);
    localStorage.setItem("buynow", dataJSON);
    const url = `/shop/buynow`;
    router.push(url); // Use the history object to navigate
  };
  useEffect(() => {
    if (!checkWishList(wishlistData, productColor, productSize)) {
      setWishList(true);
    } else {
      setWishList(false);
    }
  }, [product]);

  function onWishlistClick(e) {
    e.preventDefault();
    if (userId) {
      if (!checkWishList(wishlistData, productColor, productSize)) {
        addToWishlist(productId, userId, variantId).then((res) => {
          toast.success(res?.data?.Message);
          updateWishlistCount(res?.data?.wishlistCount);
        });
        const eventData = {
          event_name: "add_to_wishlist",

          currency: "BDT",
          value: selectedVariant.price,
          items: [
            {
              product_id: product.product_id,
              product_code: product?.product_code,
              product_name: product?.product_name,
              subcategory: product?.subcategory,
              product_variant_prices: [
                {
                  product_variant_size_detail: selectedVariant.size,
                  product_color_code: selectedVariant.color,
                  product_variant_price_mrp: selectedVariant.price,
                },
              ],
            },
          ],
        };
        TrackGoogleAnalyticsEvent(
          eventData.event_name,

          eventData.currency,
          eventData.value,
          eventData.items
        );
        fbq("track", "pixel_add-to-wishlist", {
          content_ids: product?.product_code,
          content_name: product?.product_name,
          content_category: product?.subcategory?.subcategory_name,
          contents: [
            {
              size: selectedVariant.size,
              color: selectedVariant.color,
              Quantity: qty,
            },
          ],

          value: selectedVariant.price,
          currency: "BDT",
        });
      }
    } else {
      toast.error("Please login");
    }
  }

  function refreshSelectableGroup() {
    let tempArray = [...variationGroup];
    if (selectedVariant.color) {
      tempArray = variationGroup?.reduce((acc, cur) => {
        //console.log("curcolorsixe=========", cur);
        if (selectedVariant?.color !== cur?.color) {
          return acc;
        }
        return [...acc, cur];
      }, []);
    }

    setSizeArray(
      tempArray?.reduce((acc, cur) => {
        console.log("sizecut-----1----", cur);
        if (acc.findIndex((item) => item.size == cur.size) !== -1) return acc;
        return [...acc, cur];
      }, [])
    );

    tempArray = [...variationGroup];
    if (selectedVariant.size) {
      tempArray = variationGroup?.reduce((acc, cur) => {
        console.log("sizecut---2---------", cur);
        if (selectedVariant.size !== cur.size) {
          return acc;
        }
        return [...acc, cur];
      }, []);
    }

    setColorArray(
      product?.product_variant_prices?.reduce((acc, cur) => {
        // console.log("colorcur============", cur);
        if (
          tempArray.findIndex((item) => item.color == cur.product_color_code) ==
          -1
        ) {
          return [
            ...acc,
            {
              color: cur.product_color_code,
              colorName: cur.product_color_code,
              price: cur.product_variant_offer_price,
              Orgprice: cur.product_variant_price_mrp,
              disabled: true,
              variantId: cur.product_variant_price_id,
              productId: cur.product_variant_product_id,
              size: cur.product_variant_size_detail,
            },
          ];
        }
        return [
          ...acc,
          {
            color: cur.product_color_code,
            colorName: cur.product_color_code,
            price: cur.product_variant_offer_price,
            Orgprice: cur.product_variant_price_mrp,
            disabled: false,
            variantId: cur.product_variant_price_id,
            productId: cur.product_variant_product_id,
            size: cur.product_variant_size_detail,
          },
        ];
      }, [])
    );
  }
  const handleLoginclose = () => {
    // Handle any post-login actions here
    // For example, you might want to close the modal or update the parent component state
    setLoginModalOpen(false);
  };
  function onChangeQty(current) {
    setQty(current);
  }

  function onChangeQty2(current) {
    setQty2(current);
  }

  function onCartClick(e, index = 0) {
    e.preventDefault();
    if (userId) {
      if (e.currentTarget.classList.contains("btn-disabled")) return;

      let newProduct = { ...product };

      if (product.product_variant_prices.length > 0) {
        const colorName = GetColorName(selectedVariant.color);
        newProduct = {
          ...product,
          name:
            product.product_name +
            " - " +
            colorName +
            ", " +
            selectedVariant.size,
          color: selectedVariant.color,
          size: selectedVariant.size,
          price: selectedVariant.price,
          variantId: selectedVariant.variantId,
        };
      }
      props.addToCart(newProduct, index == 0 ? qty : qty2);
      const eventData = {
        event_name: "add_to_cart",

        currency: "BDT",
        value: selectedVariant.price,
        items: [
          {
            product_id: product.product_id,
            product_code: product?.product_code,
            product_name: product?.product_name,
            subcategory: product?.subcategory,
            product_variant_prices: [
              {
                product_variant_size_detail: selectedVariant.size,
                product_color_code: selectedVariant.color,
                product_variant_price_mrp: selectedVariant.price,
              },
            ],
          },
        ],
      };

      TrackGoogleAnalyticsEvent(
        eventData.event_name,

        eventData.currency,
        eventData.value,
        eventData.items
      );

      fbq("track", "pixel_add-to-cart", {
        content_ids: product?.product_code,
        content_name: product?.product_name,
        content: [
          {
            subcategory: product?.subcategory?.subcategory_name,
            size: selectedVariant.size,
            color: selectedVariant.color,
            Quantity: qty,
          },
        ],
        content_type: "Product added to cart",
        value: selectedVariant.price,
        currency: "BDT",
      });
    } else {
      setLoginModalOpen(true);
    }
  }

  function selectColor(e, item) {
    console.log("target", item);
    e.preventDefault();
    onColorClick(item.color);

    if (item.color == selectedVariant.color) {
      setSelectedVariant({
        ...selectedVariant,
        color: null,
        colorName: null,
        price: item.price,
        Orgprice: item.Orgprice,
        size: item.size,
        variantId: item.variantId,
        productId: item.productId,
      });
    } else {
      setSelectedVariant({
        ...selectedVariant,
        color: item.color,
        colorName: item.color,
        price: item.price,
        Orgprice: item.Orgprice,
        size: item.size,
        variantId: item.variantId,
        productId: item.productId,
      });
    }
    updateURLWithVariant(item.color, item?.size);
    getOutOfStocks(item.productId, item.color, item?.size);
    if (!checkWishList(wishlistData, item.color, productSize)) {
      setWishList(true);
    } else {
      setWishList(false);
    }
  }

  function selectSize(e) {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedPrice = selectedOption.getAttribute("data-price");
    const selectedOrgPrice = selectedOption.getAttribute("data-mrp");
    const selecteditem = JSON.parse(selectedOption.getAttribute("data-item"));
    console.log("---------------sisechange", selectedOrgPrice);
    if (e.target.value == "") {
      setSelectedVariant({ ...selectedVariant, size: "" });
    } else {
      //  console.log("else---");
      setSelectedVariant({
        ...selectedVariant,
        size: e.target.value,
        price: selectedPrice,
        Orgprice: selectedOrgPrice,
        variantId: selecteditem.variantId,
        productId: selecteditem.productId,
      });
      if (!checkWishList(wishlistData, productColor, e.target.value)) {
        setWishList(true);
      } else {
        setWishList(false);
      }
      getOutOfStocks(
        product?.product_id,
        selectedVariant?.color,
        e.target.value
      );
      updateURLWithVariant(selectedVariant?.color, e.target.value);
    }
  }
  if (!product) {
    return <div></div>;
  }
  console.log("colorArray============", colorArray);
  // console.log("sizeArray=============", sizeArray);
  // console.log("selectedVariant=============", selectedVariant);
  const getShortenedContent = (content, maxLength) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..." // Append ellipsis if the content exceeds maxLength
      : content;
  };
  const showGuide = () => {
    setShowguide(true);
    // console.log("showGuide");
  };
  function closeModal() {
    setShowguide(false);
  }
  function getOutOfStocks(id, color, size) {
    getOutOfStock(id, color, size).then((res) => {
      console.log("getout-res", res);
      setOutofStock(res.data);
      console.log("getout-res", res.data);
      // OutofStockGet(res.data);
    });
  }
  function updateURLWithVariant(color, newsize) {
    // fbq("track", "PageView", {
    //   content_ids: [`${color}${newsize}`],
    //   content_name: `${color}${newsize}`,
    // });
    const asPathWithoutQuery = router.asPath.split("?")[0];

    const inputString = `${newsize}${color}`;
    const stringWithoutHash = inputString.replace(/#/g, "");
    console.log("path", asPathWithoutQuery);
    router.push({
      pathname: asPathWithoutQuery,
      query: { variant: stringWithoutHash },
    });
  }

  const handleLogin = () => {
    // Handle any post-login actions here
    // For example, you might want to close the modal or update the parent component state
    handleLoginclose(); // Call the closeModal function to close the modal
  };

  // Handle back button click
  const handleShare = (value) => {
    const eventData = {
      event_name: "share",
      items: [
        {
          method: `${value}`,
          product_id: product?.product_id,
        },
      ],
    };

    console.log("eventData==========", eventData);
    SearchTrackGoogleAnalyticsEvent(eventData.event_name, eventData.items);
  };
  console.log(
    "selectedVariant============",
    selectedVariant?.color,
    selectedVariant?.size
  );
  return (
    <>
      {/* <button onClick={handleBackButtonClick}>back</button> */}
      <div className="product-details" ref={ref}>
        <h1 className="product-title mb-0">{product.product_name}</h1>
        <p className="mb-1">{product.product_code}</p>
        <div className="product-price">
          <SlideToggle collapsed={true}>
            <div>
              <button className={`d-none variation-toggle `}></button>
              <div style={{ display: "flex" }}>
                {selectedVariant.Orgprice != selectedVariant.price ? (
                  <div
                    className="product-price"
                    style={{
                      marginRight: "10px",
                      color: "#86848469",
                      textDecoration: "line-through",
                      fontSize: "18px",
                    }}
                  >
                    {selectedVariant.Orgprice ? "\u09F3 " : ""}

                    {selectedVariant.Orgprice ? selectedVariant.Orgprice : ""}
                  </div>
                ) : (
                  ""
                )}
                <div className="product-price">
                  {selectedVariant.price ? "\u09F3 " : ""}

                  {selectedVariant.price ? selectedVariant.price : ""}
                </div>
              </div>
            </div>
          </SlideToggle>
        </div>
        <div className="product-content">
          {" "}
          {ReactHtmlParser(
            getShortenedContent(
              product?.product_short_description,
              500 // Specify the maximum length you want (200 characters in this case)
            )
          )}
        </div>

        {product.product_variant_prices.length > 0 ? (
          <>
            <div className="details-filter-row details-row-size">
              <label>Color:</label>

              <div className="product-nav product-nav-dots">
                {/* {product?.product_variant_prices.map((item, index) => (
                  <a
                    href="#"
                    className={`${
                      (item.product_color_code == selectedVariant.color
                        ? "active "
                        : "") + (item.disabled ? "disabled" : "")
                    }`}
                    style={{ backgroundColor: item.product_color_code }}
                    key={index}
                    onClick={(e) => selectColor(e, item)}
                  ></a>
                ))} */}
                {[...new Set(colorArray.map((item) => item.color))].map(
                  (color, index) => {
                    const item = colorArray.find(
                      (item) => item.color === color
                    );

                    return (
                      <a
                        href="#"
                        className={`${
                          (color === selectedVariant.color ? "active " : "") +
                          (item.disabled ? "" : "")
                        }`}
                        style={{
                          backgroundColor: color,
                          borderColor: "#f3f3f3",
                        }}
                        key={index}
                        onClick={(e) => selectColor(e, item)}
                      ></a>
                    );
                  }
                )}
              </div>
            </div>

            <div className="details-filter-row details-row-size">
              <label htmlFor="size">Size:</label>
              <div className="select-custom">
                <select
                  name="size"
                  className="form-control"
                  value={selectedVariant.size}
                  onChange={selectSize}
                >
                  {sizeArray.map((item, index) => (
                    <option
                      value={item.size}
                      data-price={item?.price}
                      data-mrp={item?.Orgprice}
                      data-item={JSON.stringify(item)}
                      key={index}
                    >
                      {item.size}
                    </option>
                  ))}
                </select>
              </div>

              <a
                onClick={showGuide}
                className="size-guide mr-4"
                style={{ cursor: "pointer" }}
              >
                <i className="icon-th-list"></i>size guide
              </a>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="details-filter-row details-row-size">
          <label htmlFor="size">Qty:</label>
          <div className="select-custom">
            <Qty changeQty={onChangeQty} max={product.stock} value={qty}></Qty>
          </div>

          {OutofStock ? (
            <a className="" style={{ cursor: "pointer", color: "red" }}>
              <input type="radio" id="specifyColor" checked /> Out of Stock
            </a>
          ) : (
            <a className="" style={{ cursor: "pointer", color: "green" }}>
              <input type="radio" id="specifyColorGreen" checked /> In Stock
            </a>
          )}
        </div>

        <div className="product-details-action">
          {!OutofStock ? (
            <a
              href="#"
              className="btn-product btn-cart mr-5 mb-3"
              onClick={(e) => onCartClick(e, 0)}
            >
              <span>add to cart</span>
            </a>
          ) : (
            <a className="btn-product btn-cart btn-disabled mr-5 mb-3">
              <span>Out of stock</span>
            </a>
          )}
          {!OutofStock ? (
            <a
              href="#"
              className="btn-product btn-cart mb-3"
              onClick={(e) => onBuyNowClick(e, 0)}
            >
              <span>Buy Now</span>
            </a>
          ) : (
            ""
          )}

          <div className="details-action-wrapper mb-3">
            {!wishList ? (
              <ALink
                href="/shop/wishlist"
                className="btn-product btn-wishlist added-to-wishlist"
              >
                <span>Go to Wishlist</span>
              </ALink>
            ) : (
              <a
                href="#"
                className="btn-product btn-wishlist"
                onClick={onWishlistClick}
              >
                <span>Add to Wishlist</span>
              </a>
            )}
          </div>
        </div>
        {product.specifications_details.length > 0 ? (
          <>
            <h5>Specification Details</h5>
            <Accordion>
              {product.specifications_details.map((itemsp, indexsp) => (
                <Card
                  title={`${itemsp?.specification?.specifications_title}`}
                  expanded={indexsp === 0 ? true : false}
                  key={indexsp}
                >
                  {itemsp?.specifications_value}
                </Card>
              ))}
            </Accordion>
          </>
        ) : (
          ""
        )}
        <div className="product-details-footer">
          <div className="social-icons social-icons-sm">
            <span className="social-label">Share:</span>

            <FacebookShareButton
              url={shareUrl}
              quote={title}
              className="social-icon"
              title="Facebook"
              onClick={() => handleShare("Facebook")}
            >
              <i className="icon-facebook-f"></i>
            </FacebookShareButton>
            <TwitterShareButton
              url={shareUrl}
              quote={title}
              className="social-icon"
              title="Twitter"
              onClick={() => handleShare("Twitter")}
            >
              <i className="icon-twitter"></i>
            </TwitterShareButton>

            <PinterestShareButton
              url={shareUrl}
              quote={title}
              media={product?.product_image}
              className="social-icon"
              title="Pinterest"
              onClick={() => handleShare("Pinterest")}
            >
              <i className="icon-pinterest"></i>
            </PinterestShareButton>
          </div>
        </div>
      </div>
      <Modal
        isOpen={Showguide}
        // style={customStyles}
        contentLabel="login Modal"
        className="modal-dialog"
        overlayClassName="d-flex align-items-center justify-content-center"
        id="login-modal"
        onRequestClose={closeModal}
        closeTimeoutMS={10}
      >
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="close" onClick={closeModal}>
              <span aria-hidden="true">
                <i className="icon-close"></i>
              </span>
            </button>
            <div className="form-box" style={{ padding: "5px" }}>
              <h4 className="text-center mt-1">Size Guide</h4>
              <div className="form-tab">
                <img src={product?.bannerimg} />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={loginModalOpen}
        // style={customStyles}
        contentLabel="login Modal"
        className="modal-dialog"
        overlayClassName="d-flex align-items-center justify-content-center"
        id="login-modal"
        onRequestClose={handleLoginclose}
        closeTimeoutMS={10}
      >
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="close" onClick={handleLoginclose}>
              <span aria-hidden="true">
                <i className="icon-close"></i>
              </span>
            </button>
            <Logindiv
              onLogin={handleLogin}
              handleLoginclose={handleLoginclose}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  //  console.log("mapStateToProps", state);
  return {
    cartlist: state.cartlist.data,
    wishlist: state.wishlist.data,
    recentlyViewedlist: state.recentlyViewed.data,
  };
};

export default connect(mapStateToProps, {
  ...wishlistAction,
  ...cartAction,
  ...recentlyView,
})(DetailOne);
