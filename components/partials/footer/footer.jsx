import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { getCategory } from "~/core/requests";
import ALink from "~/components/features/alink";

function Footer() {
  const router = useRouter("");
  const [isBottomSticky, setIsBottomSticky] = useState(false);
  const [containerClass, setContainerClass] = useState("container");
  const category = localStorage.getItem("category");
  if (category && category != "undefined") {
    var LoCat = category;
  } else {
    localStorage.setItem("category", 1);
    var LoCat = 1;
  }
  const [getcat, setcat] = useState("");
  useEffect(() => {
    handleBottomSticky();
    setContainerClass(
      router.asPath.includes("fullwidth") ? "container-fluid" : "container"
    );
  }, [router.asPath]);

  useEffect(() => {
    window.addEventListener("resize", handleBottomSticky, { passive: true });
    return () => {
      window.removeEventListener("resize", handleBottomSticky);
    };
  }, []);
  useEffect(() => {
    getCategory(LoCat).then((res) => {
      setcat(res?.data?.data);
    });
  }, []);
  function handleBottomSticky() {
    setIsBottomSticky(
      router.pathname.includes("product/default") && window.innerWidth > 991
    );
  }

  return (
    <footer className="footer">
      <div className="footer-middle">
        <div className={containerClass}>
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="widget widget-about">
                <h4 className="widget-title">About Orolino</h4>
                <p>
                  Welcome to Oro Lino, a brand born in 2021 with a unique
                  vision: to transform the essence of linen into pure gold.
                </p>
                <h6 className="mb-4 contact-ftr">
                  <a href="tel:#">
                    <i className="icon-phone"></i>Call: +88 01329-668419
                  </a>
                </h6>
                <h5 className="widget-title">Trade License Number</h5>
                TRAD/DNCC005736/2022
                <div className="social-icons">
                  <a
                    href=" https://www.facebook.com/profile.php?id=100091343259804&mibextid=ZbWKwL"
                    className="social-icon"
                    title="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="icon-facebook-f"></i>
                  </a>
                  {/* <ALink href="#" className="social-icon" title="Twitter">
                    <i className="icon-twitter"></i>
                  </ALink> */}
                  <a
                    href="https://www.instagram.com/orolino.official/"
                    className="social-icon"
                    title="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="icon-instagram"></i>
                  </a>
                  {/* <ALink href="#" className="social-icon" title="Youtube">
                    <i className="icon-youtube"></i>
                  </ALink> */}
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="widget">
                <h4 className="widget-title">Useful Links</h4>

                <ul className="widget-list">
                  <li>
                    <ALink href={`/bd/${getcat}`}>Go to home</ALink>
                  </li>
                  <li>
                    <ALink href="/bd/about">About Orolino</ALink>
                  </li>
                  <li>
                    <ALink href={`/bd/shop/${getcat}/3cols`}>
                      How to shop on Orolino
                    </ALink>
                  </li>

                  <li>
                    <ALink href="/bd/contact">Contact us</ALink>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="widget">
                <h4 className="widget-title">Policies</h4>

                <ul className="widget-list">
                  <li>
                    <ALink href="/pages/disclaimer">Disclaimer</ALink>
                  </li>
                  <li>
                    <ALink href="/pages/tc">Terms & conditions</ALink>
                  </li>
                  <li>
                    <ALink href="/pages/rr">Return & Refund</ALink>
                  </li>
                  <li>
                    <ALink href="/pages/privacy">Privacy Policy</ALink>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="widget">
                <h4 className="widget-title">My Account</h4>

                <ul className="widget-list">
                  <li>
                    <ALink href={`/shop/sidebar/3cols`}>Shop</ALink>
                  </li>
                  <li>
                    <ALink href="/shop/dashboard">My Account</ALink>
                  </li>
                  <li>
                    <ALink href="/bd/cart">View Cart</ALink>
                  </li>
                  <li>
                    <ALink href="/bd/wishlist">My Wishlist</ALink>
                  </li>

                  <li>
                    <ALink href="/bd/contact">Help</ALink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <img className="img-fluid ssll-img" src="/images/ssllogo.jpg" />
        </div>
      </div>
      <div className="footer-bottom">
        <div
          style={{ paddingTop: "0px", paddingBottom: "15px" }}
          className={containerClass}
        >
          <p className="footer-copyright">
            Copyright © {new Date().getFullYear()} Orolino Store. All Rights
            Reserved.
          </p>
        </div>
      </div>
      {isBottomSticky ? <div className="mb-10"></div> : ""}
    </footer>
  );
}

export default React.memo(Footer);
