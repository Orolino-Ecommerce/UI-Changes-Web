import OwlCarousel from "~/components/features/owl-carousel";
import ProductTwelve from "~/components/features/products/product-twelve";

import { productSlider } from "~/utils/data";

function BrowsingCollection(props) {
  const { products = [], loading } = props;
console.log("recetproducts",products);
  return (
    <div className="pt-6 pb-md-9 pb-3 top-collection">
      <div className="container">
        <div className="heading text-center">
          <h2 className="title">Recently viewed products</h2>

          <p className="title-desc">
            <br />
            Recently, you perused these products...
          </p>
        </div>

        <OwlCarousel adClass="owl-simple mb-5" options={productSlider}>
          {loading || products.length == 0
            ? [1, 2, 3, 4].map((item, index) => (
                <div className="skel-pro" key={index}></div>
              ))
            : products.map((item, index) => (
             <ProductTwelve product={item} key={index} />
              ))}
        </OwlCarousel>
      </div>
    </div>
  );
}

export default BrowsingCollection;
