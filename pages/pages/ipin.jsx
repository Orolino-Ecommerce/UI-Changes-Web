import { useRouter } from "next/router";
import { paymentHistory } from "~/core/requests";
const IPNPage = () => {
  // console.log("pagecalled------");
  const router = useRouter();

  // Parse and process the IPN data from the request (req.body)
  const handleIPN = async (req, res) => {
    try {
      //  const ipnData = req.body; // Access the query parameters sent by SSLCommerz
      // console.log("called------", ipnData);
      // Perform processing based on the IPN data (e.g., update order status)
      const ipnDatas = {
        tran_id: "123455",
      };
      paymentHistory(ipnDatas).then((res) => {});
      // Respond with a success message
      //res.status(200).send("IPN received and processed successfully.");
    } catch (error) {
      // Handle errors here
      console.error("Error processing IPN:", error);
      //  res.status(500).send("Internal server error.");
    }
  };

  // Call the IPN handling function
  handleIPN();

  // Render any relevant content or UI elements here
  return (
    <div>
      <h1>IPN Handling Page</h1>
      {/* You can display additional content here */}
    </div>
  );
};

export default IPNPage;
