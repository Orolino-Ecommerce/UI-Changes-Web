import React from "react";

const TimeAgo = ({ date }) => {
  const now = new Date();
  const pastDate = new Date(date);

  // Calculate time in minutes, hours, and days
  const timeDifference = Math.floor((now - pastDate) / 1000); // Convert to seconds

  const minutesAgo = Math.floor(timeDifference / 60);
  const hoursAgo = Math.floor(timeDifference / (60 * 60));
  const daysAgo = Math.floor(timeDifference / (60 * 60 * 24));

  // Determine the appropriate unit and value to display
  let unit = "";
  let value = 0;

  if (minutesAgo < 60) {
    unit = "minutes";
    value = minutesAgo;
  } else if (hoursAgo < 24) {
    unit = "hours";
    value = hoursAgo;
  } else {
    unit = "days";
    value = daysAgo;
  }

  return (
    <div>
      <p>{`${value} ${unit} ago`}</p>
    </div>
  );
};

export default TimeAgo;
