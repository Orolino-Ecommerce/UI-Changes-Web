let ReactPixel;

// Check if the code is running in a browser environment
if (typeof window !== "undefined") {
  ReactPixel = require("react-facebook-pixel");

  const advancedMatching = { em: "" }; // optional
  const options = {
    autoConfig: true,
    debug: false,
  };

  ReactPixel.default.init("1004527530844756", advancedMatching, options);
}

export const trackCustomEvent = (eventName, data) => {
  if (ReactPixel) {
    ReactPixel.default.trackCustom(eventName, data);
  }
};
