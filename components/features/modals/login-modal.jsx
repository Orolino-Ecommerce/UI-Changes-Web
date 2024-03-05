import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

import ALink from "~/components/features/alink";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(77,77,77,0.6)",
    zIndex: "9000",
  },
};

Modal.setAppElement("body");

function LoginModal() {
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

  return (
    <li className="login">
      <a href="#" onClick={openModal}>
        <i className="icon-user"></i>Login
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
                          <form action="#">
                            <div className="form-group">
                              <label htmlFor="singin-email-2">
                                Mobile or email address *
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="singin-email-2"
                                name="singin-email"
                                required
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="singin-password-2">
                                OTP *
                                <p
                                  style={{
                                    textAlign: "center",
                                    color: "#e74c3c",
                                  }}
                                >
                                  ( Check your email for OTP to shop from Oro
                                  Lino -Thanks!)
                                </p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="singin-password-2"
                                name="singin-password"
                                required
                              />
                            </div>

                            <div className="form-footer">
                              <button
                                type="submit"
                                style={{ margin: "auto" }}
                                className="btn btn-outline-primary-2"
                              >
                                <span>LOG IN</span>
                                <i className="icon-long-arrow-right"></i>
                              </button>

                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="signin-remember-2"
                                />
                              </div>
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
        </Modal>
      ) : (
        ""
      )}
    </li>
  );
}

export default LoginModal;
