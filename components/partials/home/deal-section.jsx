import ProductThirteen from "~/components/features/products/product-thirteen";
import ALink from "~/components/features/alink";

function DealSection(props) {
  const { products, loading } = props;
  // const [nameUrl, setName] = useState("");
  // useEffect(() => {
  //   setName(products[0]?.banner_image);
  // }, [products]);
  console.log("productssec========", products);
  return (
    <div
      className="deal bg-image pt-8 pb-8"
      style={{
        backgroundImage: `url('${products?.banner_image}')`,
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-8 col-lg-6">
            <div className="deal-content text-center">
              <h2>{products?.today_deals_title}</h2>

              {/* <div className="deal-countdown">
                <Countdown
                  date={`2022-02-01T01:02:03`}
                  renderer={rendererThree}
                />
              </div> */}
            </div>
            <div className="row deal-products">
              {loading
                ? [1, 2].map((item) => (
                    <div className="col-6" key={item}>
                      <div className="skel-pro"></div>
                    </div>
                  ))
                : products?.today_deal_details
                    ?.slice(-2)
                    .map((product, index) => {
                      return (
                        <div className="col-6" key={index}>
                          <ProductThirteen product={product?.product} />
                        </div>
                      );
                    })}
            </div>{" "}
            <div className="load-more-container text-center">
              <ALink
                href="/bd/deals/viewAll"
                className="btn btn-outline-darker btn-load-more"
                //onClick={loadMore}
              >
                <span className="mr-3">View more products</span>
              </ALink>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default DealSection;
