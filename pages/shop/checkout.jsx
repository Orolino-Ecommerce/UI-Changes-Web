import { useEffect, useState } from "react";
import { connect } from "react-redux";
import SlideToggle from "react-slide-toggle";
import { actions as cartAction } from "~/store/cart";
import { toast } from "react-toastify";
import Modal from "react-modal";
import ALink from "~/components/features/alink";
import Accordion from "~/components/features/accordion/accordion";
import Card from "~/components/features/accordion/card";
import PageHeader from "~/components/features/page-header";
import AddressList from "~/pages/shop/address-list";

// import app from "~/pages/_app";
import { cartPriceTotal } from "~/utils/index";
import { useRouter } from "next/router";
import Logindiv from "~/pages/logindiv";
//import { useFacebookPixel } from "react-facebook-pixel";
import {
  TrackGoogleAnalyticsEvent,
  PurchaseTrackGoogleAnalyticsEvent,
  PayTrackGoogleAnalyticsEvent,
} from "~/pages/trackingevents";
import { trackCustomEvent } from "~/core/FBevents";
import {
  getAddressList,
  removeAddressList,
  addAddressList,
  getCoupon,
  addCartOrder,
  addOnlineOrder,
  paymentLists,
  paymentHistory,
  mobileOtps,
  mobileverifyOtps,
} from "~/core/requests";

