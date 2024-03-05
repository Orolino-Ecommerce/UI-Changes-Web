import React, { useEffect, useState } from "react";
import { getOrderView } from "~/core/requests";
import AmountInWords from "~/core/NumberToWords";
import { GetColorName } from "hex-color-to-color-name";
import DateFormat from "~/core/DateFormat";
import ALink from "~/components/features/alink";
import { useRouter } from "next/router";
import numberToWords from "number-to-words";
function ShopInvoice() {
  const [ordersInfo, setordersInfo] = useState([]);
  const slug = useRouter().query.orderinvoice;

  useEffect(() => {
    getOrderView(slug).then((res) => {
      setordersInfo(res?.data?.result);
      // console.log("info", res?.data?.result);
    });
  }, []);
  const vatRate = 7.5 / 100;
  return (
    <div className="container form-group">
      <div
        className="col-md-11 no_padding"
        style={{
          margin: "0px auto",
          float: "none",
          textAlign: "center",
        }}
      >
        <ALink
          href={"/shop/dashboard"}
          className="btn btn-outline-primary-2"
          style={{ float: "right", margin: "25px" }}
        >
          <span>GO BACK</span>
          <i className="icon-long-arrow-right"></i>
        </ALink>

        <table
          style={{
            fontSize: "14px",
            width: "100%",
            border: "1px solid #000",
          }}
        >
          <tbody>
            <tr>
              <td
                className="col-md-12 no_padding"
                style={{
                  padding: "0px",
                  width: "100%",
                }}
              >
                <div
                  className="col-md-3 col-sm-3 col-xs-3"
                  style={{
                    float: "left",
                    padding: "5px",
                  }}
                >
                  <div
                    className="col-md-12 "
                    style={{
                      // width: "30%",
                      float: "left",
                      padding: "1px",
                    }}
                  >
                    <img src="/images/home/logo.webp" />
                  </div>
                </div>
                <div
                  className="col-md-6 pt-5 col-sm-6 col-xs-6"
                  style={{
                    width: "50%",
                    float: "left",
                    padding: "5px",
                  }}
                >
                  <h3>GOLDBERG TRADING CO.</h3>
                  <p>
                    House # 71, Lake Drive Road, Sector # 7, Uttara, Dhaka-1230.
                  </p>
                  <p>VAT Registration No: 002555799-0103</p>
                  <p>E-mail: info@oro-lino.com</p>
                  <p>Whatsapp: +880-1719950936</p>
                </div>
                <div
                  className="col-md-3 col-sm-3 col-xs-3"
                  style={{
                    float: "left",
                    padding: "5px",
                  }}
                >
                  <div
                    className="col-md-12 "
                    style={{
                      float: "left",
                      padding: "1px",
                    }}
                  >
                    <img src="/images/home/artlogo.webp" />
                  </div>
                  <div
                    className="col-md-12 "
                    style={{
                      float: "left",
                      padding: "1px",
                    }}
                  >
                    Mushak-6.3
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  className="col-md-12 no_padding"
                  style={{ paddingBottom: "10px" }}
                >
                  <p
                    className="col-md-12 no_padding"
                    style={{
                      textAlign: "center",
                      fontSize: "25px",
                      fontWeight: "900",
                    }}
                  >
                    Invoice
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td
                className="col-md-12 no_padding"
                style={{
                  borderTop: "1px solid #000",
                  padding: "0px",
                  width: "100%",
                }}
              >
                <div
                  className="col-md-4 col-sm-4 col-xs-4  "
                  style={{
                    float: "left",
                    borderRight: "1px solid #000",
                    padding: "5px",
                  }}
                >
                  <div
                    className="pad_5"
                    style={{ fontSize: "13px", textAlign: "left" }}
                  >
                    Invoice No:
                    <br />
                    <b>{ordersInfo?.order_code}</b>
                    <br />
                  </div>
                </div>
                <div
                  className="col-md-4 col-sm-4 col-xs-4 "
                  style={{
                    float: "left",
                    borderRight: "1px solid #000",
                    padding: "5px",
                  }}
                >
                  <div
                    className="pad_5"
                    style={{ fontSize: "13px", textAlign: "left" }}
                  >
                    Date
                    <br />
                    <b> {DateFormat(ordersInfo?.order_date)}</b>
                    <br />
                  </div>
                </div>
                <div
                  className="col-md-4 col-sm-4 col-xs-4 col-4"
                  style={{ float: "left", padding: "5px" }}
                >
                  <div
                    className="pad_5"
                    style={{ fontSize: "13px", textAlign: "left" }}
                  >
                    Mode/Terms of Payment
                    <br />
                    <b>
                      {ordersInfo?.order_paymentmode === "1"
                        ? "Pay On Delivery"
                        : "Online Payment"}
                    </b>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td
                className="col-md-12 no_padding"
                style={{ textAlign: "left" }}
              >
                <div
                  className="col-md-12 "
                  style={{
                    textAlign: "left",
                    width: "100%",
                    float: "left",
                    padding: "5px",
                    borderBottom: "1px solid #000",
                    borderTop: "1px solid #000",
                  }}
                >
                  <div className="col-md-12 pad_5" style={{ fontSize: "13px" }}>
                    <h6>Billing Address</h6>
                    <span>{ordersInfo?.user_delivery_address?.name} </span>
                    <span>{ordersInfo?.user_delivery_address?.address_1},</span>
                    <span> {ordersInfo?.user_delivery_address?.address_2}</span>
                    <span>{ordersInfo?.user_delivery_address?.city},</span>
                    <span>{ordersInfo?.user_delivery_address?.state}</span>
                    <span>{ordersInfo?.user_delivery_address?.country},</span>
                    <span>{ordersInfo?.user_delivery_address?.pincode}</span>
                  </div>
                </div>
                <div
                  className="col-md-12 no_padding"
                  style={{
                    padding: "5px",
                    width: "100%",
                    float: "left",
                    borderBottom: "1px solid #000",
                  }}
                >
                  <div className="col-md-12 pad_5" style={{ fontSize: "13px" }}>
                    <h6>Delivery Address</h6>
                    <span>{ordersInfo?.user_delivery_address?.name} </span>
                    <span>{ordersInfo?.user_delivery_address?.address_1},</span>
                    <span> {ordersInfo?.user_delivery_address?.address_2}</span>
                    <span>{ordersInfo?.user_delivery_address?.city},</span>
                    <span>{ordersInfo?.user_delivery_address?.state}</span>
                    <span>{ordersInfo?.user_delivery_address?.country},</span>
                    <span>{ordersInfo?.user_delivery_address?.pincode}</span>
                  </div>
                </div>
                <div
                  className="col-md-12 no_padding"
                  style={{
                    padding: "5px",
                    width: "100%",
                    float: "left",
                  }}
                >
                  <div className="col-md-12 pad_5" style={{ fontSize: "13px" }}>
                    <span>
                      Contact : {ordersInfo?.user_delivery_address?.phonenumber}{" "}
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          style={{
            fontSize: "14px",
            width: "100%",
            textAlign: "center",
            borderRight: "1px solid #000",
            borderLeft: "1px solid #000",

            borderBottom: "none",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "3px",
                  fontWeight: "900",
                  borderRight: "1px solid #000",
                }}
              >
                SI.No
              </th>
              <th
                style={{
                  padding: "3px",
                  fontWeight: "900",
                  borderRight: "1px solid #000",
                }}
              >
                Description
              </th>

              <th
                style={{
                  padding: "3px",
                  fontWeight: "900",
                  borderRight: "1px solid #000",
                }}
              >
                Quantity
              </th>
              <th
                style={{
                  padding: "3px",
                  fontWeight: "900",
                  borderRight: "1px solid #000",
                }}
              >
                Rate
              </th>

              <th
                style={{
                  padding: "3px",
                  fontWeight: "900",
                }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {ordersInfo?.orderitems?.map((item, i) => {
              return (
                <tr key={i}>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "3px",
                    }}
                  >
                    {" "}
                    {i + 1}
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "3px",
                    }}
                  >
                    <p style={{ margin: "0px", textAlign: "left" }}>
                      {" "}
                      {item?.product?.product_name}
                      <br />
                      <div
                        style={{ marginBottom: "0px" }}
                        className="details-filter-row details-row-size"
                      >
                        <label
                          style={{
                            fontSize: "12px",
                            color: "rgb(158 154 154)",
                          }}
                        >
                          Style No :
                        </label>
                        <div className=" ">
                          <span className="active" style={{ fontSize: "14px" }}>
                            {item?.product?.product_code}
                          </span>
                        </div>
                      </div>
                      <div
                        style={{ marginBottom: "0px" }}
                        className="details-filter-row details-row-size"
                      >
                        <label
                          style={{
                            fontSize: "12px",
                            color: "rgb(158 154 154)",
                          }}
                        >
                          Color :
                        </label>
                        <div className="">
                          <span
                            className="active"
                            style={{
                              fontSize: "14px",
                            }}
                          >
                            {
                              item?.product_variant_price
                                ?.product_variant_option
                                ?.product_variant_option_name
                            }
                          </span>
                        </div>
                      </div>
                      <div
                        style={{ marginBottom: "0px" }}
                        className="details-filter-row details-row-size"
                      >
                        <label
                          style={{
                            fontSize: "12px",
                            color: "rgb(158 154 154)",
                          }}
                        >
                          Size :
                        </label>
                        <div className=" ">
                          <span className="active" style={{ fontSize: "14px" }}>
                            {
                              item?.product_variant_price
                                ?.product_variant_size_detail
                            }
                          </span>
                        </div>
                      </div>
                      {/* {
                        item?.product_variant_price?.product_variant_size_detail
                      }{" "}
                      ,{" "}
                      {GetColorName(
                        item?.product_variant_price?.product_color_code
                      )} */}
                    </p>
                  </td>

                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "3px",
                    }}
                  >
                    {" "}
                    {item?.orderitem_quantity}
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "3px",
                    }}
                  >
                    <p style={{ margin: "0px" }}>{item?.orderitem_amount} </p>
                  </td>

                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "3px",
                    }}
                  >
                    <p style={{ margin: "0px" }}>{item?.orderitem_total}</p>
                  </td>
                </tr>
              );
            })}
            {ordersInfo?.order_shipping_amount ? (
              <tr>
                <td
                  colSpan={2}
                  style={{ border: "1px solid #000", padding: "3px" }}
                >
                  <p style={{ fontSize: "13px", marginBottom: "0px" }}>
                    Shipping Amount ( + )
                  </p>
                </td>
                <td style={{ border: "1px solid #000", padding: "3px" }}></td>
                <td style={{ border: "1px solid #000", padding: "3px" }}> </td>

                <td style={{ border: "1px solid #000", padding: "3px" }}>
                  <p
                    style={{
                      fontSize: "13px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    {ordersInfo?.order_shipping_amount}
                  </p>
                </td>
              </tr>
            ) : null}

            <tr>
              <td
                colSpan={2}
                style={{
                  border: "1px solid #000",
                  padding: "3px",
                  textAlign: "left",
                }}
              >
                <b style={{ fontSize: "13px", marginBottom: "0px" }}>
                  Total Quantity
                </b>
              </td>

              <td style={{ border: "1px solid #000", padding: "3px" }}>
                <b
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                    fontWeight: "900 !important",
                  }}
                >
                  {ordersInfo?.order_totalitems}
                </b>
              </td>
              <td style={{ border: "1px solid #000", padding: "3px" }}></td>
              <td style={{ border: "1px solid #000", padding: "3px" }}></td>
            </tr>
            <tr>
              <td
                colSpan={2}
                style={{
                  border: "1px solid #000",
                  padding: "3px",
                  textAlign: "right",
                }}
              >
                <p style={{ fontSize: "13px", marginBottom: "0px" }}>
                  Total Product Price
                </p>
              </td>

              <td style={{ border: "1px solid #000", padding: "3px" }}></td>
              <td style={{ border: "1px solid #000", padding: "3px" }}></td>

              <td style={{ border: "1px solid #000", padding: "3px" }}>
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                    fontWeight: "900 !important",
                  }}
                >
                  {ordersInfo?.order_totalamount}
                </p>
              </td>
            </tr>
            {/* {ordersInfo?.order_couponamount ? (
              <tr>
                <td
                  colSpan={2}
                  style={{ border: "1px solid #000", padding: "3px" }}
                >
                  <p style={{ fontSize: "13px", marginBottom: "0px" }}>
                    Discount( - )
                  </p>
                </td>

                <td style={{ border: "1px solid #000", padding: "3px" }}>
                  <p
                    style={{
                      fontSize: "13px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    {" "}
                  </p>
                </td>
                <td style={{ border: "1px solid #000", padding: "3px" }}></td>

                <td style={{ border: "1px solid #000", padding: "3px" }}>
                  <p
                    style={{
                      fontSize: "13px",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    {ordersInfo?.order_couponamount}
                  </p>
                </td>
              </tr>
            ) : null}
            <tr>
              <td
                colSpan={2}
                style={{ border: "1px solid #000", padding: "3px" }}
              >
                <b style={{ fontSize: "13px", marginBottom: "0px" }}>
                  Total Payable
                </b>
              </td>

              <td style={{ border: "1px solid #000", padding: "3px" }}>
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  {" "}
                </p>
              </td>
              <td style={{ border: "1px solid #000", padding: "3px" }}></td>

              <td style={{ border: "1px solid #000", padding: "3px" }}>
                <b
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  {ordersInfo?.order_totalamount}
                </b>
              </td>
            </tr> */}
            <tr>
              <td colSpan="2" style={{ padding: "3px" }}>
                <p style={{ fontSize: "13px", marginBottom: "0px" }}></p>
              </td>
              <td style={{ padding: "3px" }}>
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Discounted <br /> amount( - )
                </p>
              </td>
              <td style={{ padding: "3px" }}></td>
              <td style={{ padding: "3px" }}>
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  {ordersInfo?.order_couponamount}
                </p>
              </td>
            </tr>

            {/* Total Payable Row */}
            <tr>
              <td colSpan="2" style={{ padding: "5px" }}>
                <b style={{ fontSize: "13px", marginBottom: "0px" }}></b>
              </td>
              <td colSpan="2" style={{ padding: "5px" }}>
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Total Payable
                </p>
              </td>
              <td
                style={{
                  borderBottom: "1px solid #000",
                  borderTop: "1px solid #000",
                  padding: "5px",
                }}
              >
                <b
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  {ordersInfo?.order_totalamount}
                </b>
              </td>
            </tr>

            {/* VAT Row */}
            <tr>
              <td colSpan="2">
                <b style={{ fontSize: "13px", marginBottom: "0px" }}></b>
              </td>
              <td style={{ padding: "5px" }}>
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  VAT
                </p>
              </td>
              <td style={{ padding: "5px" }}>7.5 %</td>
              <td style={{ padding: "5px" }}>
                <b
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  {ordersInfo?.order_totalamount * vatRate}
                </b>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <b style={{ fontSize: "13px", marginBottom: "0px" }}></b>
              </td>
              <td style={{}}>
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  {" "}
                </p>
              </td>
              <td> </td>
              <td>
                <b
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  {/* Empty cell content */}
                </b>
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                <b style={{ fontSize: "13px", marginBottom: "0px" }}></b>
              </td>
              <td>
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  {" "}
                </p>
              </td>
              <td> </td>
              <td>
                <b
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  {/* Empty cell content */}
                </b>
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #000", padding: "5px" }}>
              <td colSpan="2">
                <b style={{ fontSize: "13px", marginBottom: "0px" }}></b>
              </td>
              <td style={{ borderBottom: "1px solid #000", padding: "5px" }}>
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  {" "}
                </p>
              </td>
              <td style={{ borderBottom: "1px solid #000", padding: "5px" }}>
                {" "}
              </td>
              <td style={{ padding: "5px" }}>
                <b
                  style={{
                    fontSize: "13px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  {/* Empty cell content */}
                </b>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="col-md-12 no_padding" style={{ paddingBottom: "10px" }}>
          <span
            className="col-md-12 no_padding"
            style={{ textAlign: "center", padding: "10px" }}
          >
            This is a computer generated invoice doesn't require any signature
          </span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ShopInvoice);
