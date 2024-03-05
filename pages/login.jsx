import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { toast } from "react-toastify";
import ALink from "~/components/features/alink";
import { loginOtps, loginverifyOtps } from "~/core/requests";
import { useRouter } from "next/router";
import { SearchTrackGoogleAnalyticsEvent } from "~/pages/trackingevents";
const customStyles = {
  overlay: {
    backgroundColor: "rgba(77,77,77,0.6)",
    zIndex: "9000",
  },
};

Modal.setAppElement("body");

function Login({ onLogin }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  let timer;

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  });

  function closeModal() {
    document
      .getElementById("login-modal")
      .classList.remove("ReactModal__Content--after-open");

    if (document.querySelector(".ReactModal__Overlay")) {
      document.querySelector(".ReactModal__Overlay").style.opacity = "0";
    }

    timer = setTimeout(() => {
      setOpen(false);
    }, 350);
  }

  function openModal(e) {
    e.preventDefault();
    setOpen(true);
  }
  //login functionality
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [mobileError, setmobileError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value.trim();
    setEmail(enteredEmail);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(
      emailRegex.test(enteredEmail) ? "" : "Please enter a valid email address."
    );
  };
  const handlemobileChange = (e) => {
    const enteredMobile = e.target.value.trim();
    if (/^\d+$/.test(enteredMobile) || enteredMobile === "") {
      setMobile(enteredMobile);

      // Validate email
      const mobileNumberRegex = /^(?:\880|0)(?:\d{9}|\d{10})$/;
      setmobileError(
        mobileNumberRegex.test(enteredMobile)
          ? ""
          : "Please enter a valid mobile number."
      );
    }
  };
  const handleNameChange = (e) => {
    //const enteredName = e.target.value.trim();
    const enteredName = e.target.value;
    setName(enteredName);

    // Validate name
    setNameError(enteredName !== "" ? "" : "Please enter your name");
  };
  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;

    setPassword(enteredPassword);

    // Validate password
    setPasswordError(enteredPassword.length === 6 ? "" : "Enter a 6-digit OTP");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Email:", email);
    // console.log("Password:", password);
    if (name === "") {
      setNameError("Please enter your name");
      return;
    }
    // Validate mobile
    setmobileError("");

    // Validate mobile
    const mobileNumberRegex = /^(?:\880|0)(?:\d{9}|\d{10})$/;
    if (!mobileNumberRegex.test(mobile)) {
      setmobileError("Please enter a valid mobile number.");
      return;
    }
    setIsLoading(true);
    setCountdown(30);
    loginOtps(mobile, name).then((res) => {
      setOtpSent(true);
      setUsers(true);
      setIsLoading(false);
      //onLogin();
      console.log("test111", res);
    });
    // Call your login API with email and password values here
  };
  const handleVerify = (e) => {
    e.preventDefault();
    if (password === "") {
      setPasswordError("Please enter a 6-Digit OTP.");
      return;
    }
    setIsLoading(true);

    loginverifyOtps(mobile, password).then((res) => {
      // console.log("rr", res?.data);
      if (res?.data?.status === true) {
        const eventData = {
          event_name: "login",
          items: [
            {
              method: `SMS Login, Mobile Number : ${mobile}`,
            },
          ],
        };

        console.log("login eventData==========", eventData);
        SearchTrackGoogleAnalyticsEvent(eventData.event_name, eventData.items);
        setUsers(false);
        closeModal();
        const responseString = JSON.stringify(res?.data);
        localStorage.setItem("User", responseString);
        setEmail("");
        setMobile("");
        setPassword("");
        setIsLoading(false);
        toast.success(res?.data?.message);
        onLogin();
        router.reload();
      } else {
        toast.error(res?.data?.message);
        setIsLoading(false);
        // router.reload();
      }

      // console.log("test111", res);
    });
    // Call your login API with email and password values here
  };
  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
    setUsers(false);
    setEmail("");
    setMobile("");
    setPassword("");
    setIsLoading(false);
  };
  const [countdown, setCountdown] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      setIsResendDisabled(false);
    } else if (countdown === 0 && !isResendDisabled) {
      setIsResendDisabled(true);
    }

    return () => clearTimeout(timer);
  }, [countdown, isResendDisabled]);

  return (
    <li className="login">
      <a href="#" onClick={openModal}>
        <i className="icon-user mr-1"></i>
        <span>Login</span>
      </a>
      {open ? (
        <Modal
          isOpen={open}
          style={customStyles}
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
                <div className="form-tab">
                  <Tabs selectedTabClassName="show" defaultIndex={0}>
                    <TabList className="nav nav-pills nav-fill">
                      <Tab className="nav-item">
                        <span className="nav-link">Sign In</span>
                      </Tab>
                    </TabList>
                    <p style={{ textAlign: "center", color: "#231f20" }}>
                      Sign into your account via OroLino
                    </p>
                    <div className="tab-content">
                      <TabPanel style={{ paddingTop: "3rem" }}>
                        <div>
                          <form>
                            <div className="form-group">
                              <label htmlFor="singin-email-2">Name *</label>
                              <input
                                type="text"
                                className="form-control"
                                id="singin-name-2"
                                name="singin-name"
                                required
                                value={name}
                                onChange={handleNameChange}
                              />
                              {nameError && (
                                <div className="error-message">{nameError}</div>
                              )}
                            </div>
                            {/* <div className="form-group">
                              <label htmlFor="singin-email-2">
                                Email address *
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="singin-email-2"
                                name="singin-email"
                                required
                                value={email}
                                onChange={handleEmailChange}
                              />
                              {emailError && (
                                <div className="error-message">
                                  {emailError}{" "}
                                </div>
                              )}
                            </div> */}
                            <div className="form-group">
                              <label htmlFor="singin-email-2">
                                Mobile Number *
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="singin-email-2"
                                name="singin-email"
                                required
                                value={mobile}
                                onChange={handlemobileChange}
                              />
                              {mobileError && (
                                <div className="error-message">
                                  {mobileError}
                                </div>
                              )}
                            </div>
                            {users && (
                              <div className="form-group">
                                <label htmlFor="singin-password-2">
                                  OTP *
                                  <p
                                    style={{
                                      textAlign: "center",
                                      color: "#e74c3c",
                                    }}
                                  >
                                    ( Check your mobile number for OTP to shop
                                    from Oro Lino -Thanks!)
                                  </p>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="singin-password-2"
                                  name="singin-password"
                                  required
                                  value={password}
                                  onChange={handlePasswordChange}
                                />
                                {passwordError && (
                                  <div className="error-message">
                                    {passwordError}
                                  </div>
                                )}
                              </div>
                            )}

                            <div className="form-footer">
                              {users === false ? (
                                <button
                                  type="submit"
                                  onClick={handleSubmit}
                                  style={{ margin: "auto" }}
                                  className="btn btn-outline-primary-2"
                                  disabled={isLoading} // Disable the button while loading
                                >
                                  {isLoading ? (
                                    <span>
                                      <i className="fa fa-spinner fa-spin"></i>{" "}
                                      Loading...
                                    </span>
                                  ) : (
                                    <>
                                      <span>SEND OTP</span>
                                      <i className="icon-long-arrow-right"></i>
                                    </>
                                  )}
                                </button>
                              ) : (
                                <button
                                  type="submit"
                                  onClick={handleVerify}
                                  style={{ margin: "auto" }}
                                  className="btn btn-outline-primary-2"
                                  disabled={isLoading} // Disable the button while loading
                                >
                                  {isLoading ? (
                                    <span>
                                      <i className="fa fa-spinner fa-spin"></i>{" "}
                                      Loading...
                                    </span>
                                  ) : (
                                    <>
                                      <span>VERIFY OTP</span>
                                      <i className="icon-long-arrow-right"></i>
                                    </>
                                  )}
                                </button>
                              )}
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="signin-remember-2"
                                />
                              </div>
                              <button
                                type="submit"
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
                          </form>
                        </div>
                        <div>
                          {otpSent && countdown > 0 && (
                            <span>{`Resend OTP (${countdown}s)`}</span>
                          )}
                          {otpSent && countdown === 0 && (
                            <button
                              type="button"
                              onClick={handleSubmit}
                              className="btn btn-outline-primary-2"
                            >
                              Resend OTP
                            </button>
                          )}
                          {/* Your submit button */}
                        </div>
                      </TabPanel>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </li>
  );
}

export default Login;
