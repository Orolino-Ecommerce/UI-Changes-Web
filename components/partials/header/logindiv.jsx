import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { toast } from "react-toastify";
import ALink from "~/components/features/alink";
import { emailOtps, verifyOtps } from "~/core/requests";
import { useRouter } from "next/router";
const customStyles = {
  overlay: {
    backgroundColor: "rgba(77,77,77,0.6)",
    zIndex: "9000",
  },
};

Modal.setAppElement("body");

function Logindiv({ onLogin }) {
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
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }
  };
  const handleNameChange = (e) => {
    if (e.target.value != "") {
      setName(e.target.value);
      setNameError("");
    } else {
      setNameError("Please enter your name");
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length != 4) {
      setPasswordError("Enter a 4 digit password");
      return;
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Email:", email);
    // console.log("Password:", password);
    if (name === "") {
      setNameError("Please enter your name");
      return;
    }
    // Validate email
    setEmailError("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);

    emailOtps(email, name).then((res) => {
      setUsers(true);
      setIsLoading(false);
      //onLogin();
      // console.log("test111", res);
    });
    // Call your login API with email and password values here
  };
  const handleVerify = (e) => {
    e.preventDefault();
    if (password === "") {
      setPasswordError("Please enter a password.");
      return;
    }
    setIsLoading(true);

    verifyOtps(email, password).then((res) => {
      // console.log("rr", res?.data);
      if (res?.data?.status === true) {
        setUsers(false);
        closeModal();
        const responseString = JSON.stringify(res?.data);
        localStorage.setItem("User", responseString);
        setEmail("");
        setPassword("");
        setIsLoading(false);
        toast.success(res?.data?.message);
        onLogin();
        router.reload();
      } else {
        toast.error(res?.data?.message);
        setIsLoading(false);
        router.reload();
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
    setPassword("");
    setIsLoading(false);
  };
  return (
    <li className="login">
      <a href="#" onClick={openModal}>
        <i className="icon-user"></i>Login
      </a>

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
                        <div className="form-group">
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
                            <div className="error-message">{emailError} </div>
                          )}
                        </div>

                        {users && (
                          <div className="form-group">
                            <label htmlFor="singin-password-2">
                              OTP *{" "}
                              <p
                                style={{
                                  textAlign: "center",
                                  color: "#e74c3c",
                                }}
                              >
                                ( Check your email for OTP to shop from Oro Lino
                                -Thanks!)
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
                  </TabPanel>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Logindiv;
