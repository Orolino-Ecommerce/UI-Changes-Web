import React, { useState, useEffect } from "react";
import ALink from "~/components/features/alink";
import { useRouter } from "next/router";
import { getTransactionDetails } from "~/core/requests";
import { PurchaseTrackGoogleAnalyticsEvent } from "~/pages/trackingevents";
import { trackCustomEvent } from "~/core/FBevents";
function SuccessPage() {
  const router = useRouter();
  const { page } = router.query;
  const [data, setdata] = useState([]);
  useEffect(() => {
    getTransactionDetails(page).then((res) => {
      setdata(res?.data?.result);
    });
  }, []);
  console.log("data====", data);
  useEffect(() => {
    const eventDatasOn = {
      event_name: "purchase",
      transaction_id: page,
      currency: "BDT",
      value: data?.order_totalamount,
      items: data?.orderitems?.map((cartItem) => {
        return {
          product_id: cartItem.orderitem_productid,
          product_code: cartItem?.product?.product_code,
          product_name: cartItem?.product?.product_name,
          subcategory: cartItem?.subcategory,
          product_variant_prices: [
            {
              product_variant_size_detail:
                cartItem?.product_variant_price?.product_variant_size_detail,
              product_color_code:
                cartItem?.product_variant_price?.product_color_code,
              product_variant_price_mrp: cartItem?.orderitem_amount,
            },
          ],
        };
      }),
    };

    console.log("eventData==========", eventDatasOn);
    PurchaseTrackGoogleAnalyticsEvent(
      eventDatasOn.event_name,
      eventDatasOn.transaction_id,

      eventDatasOn.currency,
      eventDatasOn.value,
      eventDatasOn.items
    );
    const commonEventData = {
      content_ids: "0001",
      content_name: "Successfull Purchase",
      content_type: "Purchase",
      currency: "BDT",
      num_items: 2,
      value: data?.order_totalamount,
      contents: data?.orderitems?.map((cartItem) => {
        return {
          product_id: cartItem.orderitem_productid,
          product_code: cartItem?.product?.product_code,
          product_name: cartItem?.product?.product_name,
          subcategory: cartItem?.subcategory,
          product_variant_prices: [
            {
              product_variant_size_detail:
                cartItem?.product_variant_price?.product_variant_size_detail,
              product_color_code:
                cartItem?.product_variant_price?.product_color_code,
              product_variant_price_mrp: cartItem?.orderitem_amount,
            },
          ],
        };
      }),
    };
    trackCustomEvent("pixel_purchase", commonEventData);
  }, [data]);

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
