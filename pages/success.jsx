import React, { useState, useEffect } from "react";
import ALink from "~/components/features/alink";
import { useRouter } from "next/router";
import { getTransactionDetails } from "~/core/requests";
import { PurchaseTrackGoogleAnalyticsEvent } from "~/pages/trackingevents";
function SuccessPage() {
  const router = useRouter();

  return (
    <div className="main">
      <div
        className="text-center py-15  "
        style={{
          paddingTop: "10rem",
          paddingBottom: "10rem",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <img
            src="images/backgrounds/tick.webp"
            width="150"
            height="150"
            style={{ display: "block", margin: "0 auto" }}
          />
          <h1 className="error-title  " style={{ color: "#41af3d" }}>
            Success
          </h1>

          <p className="mb-5">Your order has been placed successfully ...!</p>
          <ALink href="/" className="btn btn-outline-primary-2 btn-minwidth-lg">
            <span>BACK TO HOMEPAGE</span>
            <i className="icon-long-arrow-right"></i>
          </ALink>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SuccessPage);
