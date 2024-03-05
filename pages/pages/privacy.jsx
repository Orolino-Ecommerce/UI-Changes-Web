import React, { useState, useEffect } from "react";

import ALink from "~/components/features/alink";
import PageHeader from "~/components/features/page-header";
import { countTo } from "~/utils";
import ReactHtmlParser from "react-html-parser";
import { settings } from "~/core/requests";

function Privacy() {
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
      <PageHeader title="Privacy Policy" subTitle="Pages" />

      <nav className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="#">Privacy</ALink>
            </li>
            <li className="breadcrumb-item active">Privacy Policy</li>
          </ol>
        </div>
      </nav>

      <div className="page-content pb-3">
        {!loader ? (
          <div className="container">
            <div className="row">
              {ReactHtmlParser(setting?.privacy_policy)}
            </div>{" "}
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

export default React.memo(Privacy);
