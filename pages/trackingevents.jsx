import ReactGA4 from "react-ga4";
const InitializeGoogleAnalytics = () => {
  // Initialize GA4 - Add your measurement ID
  ReactGA4.initialize("G-FHXZWXN3JD");

  console.log("GA INITIALIZED");
};

const TrackGoogleAnalyticsEvent = (event_name, currency, value, items) => {
  // Format the event data
  const eventData = {
    event_name: event_name,

    currency: currency,
    value: value,
    items: items,
  };

  // Send the event to GA4
  window.gtag("event", event_name, {
    currency: currency,
    value: value,
    items: items,

    send_to: "G-FHXZWXN3JD", // Replace with your actual GA4 measurement ID
  });

  // Log the event data (optional)
  console.log("GA4 Event Sent:", eventData);
};
const PurchaseTrackGoogleAnalyticsEvent = (
  event_name,
  transaction_id,
  currency,
  value,
  items
) => {
  // Format the event data
  const eventData = {
    event_name: event_name,
    transaction_id: transaction_id,
    currency: currency,
    value: value,
    items: items,
  };

  // Send the event to GA4
  window.gtag("event", event_name, {
    currency: currency,
    transaction_id: transaction_id,
    value: value,
    items: items,

    send_to: "G-FHXZWXN3JD", // Replace with your actual GA4 measurement ID
  });

  // Log the event data (optional)
  console.log("GA4 Purchase Event Sent:", eventData);
};
const PayTrackGoogleAnalyticsEvent = (
  event_name,

  currency,
  value,
  payment_type,
  items
) => {
  // Format the event data
  const eventData = {
    event_name: event_name,

    currency: currency,
    value: value,
    payment_type: payment_type,
    items: items,
  };

  // Send the event to GA4
  window.gtag("event", event_name, {
    currency: currency,

    value: value,
    payment_type: payment_type,
    items: items,

    send_to: "G-FHXZWXN3JD", // Replace with your actual GA4 measurement ID
  });

  // Log the event data (optional)
  console.log("GA4 Pay Event Sent:", eventData);
};
const SearchTrackGoogleAnalyticsEvent = (event_name, items) => {
  // Format the event data
  const eventData = {
    event_name: event_name,
    items: items,
  };

  // Send the event to GA4
  window.gtag("event", event_name, {
    items: items,

    send_to: "G-FHXZWXN3JD", // Replace with your actual GA4 measurement ID
  });

  // Log the event data (optional)
  console.log("GA4 search Sent:", eventData);
};

export default InitializeGoogleAnalytics;
export {
  InitializeGoogleAnalytics,
  TrackGoogleAnalyticsEvent,
  SearchTrackGoogleAnalyticsEvent,
  PurchaseTrackGoogleAnalyticsEvent,
  PayTrackGoogleAnalyticsEvent,
};