function Checkout(props) {
  const { cartlist } = props;
  // console.log("props", props);
  const router = useRouter();
  const [ShowAddressModal, setShowAddressModal] = useState(false);
  const UserSaved = localStorage.getItem("User");
  const UserSavedobj = JSON.parse(UserSaved);
  const loggedUserId = UserSavedobj?.userId;
  const loggedUserEmail = UserSavedobj?.email;
  console.log("UserSaved", UserSaved);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [buynow, setbuynow] = useState();
  const [couponAmt, setcouponAmt] = useState(0);
  const [coupon, setcoupon] = useState();
  const [totalprice, settotalprice] = useState(0);
  const [couponcode, setcouponcode] = useState(0);

  const [loading, setloading] = useState(false);
  const [subloading, setsubloading] = useState(false);
  const [addresslist, setaddresslist] = useState([]);
  const [paymentList, setPaymentLists] = useState([]);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [name, setName] = useState("");
  const [agrrementError, setagrrementError] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doorNo, setDoorNo] = useState("");
  const [town, setTown] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Bangladesh");
  const [pincode, setPincode] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [couponId, setcouponId] = useState(0);
  const [shippinTotal, setshippinTotal] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const statusParam = queryParams.get("status");
    // console.log("statusParam", statusParam);
    if (statusParam == "true") {
      toast.success("Order placed successfully...!");
      removecartItem(cartlist, props);
    }
    if (statusParam == "false") {
      toast.error("Order failed...!");
    }
  }, []);

  // Calculate the shipping total
  let shipTot = 0;
  cartlist.forEach((item) => {
    shipTot += Number(item?.product_delivery_charge);
  });
  const cartValue = cartPriceTotal(cartlist)
    .toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(/,/g, "");
  //const parsedNumber = Number(numberWithCommas.replace(/,/g, ''));

  // Update the shipping total state
  useEffect(() => {
    setshippinTotal(shipTot);

    settotalprice(Number(cartValue) + Number(shipTot));
  }, [shipTot]);
  useEffect(() => {
    addressListcall();
    paymnetListcall();
  }, []);

  function addressListcall() {
    getAddressList(loggedUserId).then((res) => {
      setaddresslist(res?.data?.result);
      setSelectedAddress(res?.data?.result[0]?.id);
    });
  }
  function paymnetListcall() {
    paymentLists().then((res) => {
      setPaymentLists(res?.data?.data);
      const activeItem = res?.data?.data.find((item) => item.active);
      setSelectedValue(activeItem?.id);
    });
  }
  const handleCardClick = (value) => {
    // console.log("------------", value);
    setSelectedValue(value);
  };
  useEffect(() => {
    // Calculate the total qty
    const totalQty = cartlist.reduce((total, obj) => total + obj.qty, 0);
    const eventData = {
      event_name: "begin_checkout",

      currency: "BDT",
      value: totalprice,
      items: cartlist.map((cartItem) => {
        return {
          product_id: cartItem.product_id,
          product_code: cartItem?.product_code,
          product_name: cartItem?.product_name,
          subcategory: cartItem?.subcategory,
          size: cartItem.size,
          color: cartItem.color,
          price: cartItem.price,
        };
      }),
    };

    console.log("eventData==========", eventData);
    TrackGoogleAnalyticsEvent(
      eventData.event_name,

      eventData.currency,
      eventData.value,
      eventData.items
    );
    // const commonEventData = {
    //   content_id: "123",
    //   content: "Sample Content",
    //   content_type: "product",
    //   name: "Sample Event",
    // };
    const commonEventData = {
      content_type: "Initiate checkout",

      contents: cartlist.map((cartItem) => {
        return {
          product_id: cartItem.product_id,
          product_code: cartItem?.product_code,
          product_name: cartItem?.product_name,
          subcategory: cartItem?.subcategory,
          size: cartItem.size,
          color: cartItem.color,
          price: cartItem.price,
        };
      }),
      currency: "BDT",
      num_items: totalQty,
      value: cartValue,
    };
    console.log("totalprice==============", cartValue);
    trackCustomEvent("pixel_initiate-checkout", commonEventData);
  }, []);
  useEffect(() => {
    if (paymentList?.length > 0) {
      document.querySelector("body").addEventListener("click", clearOpacity);

      return () => {
        document
          .querySelector("body")
          .removeEventListener("click", clearOpacity);
      };
    }
  }, []);
  const handleModalShow = (e) => {
    e.preventDefault();
    setShowAddressModal(true);
    setVerificationCode("");
    setVerificationStep(1); // 1: Enter Mobile, 2: Verify Code
    setIsVerified(false);
    setmobileNumberError("");
    setotpcodeError("");
    setinsertId("");
    setPhoneNumber("");
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setloading(true);
    const data = {
      name: name,
      userId: userId,
      email: email,
      phoneNumber: phoneNumber,
      doorNo: doorNo,
      town: town,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
      lastInsertId: insertId,
    };
    console.log("dat=======", isVerified, verificationStep);
    if (isVerified === true && verificationStep === 3) {
      // console.log("submitted data", data);
      addAddressList(data).then((res) => {
        if (res?.data?.Code === 1) {
          toast.success(res?.data?.Message);
          setloading(false);
        } else {
          toast.error(res?.data?.Message);
          setloading(false);
        }
        addressListcall();
        setShowAddressModal(false);
      });
    } else {
      toast.error("Verify mobile number");
    }
  };
  const closeModal = () => {
    setShowAddressModal(false);
  };
  const handleDeleteAddress = (indexID) => {
    removeAddressList(indexID).then((res) => {
      // console.log("removed", res?.data?.Message);
      if (res?.data?.Code === 1) {
        toast.success(res?.data?.Message);
      } else {
        toast.error(res?.data?.Message);
      }

      addressListcall();
    });
  };
  function clearOpacity() {
    if (paymentList?.length > 0) {
      if (document.querySelector("#checkout-discount-input").value == "")
        document
          .querySelector("#checkout-discount-form label")
          .removeAttribute("style");
    }
  }

  function addOpacity(e) {
    e.currentTarget.parentNode
      .querySelector("label")
      .setAttribute("style", "opacity: 0");
  }
  console.log("cartlist-", cartlist);
  const handleSelectAddress = (index, ID) => {
    // console.log(ID);
    setSelectedAddressIndex(index);
    setSelectedAddress(ID);
  };
  const totalPrices = Number(cartValue) + Number(shippinTotal);

  const couponCode = (e) => {
    const couponCode = e.target.value;

    getCoupon(couponCode, totalPrices, loggedUserId).then((res) => {
      setcoupon(res?.data);
      // console.log("res?.data...coupon-------------------", res?.data);
      if (res?.data?.data) {
        setcouponcode(couponCode);
        setcouponId(res?.data?.couponId);
        setcouponAmt(res?.data?.data);
        settotalprice(
          Number(cartValue) - Number(res?.data?.data) + Number(shippinTotal)
        );
      } else {
        settotalprice(Number(cartValue) + Number(shippinTotal));
      }
    });
  };
  const removecartItem = (list, props) => {
    // console.log("list------------", list);
    list.map((item) => {
      props.removeFromCartClear(item);
    });
  };

  const handleCheckout = (e) => {
    const totalQty = cartlist.reduce((total, obj) => total + obj.qty, 0);
    e.preventDefault();
    if (agreementChecked) {
      setagrrementError("");
      if (selectedAddress) {
        setsubloading(true);

        const data = {
          loggedUserId: loggedUserId,
          totalitems: totalQty,
          couponamount: couponAmt,
          couponcode: couponcode,
          couponid: couponId,
          totalamount: totalprice,
          shipping_amount: shippinTotal,
          customernotes: customerNotes,
          delivery_address: selectedAddress,
          order_subtotal: cartValue,

          orderItem: cartlist,
        };
        const eventDataP = {
          event_name: "add_payment_info",

          currency: "BDT",
          value: totalprice,
          payment_type:
            selectedValue === 2 ? "Pay On Delivery" : "Online Payment",
          items: cartlist.map((cartItem) => {
            return {
              product_id: cartItem.product_id,
              product_code: cartItem?.product_code,
              product_name: cartItem?.product_name,
              subcategory: cartItem?.subcategory,
              size: cartItem?.size,
              color: cartItem?.color,
              price: cartItem?.price,
            };
          }),
        };

        console.log("eventData==========", eventDataP);
        PayTrackGoogleAnalyticsEvent(
          eventDataP.event_name,

          eventDataP.currency,
          eventDataP.value,
          eventDataP.payment_type,
          eventDataP.items
        );

        const FBDataP = {
          content_name: "Payment Type",
          content_type:
            selectedValue === 2 ? "Pay On Delivery" : "Online Payment",

          currency: "BDT",
          value: totalprice,

          contents: cartlist.map((cartItem) => {
            return {
              product_id: cartItem.product_id,
              product_code: cartItem?.product_code,
              product_name: cartItem?.product_name,
              subcategory: cartItem?.subcategory,
              size: cartItem?.size,
              color: cartItem?.color,
              price: cartItem?.price,
            };
          }),
        };
        trackCustomEvent("pixel_add-payment-info", FBDataP);
        if (selectedValue === 2) {
          addCartOrder(data).then((res) => {
            if (res?.data?.Code === 1) {
              //toast.success(res?.data?.Message);
              const eventDatas = {
                event_name: "purchase",
                transaction_id: res?.data?.transId,
                currency: "BDT",
                value: totalprice,
                items: cartlist.map((cartItem) => {
                  return {
                    product_id: cartItem.product_id,
                    product_code: cartItem?.product_code,
                    product_name: cartItem?.product_name,
                    subcategory: cartItem?.subcategory,
                    product_variant_prices: [
                      {
                        product_variant_size_detail: cartItem?.size,
                        product_color_code: cartItem?.color,
                        product_variant_price_mrp: cartItem?.price,
                      },
                    ],
                  };
                }),
              };

              console.log("eventData==========", eventDatas);
              PurchaseTrackGoogleAnalyticsEvent(
                eventDatas.event_name,
                eventDatas.transaction_id,

                eventDatas.currency,
                eventDatas.value,
                eventDatas.items
              );

              const commonEventData = {
                content_ids: res?.data?.transId,
                content_name: "Successfull Purchase",
                content_type: "Purchase",
                currency: "BDT",
                num_items: totalQty,
                value: totalprice,
                contents: cartlist.map((cartItem) => {
                  return {
                    product_id: cartItem.product_id,
                    product_code: cartItem?.product_code,
                    product_name: cartItem?.product_name,
                    subcategory: cartItem?.subcategory,
                    product_variant_prices: [
                      {
                        product_variant_size_detail: cartItem?.size,
                        product_color_code: cartItem?.color,
                        product_variant_price_mrp: cartItem?.price,
                      },
                    ],
                  };
                }),
              };
              trackCustomEvent("pixel_purchase", commonEventData);
              const url = `/success`;
              router.push(url);
              setsubloading(false);
              removecartItem(cartlist, props);
            } else {
              //toast.error(res?.data?.Message);
              const url = `/failure`;
              router.push(url);
              setsubloading(false);
            }
          });
        } else {
          addOnlineOrder(data).then((res) => {
            // console.log("res=========", res.data);

            window.location.replace(res.data.url);
          });
        }
      } else {
        toast.error("Billing Address Required");
      }
    } else {
      setagrrementError("Please accept terms and conditions");
    }
  };
  // console.log("cartlist---------------", cartlist);
  const handleagreement = () => {
    const updatedAgreementChecked = !agreementChecked;
    setAgreementChecked(updatedAgreementChecked);

    if (updatedAgreementChecked) {
      setagrrementError("");
    } else {
      setagrrementError("Please accept terms and conditions");
    }
  };

  //guest checkout
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationStep, setVerificationStep] = useState(1); // 1: Enter Mobile, 2: Verify Code
  const [isVerified, setIsVerified] = useState(false);
  const [mobileNumberError, setmobileNumberError] = useState("");
  const [otpcodeError, setotpcodeError] = useState("");
  const [insertId, setinsertId] = useState("");
  const [userId, setuserId] = useState("");
  const [mloading, setmloading] = useState(false);
  const [vloading, setvloading] = useState(false);
  const verifyClicked = () => {
    setvloading(true);
    if (verificationCode && verificationCode.length === 6) {
      mobileverifyOtps(phoneNumber, verificationCode, insertId).then((res) => {
        if (res?.data?.status === true) {
          setVerificationStep(3);
          setIsVerified(true);
          setvloading(false);
          setuserId(res?.data?.userId);
          console.log("res========", res?.data);
          const responseString = JSON.stringify(res?.data);
          localStorage.setItem("User", responseString);
        } else {
          setotpcodeError(res?.data?.message);
          setvloading(false);
        }
      });
    } else {
      setotpcodeError("Please enter valid verification code");
      setvloading(false);
    }
  };
  const sentVerificationcode = () => {
    console.log("sentVerificationcode");
    setmloading(true);
    if (phoneNumber && phoneNumber.length >= 10) {
      console.log("ifff");
      mobileOtps(phoneNumber, loggedUserId, loggedUserEmail).then((res) => {
        if (res?.data?.status === true) {
          setVerificationStep(2);
          setinsertId(res?.data?.id);
          setmloading(false);
        } else {
          setmobileNumberError(res?.data?.message);
          setmloading(false);
        }
      });
    } else {
      console.log("innnnnnnn");
      setmobileNumberError("Please enter valid mobile number");
      setmloading(false);
    }
  };
  return (
    <>
      <div className="main">
        <PageHeader title="Checkout" subTitle="Shop" />
        <nav className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <ALink href="/">Home</ALink>
              </li>
              <li className="breadcrumb-item">
                <ALink href="/shop/sidebar/list">Shop</ALink>
              </li>
              <li className="breadcrumb-item active">Checkout</li>
            </ol>
          </div>
        </nav>
        {paymentList?.length > 0 ? (
          <div className="page-content">
            <div className="checkout">
              <div className="container">
                <div className="checkout-discount">
                  <form
                    action="#"
                    id="checkout-discount-form"
                    style={loggedUserId ? {} : { display: "none" }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="checkout-discount-input"
                      onClick={addOpacity}
                      onChange={(e) => couponCode(e)}
                    />
                    <label
                      htmlFor="checkout-discount-input"
                      className="text-truncate"
                    >
                      Have a coupon? <span>Click here to enter your code</span>
                    </label>
                  </form>
                </div>
                <span style={{ color: "red" }}>{coupon?.message}</span>
                <div>
                  {/* {loggedUserId ? ( */}
                  <div className="row">
                    <div className="col-lg-9">
                      {/* <button btn btn-outline-primary-2 onClick={() => onDeleteAddresss(address?.id)}>Add New Address</button> */}
                      <button
                        className="btn btn-outline-primary-2   "
                        style={{ float: "right" }}
                        onClick={(e) => {
                          handleModalShow(e);
                        }}
                      >
                        <span>Add New Address</span>
                      </button>
                      <AddressList
                        addresses={addresslist}
                        selectedAddressIndex={selectedAddressIndex}
                        onSelectAddress={handleSelectAddress}
                        onDeleteAddress={handleDeleteAddress}
                      />

                      <label>Order notes (optional)</label>
                      <textarea
                        className="form-control"
                        cols="30"
                        rows="4"
                        value={customerNotes}
                        placeholder="Notes about your order, e.g. special notes for delivery"
                        onChange={(e) => setCustomerNotes(e.target.value)}
                      ></textarea>
                    </div>

                    <aside className="col-lg-3">
                      <div className="summary">
                        <h3 className="summary-title">Your Order</h3>

                        <table className="table table-summary">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Total</th>
                            </tr>
                          </thead>

                          <tbody>
                            {cartlist.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    {" "}
                                    <ALink
                                      href={`/bd/products/${item?.product_name
                                        .trim()
                                        .replace(/\s+/g, "-")
                                        .toLowerCase()}/${
                                        item?.product_id
                                      }-${item?.product_code
                                        .trim()
                                        .replace(/\s+/g, "-")
                                        .toLowerCase()}`}
                                    >
                                      {item.name} <br /> {item?.qty} Qty
                                    </ALink>
                                  </td>
                                  <td>
                                    {"\u09F3 "}
                                    {item.sum.toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </td>
                                </tr>
                              );
                            })}
                            <tr className="summary-subtotal">
                              <td>Subtotal:</td>
                              <td>
                                {"\u09F3 "}
                                {cartPriceTotal(cartlist).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Coupon Discount ( - ):</td>
                              <td>
                                {" "}
                                {"\u09F3 "}
                                {couponAmt}
                              </td>
                            </tr>
                            <tr>
                              <td>Shipping ( + ):</td>
                              <td>
                                {" "}
                                {"\u09F3 "}
                                {shippinTotal.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </td>
                            </tr>
                            <tr className="summary-total">
                              <td>Total:</td>
                              <td>
                                {"\u09F3 "}
                                {totalprice.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div
                          className="payment-options-container"
                          style={{ display: "grid", gap: "10px" }}
                        >
                          {paymentList?.map((item, i) => {
                            return (
                              <label>
                                <input
                                  style={{
                                    marginRight: "10px",
                                    width: "1.6rem",
                                    height: "1.6rem ",
                                  }}
                                  className=""
                                  type="radio"
                                  name="paymentOption" // Provide the same name for all radio buttons to group them
                                  value={item?.id} // Use the id as the value
                                  checked={item.id === selectedValue}
                                  onChange={() => handleCardClick(item?.id)} // Handle change event
                                />
                                {item?.payment_options}
                              </label>
                            );
                          })}
                        </div>
                        <div style={{ marginTop: "20px" }}>
                          {" "}
                          {agrrementError ? (
                            <p style={{ color: "red" }}>{agrrementError}</p>
                          ) : (
                            ""
                          )}{" "}
                        </div>

                        <div
                          className="form-check form-check-inline tc"
                          style={{ marginTop: "10px" }}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            checked={agreementChecked}
                            onChange={handleagreement}
                            style={{ marginTop: "-78px" }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox1"
                            style={{ fontSize: "13px" }}
                          >
                            By continuing you agree to <br />
                            <a
                              className="link-button"
                              href="https://oro-lino.com/pages/tc"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Terms &amp; Conditions
                            </a>
                            <br />
                            <a
                              className="link-button"
                              href="https://oro-lino.com/pages/privacy"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Privacy policy,
                            </a>
                            <br />
                            <a
                              className="link-button"
                              href="https://oro-lino.com/pages/rr/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Refund Return policy
                            </a>
                          </label>
                        </div>
                        <br />
                        {!subloading ? (
                          <button
                            style={{ marginTop: "20px" }}
                            type="submit"
                            className="btn btn-outline-primary-2 btn-order btn-block"
                            onClick={(e) => {
                              handleCheckout(e);
                            }}
                            // Disable the button if the checkbox is not checked
                          >
                            {!subloading ? (
                              <span>Place Order</span>
                            ) : (
                              <span>Loading...</span>
                            )}
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-outline-primary-2 btn-order btn-block"
                          >
                            <>
                              <span>Loading...</span>
                            </>
                          </button>
                        )}
                      </div>
                    </aside>
                  </div>
                  {/* // ) : ( //{" "}
                  <>
                    // <Logindiv />
                    //{" "}
                  </>
                  // )} */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "-webkit-center" }}>
            <img src={"/images/loader.gif"} style={{ width: "300px" }} />{" "}
          </div>
        )}
      </div>
      {ShowAddressModal ? (
        <Modal
          isOpen={open}
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
              <div className="form-box">
                <div className="form-group">
                  {isVerified ? (
                    <form onSubmit={handleSubmit}>
                      <div className="shipping-info">
                        <h5>Address Details</h5>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Name
                                <abbr className="required" title="required">
                                  *
                                </abbr>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                required
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Email
                                <abbr className="required" title="required">
                                  *
                                </abbr>
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                required
                                placeholder="Email ID"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                Phone Number
                                <abbr className="required" title="required">
                                  *
                                </abbr>
                                <span
                                  style={{
                                    color: "green",
                                    fontWeight: "900",
                                    marginLeft: "20px",
                                  }}
                                >
                                  ✔ Verified mobile number
                                </span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Phone Number"
                                required
                                readOnly
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-1 pb-2">
                          <label>
                            Street address
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="House number and street name"
                            required
                            value={doorNo}
                            onChange={(e) => setDoorNo(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Town / Region"
                            required
                            value={town}
                            onChange={(e) => setTown(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label>
                            City
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="City"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                        {/* <div className="form-group">
                        <label>
                          State
                          <abbr className="required" title="required">
                            *
                          </abbr>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="State"
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div> */}
                        <div className="select-custom">
                          <label>
                            County
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <select
                            name="orderby"
                            className="form-control"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="Bangladesh" selected>
                              Bangladesh
                            </option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label>
                            Postcode / ZIP
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={pincode}
                            onChange={(e) => {
                              const inputValue = e.target.value;

                              // Use inline if statement
                              /^\d{0,4}$/.test(inputValue)
                                ? setPincode(inputValue)
                                : console.log("Please enter only numbers");
                            }}
                            required
                            placeholder="Pincode"
                          />
                        </div>
                        <button
                          type="submit" // Change to type="submit"
                          className="btn btn-outline-primary-2"
                          style={{ float: "right" }}
                        >
                          {!loading ? (
                            <span>Add New Address</span>
                          ) : (
                            <span>Loading...</span>
                          )}
                        </button>
                      </div>{" "}
                    </form>
                  ) : (
                    <div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            Phone Number
                            <abbr className="required" title="required">
                              *
                            </abbr>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            required
                            value={phoneNumber}
                            readOnly={verificationStep === 2 ? true : false}
                            onChange={(e) => {
                              const inputValue = e.target.value;

                              // Use inline if statement
                              /^\d*$/.test(inputValue)
                                ? (setPhoneNumber(inputValue),
                                  setmobileNumberError(""))
                                : setmobileNumberError(
                                    "Please enter only numbers"
                                  );
                            }}
                          />
                        </div>
                        <span style={{ color: "red" }}>
                          {mobileNumberError}
                        </span>
                      </div>
                      {verificationStep === 2 && (
                        <>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                Verification Code
                                <abbr
                                  className="required"
                                  title="required"
                                ></abbr>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter verification code"
                                value={verificationCode}
                                onChange={(e) => {
                                  const inputValue = e.target.value;

                                  // Use inline if statement
                                  /^\d*$/.test(inputValue)
                                    ? (setVerificationCode(inputValue),
                                      setotpcodeError(""))
                                    : setotpcodeError(
                                        "Please enter only numbers"
                                      );
                                }}
                              />
                            </div>
                            <span style={{ color: "red" }}>{otpcodeError}</span>
                          </div>
                          {vloading ? (
                            <div className="buttonCenter">
                              <button className="btn btn-outline-primary-2">
                                Loading ...
                              </button>
                            </div>
                          ) : (
                            <div className="buttonCenter">
                              <button
                                onClick={verifyClicked}
                                className="btn btn-outline-primary-2"
                              >
                                Verify Code
                              </button>
                            </div>
                          )}
                        </>
                      )}
                      {verificationStep === 1 &&
                        (mloading ? (
                          <div className="buttonCenter">
                            <button className="btn btn-outline-primary-2">
                              Loading ...
                            </button>
                          </div>
                        ) : (
                          <div className="buttonCenter">
                            <button
                              onClick={sentVerificationcode}
                              className="btn btn-outline-primary-2"
                            >
                              Verify Number
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export const mapStateToProps = (state) => ({
  cartlist: state.cartlist.data,
});

export default connect(mapStateToProps, { ...cartAction })(Checkout);
