import React, { useState, useEffect } from "react";
import DateFormat from "~/core/DateFormat";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ALink from "~/components/features/alink";
import Modal from "react-modal";
import PageHeader from "~/components/features/page-header";
import {
  getTracker,
  returnProduct,
  getTrackerTimeline,
  getOrderList,
  getReturnDate,
} from "~/core/requests";
import AccountSidebar from "./account-sidebar";
function OrdersList() {
  const [showModalTrack, setshowModalTrack] = useState(false);
  const [showModalReturn, setshowModalReturn] = useState(false);
  const [showModalCancel, setshowModalCancel] = useState(false);
  const [showModalTimelineTrack, setshowModalTimelineTrack] = useState(false);
  const [TrackerValue, setTrackerValue] = useState([]);
  const [orderitem, setOrderItem] = useState([]);
  const [clikedStatus, setclikedStatus] = useState("");
  const [typeId, setTypeId] = useState("");
  const [notes, setNotes] = useState("");
  const [cancelnotes, setNotescancel] = useState("");
  const [canceltypeId, setCancelTypeId] = useState("");
  const [primId, setprimId] = useState("");
  const [loading, setloading] = useState(false);
  const [returnStatusInfo, setReturnStatusInfo] = useState({});
  const color = [
    "",
    "pink",
    "green",
    "secondary",
    "warning",
    "info",
    "dark",
    "purple",
    "maroon",
    "danger",
  ];
  const [orders, setorderslist] = useState([]);
  const getUser = localStorage.getItem("User");
  const getUserParse = JSON.parse(getUser);
  const userId = getUserParse?.userId;
  // getOrderList(userId).then((res) => {
  //   setorderslist(res?.data?.result);
  //   //   console.log("adddressList", res?.data?.result);
  // });
  useEffect(() => {
    if (!orders.length) {
      getOrderList(userId).then((res) => {
        setorderslist(res?.data?.result);
      });
    }
  }, [orders, userId]);

  // console.log("addresses", orders);
  const router = useRouter();
  const handleInvoiceDetailsClick = (ID) => {
    router.push(`/shop/invoice/${ID}`);
  };
  const fetchTrackerData = async (tid) => {
    // console.log("--------innnnnnnnnnn");
    getTracker(tid).then((res) => {
      // console.log("res=========", res.data.parcel);
      setTrackerValue(res.data.parcel);
    });
  };
  const clickTrackButton = (value, status) => {
    setshowModalTrack(true);
    // console.log("value--", value);
    // setTrackerValue("Track Your Oder : " + value);
    fetchTrackerData(value);
    setclikedStatus(status);
  };
  const clicktimelineButton = (o_id) => {
    setshowModalTimelineTrack(true);
    setloading(true);
    getTrackerTimeline(o_id).then((res) => {
      // console.log("resddd==================", res?.data?.Data);
      setOrderItem(res?.data?.Data);
      setloading(false);
    });
  };
  const closeTimelineModal = () => {
    setshowModalTimelineTrack(false);
  };
  const clickReturnButton = (id) => {
    setprimId(id);
    setshowModalReturn(true);
  };
  const closeModal = () => {
    setshowModalTrack(false);
  };
  const closeCancelModal = () => {
    setshowModalCancel(false);
  };

  const handleCancel = () => {
    setshowModalReturn(false);
  };
  const clickCancelButton = (id) => {
    setprimId(id);
    setshowModalCancel(true);
  };
  const handleCancelCancel = () => {
    setshowModalCancel(false);
  };
  const handleCancelSelectChange = (event) => {
    setCancelTypeId(event.target.value);
  };
  const handleCancelNotesSelectChange = (event) => {
    setNotescancel(event.target.value);
  };
  const handleCancelSubmit = () => {
    // console.log(primId, typeId, notes);
    setloading(true);
    returnProduct(primId, canceltypeId, cancelnotes, 6).then((res) => {
      // console.log("res========", res);
      if (res?.data?.Code === 1) {
        toast.success(res?.data?.Message);
        setloading(false);
      } else {
        toast.error(res?.data?.Message);
        setloading(false);
      }
    });
    setshowModalReturn(false);
    const url = `/`;
    router.push(url);
  };
  const handleSubmit = () => {
    // console.log(primId, typeId, notes);
    setloading(true);
    returnProduct(primId, typeId, notes, 12).then((res) => {
      // console.log("res========", res);
      if (res?.data?.Code === 1) {
        toast.success(res?.data?.Message);
        setloading(false);
      } else {
        toast.error(res?.data?.Message);
        setloading(false);
      }
    });
    setshowModalReturn(false);
    const url = `/`;
    router.push(url);
  };
  const handleSelectChange = (event) => {
    setTypeId(event.target.value);
  };
  const handleNotesSelectChange = (event) => {
    setNotes(event.target.value);
  };
  if (!orders) {
    <div style={{ textAlign: "-webkit-center" }}>
      <img src={"/images/loader.gif"} style={{ width: "300px" }} />{" "}
    </div>;
  }
  useEffect(() => {
    // Fetch return dates for all orders
    orders?.forEach(async (ord) => {
      try {
        const res = await getReturnDate(ord?.o_id);
        const data = res?.data?.Data;
        setReturnStatusInfo((prevInfo) => ({
          ...prevInfo,
          [ord?.o_id]: data,
        }));
      } catch (error) {
        console.error("Error fetching return date:", error);
      }
    });
  }, [orders]);
  console.log("--------innnnnnnnnnn", orders);
  return (
    <>
      <div className="main">
        <PageHeader title="My Account" subTitle="Shop" />
        <nav className="breadcrumb-nav mb-3">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <ALink href="/">Home</ALink>
              </li>
              <li className="breadcrumb-item">
                <ALink href="/shop/sidebar/list">Shop</ALink>
              </li>
              <li className="breadcrumb-item active">Orders</li>
            </ol>
          </div>
        </nav>

        <div className="page-content">
          <div className="dashboard">
            <div className="container">
              <ul
                className="nav nav-dashboard flex-column mb-3 mb-md-0"
                role="tablist"
              >
                <Tabs selectedTabClassName="active show">
                  <div className="row">
                    <aside className="col-md-4 col-lg-3 mb-md-0 mb-2">
                      <AccountSidebar />
                    </aside>

                    <div
                      className="col-md-8 col-lg-9"
                      style={{ marginTop: "1rem" }}
                    >
                      <h3 className="summary-title">Your Orders</h3>
                      {orders?.length === 0 ? (
                        <p>No addresses added yet.</p>
                      ) : (
                        <ul>
                          {orders?.map((ord, index) => {
                            console.log(
                              "-------------",
                              returnStatusInfo[ord?.o_id]
                            );
                            return (
                              <li key={index} className="summary address-item">
                                <div className="address-details">
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div style={{ flex: 1 }}>
                                      <p>
                                        <b>INVOICE NO </b> : #{ord?.order_code}
                                      </p>
                                      <p>
                                        <b>ORDER PLACED</b> :
                                        {DateFormat(ord.order_date)}
                                      </p>

                                      <p>
                                        <b>TOTAL </b>: {"\u09F3 "}{" "}
                                        {ord?.order_totalamount}{" "}
                                      </p>

                                      <p>
                                        <b>SHIP TO</b> :
                                        <span
                                          title={`${ord?.user_delivery_address?.name}, ${ord?.user_delivery_address?.address}, ${ord?.user_delivery_address?.city}, ${ord?.user_delivery_address?.postal_code}`}
                                          className="ship-to"
                                        >
                                          {ord?.user_delivery_address?.name}
                                        </span>
                                      </p>
                                      {ord?.waybill ? (
                                        <>
                                          <button
                                            type="submit" // Change to type="submit"
                                            className="btn btn-outline-primary-2"
                                            onClick={() =>
                                              clickTrackButton(
                                                ord?.waybill,
                                                ord?.OrderStatus?.name
                                              )
                                            }
                                          >
                                            <span>Track your Shipment</span>
                                          </button>
                                          <br></br>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      {ord?.order_status === 5 &&
                                      returnStatusInfo[ord?.o_id] === true ? (
                                        <>
                                          <button
                                            type="submit" // Change to type="submit"
                                            className="btn btn-outline-primary-2 "
                                            style={{ marginTop: "5px" }}
                                            onClick={() =>
                                              clickReturnButton(ord?.o_id)
                                            }
                                          >
                                            <span>Return Order</span>
                                          </button>
                                          <br></br>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      {ord?.order_status < 5 ? (
                                        <button
                                          type="submit" // Change to type="submit"
                                          className="btn btn-outline-primary-2"
                                          style={{ marginTop: "5px" }}
                                          onClick={() =>
                                            clickCancelButton(ord?.o_id)
                                          }
                                        >
                                          <span>Cancel Order</span>
                                        </button>
                                      ) : (
                                        ""
                                      )}
                                    </div>

                                    <div>
                                      {ord?.OrderStatus?.name ? (
                                        <label
                                          style={{
                                            paddingRight: "20px",
                                            background: "#d4e5e3",
                                            border: "1px dashed #ccc",
                                            paddingLeft: "20px",
                                          }}
                                        >
                                          {ord?.OrderStatus?.name}
                                        </label>
                                      ) : (
                                        ""
                                      )}
                                      <br />
                                      <button
                                        type="submit"
                                        className="btn btn-outline-primary-2"
                                        style={{ marginTop: "5px" }}
                                        onClick={() =>
                                          clicktimelineButton(ord?.o_id)
                                        }
                                      >
                                        <span>Track Order </span>
                                      </button>

                                      <br />
                                      <ALink
                                        href={`/shop/invoice/${ord?.o_id}`}
                                      >
                                        Invoice Details
                                      </ALink>
                                      <br></br>
                                      {/* <button onClick={() => handleDownloadClick(ord)}>
                      Download
                    </button> */}
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                </Tabs>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {showModalTimelineTrack ? (
        <Modal
          isOpen={open}
          contentLabel="login Modal"
          className="modal-dialog"
          overlayClassName="d-flex align-items-center justify-content-center"
          id="login-modal"
          onRequestClose={closeTimelineModal}
          closeTimeoutMS={10}
        >
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                onClick={closeTimelineModal}
              >
                <span aria-hidden="true">
                  <i className="icon-close"></i>
                </span>
              </button>
              <div className="form-box">
                <h5 className="text-center">Order Status</h5>

                <div className="">
                  <div className="timeline">
                    <ul>
                      {!loading ? (
                        orderitem.map((res, index) => {
                          const status = res.order_status;
                          const timestamp = res.status_date;
                          const date = new Date(timestamp).toLocaleDateString();
                          const time = new Date(timestamp).toLocaleTimeString();

                          return (
                            <li key={index}>
                              <div className={`bullet ${color[status]}`}></div>
                              <div className="time">
                                {DateFormat(res?.status_date)}
                                <br />

                                <b>{time}</b>
                              </div>
                              <div className="desc">
                                <h3>{res.orderStatus?.name}</h3>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <div style={{ textAlign: "-webkit-center" }}>
                          <img
                            src={"/images/loader.gif"}
                            style={{ width: "300px" }}
                          />{" "}
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
      {showModalTrack ? (
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
                {TrackerValue?.tracking_id ? (
                  <div className=" form-group">
                    <h4 className="text-center">Order Status</h4>
                    <div className="row col-12 col-xl-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="col-5 col-xl-5 col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        Tracking ID
                      </div>
                      <div className="col-2 col-xl-2 col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        :
                      </div>
                      <div className="col-5 col-xl-5 col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        {TrackerValue?.tracking_id}
                      </div>
                    </div>
                    <div className="row col-12 col-xl-12 col-xs-12 col-sm-12 col-lg-12 col-lg-12">
                      <div className="col-5 col-xl-5 col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        Merchant Invoice ID
                      </div>
                      <div className="col-2 col-xl-2 col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        :
                      </div>
                      <div className="col-5 col-xl-5 col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        {TrackerValue?.merchant_invoice_id}
                      </div>
                    </div>
                    <div className="row col-12 col-xl-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="col-5 col-xl-5 col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        Created At
                      </div>
                      <div className="col-2 col-xl-2 col-xs-2 col-sm-5 col-md-2 col-lg-2">
                        :
                      </div>
                      <div className="col-5 col-xl-5 col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        {DateFormat(TrackerValue?.created_at)}
                      </div>
                    </div>
                    <div className="row col-12 col-xl-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="col-5 col-xl-5 col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        Order Status
                      </div>
                      <div className="col-2 col-xl-2 col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        :
                      </div>
                      <div className="col-5 col-xl-5 col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        {TrackerValue?.status
                          ? TrackerValue?.status
                          : clikedStatus}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "-webkit-center" }}>
                    <img
                      src={"/images/loader.gif"}
                      style={{ width: "300px" }}
                    />{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
      {showModalReturn ? (
        <Modal
          isOpen={open}
          contentLabel="login Modal"
          className="modal-dialog"
          overlayClassName="d-flex align-items-center justify-content-center"
          id="login-modal"
          onRequestClose={handleCancel}
          closeTimeoutMS={10}
        >
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" onClick={handleCancel}>
                <span aria-hidden="true">
                  <i className="icon-close"></i>
                </span>
              </button>
              <div className="form-box">
                <div className=" form-group">
                  <h4 className="text-center">Return Details</h4>
                  <div className="row col-lg-12">
                    <div className=" col-lg-12">Reason *</div>

                    <div className=" col-lg-12">
                      <select
                        className="form-control"
                        onChange={handleSelectChange}
                        value={typeId}
                      >
                        <option value="Size not matched">
                          Size not matched
                        </option>
                        <option value="Colour not matched">
                          Colour not matched
                        </option>
                        <option value="Damaged product">Damaged product</option>
                      </select>
                    </div>
                  </div>
                  <div className="row col-lg-12">
                    <div className=" col-lg-12">Notes</div>

                    <div className=" col-lg-12">
                      <textarea
                        className="form-control"
                        onChange={handleNotesSelectChange}
                      >
                        {" "}
                      </textarea>
                    </div>
                  </div>
                  <div className="mt-3 row col-lg-12 text-center">
                    <div className=" col-lg-6">
                      <button
                        onClick={handleCancel}
                        style={{
                          margin: "auto",
                          borderColor: "#8d8282",
                        }}
                        className="btn btn-outline-primary-1"
                      >
                        CANCEL
                      </button>
                    </div>

                    <div className=" col-lg-6">
                      {!loading ? (
                        <button
                          onClick={handleSubmit}
                          className="btn btn-outline-primary-2"
                        >
                          SUBMIT
                        </button>
                      ) : (
                        <button className="btn btn-outline-primary-2">
                          LOADING...
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
      {showModalCancel ? (
        <Modal
          isOpen={open}
          contentLabel="login Modal"
          className="modal-dialog"
          overlayClassName="d-flex align-items-center justify-content-center"
          id="login-modal"
          onRequestClose={closeCancelModal}
          closeTimeoutMS={10}
        >
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                onClick={closeCancelModal}
              >
                <span aria-hidden="true">
                  <i className="icon-close"></i>
                </span>
              </button>
              <div className="form-box">
                <div className=" form-group">
                  <h4 className="text-center">Cancel Details</h4>
                  <div className="row col-lg-12">
                    <div className=" col-lg-12">Reason *</div>

                    <div className=" col-lg-12">
                      <select
                        className="form-control"
                        onChange={handleCancelSelectChange}
                        // value={typeId}
                      >
                        <option value="Mind Changed">Mind Changed</option>
                        <option value="Wrong Item Ordered">
                          Wrong Item Ordered
                        </option>
                        <option value="Duplicate Order">Duplicate Order</option>
                      </select>
                    </div>
                  </div>
                  <div className="row col-lg-12">
                    <div className=" col-lg-12">Notes</div>

                    <div className=" col-lg-12">
                      <textarea
                        className="form-control"
                        onChange={handleCancelNotesSelectChange}
                      >
                        {" "}
                      </textarea>
                    </div>
                  </div>
                  <div className="mt-3 row col-lg-12 text-center">
                    <div className=" col-lg-6">
                      <button
                        onClick={handleCancelCancel}
                        style={{
                          margin: "auto",
                          borderColor: "#8d8282",
                        }}
                        className="btn btn-outline-primary-1"
                      >
                        CANCEL
                      </button>
                    </div>

                    <div className=" col-lg-6">
                      {!loading ? (
                        <button
                          onClick={handleCancelSubmit}
                          className="btn btn-outline-primary-2"
                        >
                          SUBMIT
                        </button>
                      ) : (
                        <button className="btn btn-outline-primary-2">
                          LOADING...
                        </button>
                      )}
                    </div>
                  </div>
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

export default React.memo(OrdersList);
