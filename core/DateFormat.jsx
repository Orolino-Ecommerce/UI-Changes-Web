import React from "react";
const DateFormat = (dateString) => {
  //console.log("Input dateString:", dateString);
  if (dateString) {
    // Handle the case where dateString is undefined
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  } else {
    return "";
  }
};
export default DateFormat;
