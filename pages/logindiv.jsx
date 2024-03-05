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

function Logindiv({ handleLoginclose }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  let timer;

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

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
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [users, setUsers] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [mobileError, setmobileError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };
  const validateMobile = () => {
    const emailRegex = /^(?:\880|0)(?:\d{9}|\d{10})$/;
    if (!emailRegex.test(mobile)) {
      setmobileError("Please enter a valid mobile number.");
      return false;
    } else {
      setmobileError("");
      return true;
    }
  };
  const validateName = () => {
    if (name.trim() === "") {
      setNameError("Please enter your name");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

  const validatePassword = () => {
    if (password.length !== 6) {
      setPasswordError("Enter a 6 digit OTP");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateName() || !validateMobile()) {
      return;
    }

    setIsLoading(true);
    setCountdown(30);
    loginOtps(mobile, name).then((res) => {
      setOtpSent(true);
      setUsers(true);
      setIsLoading(false);
    });
  };
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

      // Validate mobile number
      const mobileNumberRegex = /^(?:\+880|0)(?:\d{9}|\d{10})$/;
      setmobileError(
        mobileNumberRegex.test(enteredMobile) || enteredMobile === ""
          ? ""
          : "Please enter a valid mobile number."
      );
    }
  };
  const handleVerify = (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    setIsLoading(true);
    // handleLoginclose();
    loginverifyOtps(mobile, password).then((res) => {
      if (res?.data?.status === true) {
        setUsers(false);
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
        const responseString = JSON.stringify(res?.data);
        localStorage.setItem("User", responseString);
        setEmail("");
        setMobile("");
        setPassword("");
        setIsLoading(false);
        toast.success(res?.data?.message);
        console.log("msg", res?.data?.message);
        router.reload();
      } else {
        toast.error(res?.data?.message);
        console.log("msg-else", res?.data?.message);
        setIsLoading(false);
      }
    });
  };

  // const handleCancel = (e) => {
  //   e.preventDefault();

  //   setUsers(false);
  //   setEmail("");
  //   setPassword("");
  //   setIsLoading(false);
  // };
  const handleClear = (e) => {
    e.preventDefault();

    setUsers(false);
    setEmail("");
    setName("");
    setMobile("");
    setPassword("");
    setEmailError("");
    setNameError("");
    setPasswordError("");
    setIsLoading(false);
  };
  const handleCancel = (e) => {
    router.push("/shop/sidebar/list/");
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
                    <label htmlFor="singin-name-2">Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="singin-name-2"
                      name="singin-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={validateName}
                    />
                    {nameError && (
                      <div className="error-message">{nameError}</div>
                    )}
                  </div>
                  {/* <div className="form-group">
                    <label htmlFor="singin-email-2">Email address *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="singin-email-2"
                      name="singin-email"
                      required
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={validateEmail}
                    />
                    {emailError && (
                      <div className="error-message">{emailError}</div>
                    )}
                  </div> */}
                  <div className="form-group">
                    <label htmlFor="singin-email-2">Mobile Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="singin-email-2"
                      name="singin-email"
                      required
                      value={mobile}
                      onChange={handlemobileChange}
                      onBlur={validateEmail}
                    />
                    {mobileError && (
                      <div className="error-message">{mobileError}</div>
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
                          ( Check your mobile number for OTP to shop from Oro
                          Lino -Thanks!)
                        </p>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="singin-password-2"
                        name="singin-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={validatePassword}
                      />
                      {passwordError && (
                        <div className="error-message">{passwordError}</div>
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
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span>
                            <i className="fa fa-spinner fa-spin"></i> Loading...
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
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span>
                            <i className="fa fa-spinner fa-spin"></i> Loading...
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
                      onClick={handleClear}
                      style={{
                        margin: "auto",
                        borderColor: "#8d8282",
                      }}
                      className="btn btn-outline-primary-1"
                    >
                      CLEAR
                    </button>
                    <button
                      //type="submit"
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
  );
}

export default Logindiv;
