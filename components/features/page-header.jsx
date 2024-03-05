import React from "react";
import HeaderSearch from "../partials/header/partials/header-search";

function PageHeader(props) {
  const { title, subTitle } = props;

  return (
    <div
      className="page-header text-center"
      style={{ backgroundImage: `url(images/page-header-bg.jpg)` }}
    >
      <div className="container">
        <HeaderSearch />
      </div>
    </div>
  );
}

export default React.memo(PageHeader);
