import React, { useState, useEffect } from "react";

import ALink from "~/components/features/alink";
import PageHeader from "~/components/features/page-header";
import { countTo } from "~/utils";
import ReactHtmlParser from "react-html-parser";
import { settings } from "~/core/requests";

function Rr() {
  const [setting, setsetting] = useState([]);
  const [loader, setloader] = useState(true);
  useEffect(() => {
    countTo();
    settings().then((res) => {
      setsetting(res?.data?.data[0]);
      setloader(false);
    });
  }, []);

  return (
    <div className="main">
      <PageHeader title="Return & Refund" subTitle="Pages" />

      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="#">Page</ALink>
            </li>
            <li className="breadcrumb-item active">Return & Refund</li>
          </ol>
        </div>
      </nav>

      <div className="page-content pb-3">
        {!loader ? (
          <div className="container">
            <div>{ReactHtmlParser(setting?.refund)}</div>
          </div>
        ) : (
          <div className="container" style={{ textAlign: "-webkit-center" }}>
            <img src={"/images/loader.gif"} style={{ width: "300px" }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Rr);
