import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { getAddressList, getOrderList, getOverview } from "~/core/requests";
import ALink from "~/components/features/alink";
import PageHeader from "~/components/features/page-header";
import OrdersList from "~/pages/shop/orders-list";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { addAddressList } from "~/core/requests";
import AccountSidebar from "./account-sidebar";
function DashBoard() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doorNo, setDoorNo] = useState("");
  const [town, setTown] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const UserSaved = localStorage.getItem("User");
  const UserSavedobj = JSON.parse(UserSaved);
  const loggedUserId = UserSavedobj?.userId;
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const statusParam = queryParams.get("status");
    // console.log("statusParam", statusParam);
    if (statusParam == "true") {
      toast.success("Order placed successfully...!");
    }
    if (statusParam == "false") {
      toast.error("Order failed...!");
    }
  }, []);
  const [ShowAddressModal, setShowAddressModal] = useState(false);
  const [userSaved, setUserSaved] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [overview, setorderslist] = useState([]);
  const getUser = localStorage.getItem("User");
  const getUserParse = JSON.parse(getUser);
  const userId = getUserParse?.userId;
  useEffect(() => {
    getAddressList(userId).then((res) => {
      setAddressList(res?.data?.result);
      //   console.log("adddressList", res?.data?.result);
    });
    getOverview(userId).then((res) => {
      setorderslist(res?.data?.Data);
    });
  }, []);
  // console.log("overview", overview);
  function toOrder(e) {
    e.preventDefault();
    document
      .querySelector(
        ".nav-dashboard .react-tabs__tab-list .nav-item:nth-child(2)"
      )
      .click();
  }

  function toAddress(e) {
    e.preventDefault();
    document
      .querySelector(
        ".nav-dashboard .react-tabs__tab-list .nav-item:nth-child(4)"
      )
      .click();
  }

  function toAccount(e) {
    e.preventDefault();
    document
      .querySelector(
        ".nav-dashboard .react-tabs__tab-list .nav-item:nth-child(5)"
      )
      .click();
  }
  const logOutPage = () => {
    localStorage.removeItem("User");
    setUserSaved(false);
    localStorage.setItem("userSaved", "false");
    router.reload();
  };

  const handleModalShow = (e) => {
    e.preventDefault();
    setShowAddressModal(true);
  };
  const closeModal = () => {
    setShowAddressModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setloading(true);
    const data = {
      name: name,
      userId: loggedUserId,
      email: email,
      phoneNumber: phoneNumber,
      doorNo: doorNo,
      town: town,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
    };
    // console.log("submitted data", data);
    addAddressList(data).then((res) => {
      if (res?.data?.Code === 1) {
        toast.success(res?.data?.Message);
        setloading(false);
      } else {
        toast.error(res?.data?.Message);
        setloading(false);
      }
      // addressListcall();
      setShowAddressModal(false);
    });
  };
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
              <li className="breadcrumb-item active">My Account</li>
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
                      <h3 className="summary-title">Overview</h3>
                      <div className="flex row col-lg-12">
                        <div className="col-lg-3 cardblue">
                          {" "}
                          Total Orders <p>{overview?.overall}</p>{" "}
                        </div>
                        <div className="col-lg-3 cardblue">
                          {" "}
                          Total Completed <p>{overview?.completed}</p>
                        </div>
                        <div className="col-lg-3 cardblue">
                          Total Inprogress <p>{overview?.progress}</p>
                        </div>
                        <div className="col-lg-3 cardblue">
                          Total Return/Refud<p>{overview?.other}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tabs>
              </ul>
            </div>
          </div>
        </div>
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
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
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
                          <option value="Bangladesh">Bangladesh</option>
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
                          onChange={(e) => setPincode(e.target.value)}
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
                    </div>
                  </form>
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

export default React.memo(DashBoard);
