import React, { useEffect, useState } from "react";
import ALink from "~/components/features/alink";
import { useRouter } from "next/router";
function AccountSidebar() {
  const router = useRouter();
  const [userSaved, setUserSaved] = useState(false);
  const logOutPage = () => {
    localStorage.removeItem("User");
    setUserSaved(false);
    localStorage.setItem("userSaved", "false");
    router.push("/");
  };
  // console.log("router----------",router)
  return (
    <div>
      <div
        className={`nav-item ${
          router.pathname === "/shop/dashboard" ? "active" : ""
        }`}
      >
        <ALink href="/shop/dashboard/" className="nav-link">
          Dashboard
        </ALink>
      </div>

      <div
        className={`nav-item ${
          router.pathname === "/shop/orders-list" ? "active" : ""
        }`}
      >
        <ALink href="/shop/orders-list/" className="nav-link">
          Orders
        </ALink>
      </div>

      <div
        className={`nav-item ${
          router.pathname === "/shop/account-address" ? "active" : ""
        }`}
      >
        <ALink href="/shop/account-address/" className="nav-link">
          Addresses
        </ALink>
      </div>

      <div className="nav-item">
        <ALink href="/shop/cart/" className="nav-link">
          My Cart
        </ALink>
      </div>

      <div className="nav-item">
        <div
          className="nav-link"
          onClick={logOutPage} // Attach the onClick event to the div
        >
          Sign Out
        </div>
      </div>
    </div>
  );
}
export default React.memo(AccountSidebar);
