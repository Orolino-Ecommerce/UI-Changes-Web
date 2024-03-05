const Microdata = ({ product, price, availability }) => {
  console.log(
    "Microdataproduct===========",
    product?.product_id,
    product?.product_description,
    product?.product_name,
    product?.product_image,
    availability,
    price
  );

  // Check if the necessary properties are present on the product object

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "Product",
    id: `${product?.product_id}`,
    description: `${product?.product_description}`,
    productID: `${product?.product_code}`,
    name: `${product?.product_name}`,
    image: [`${product?.product_image}`],
    offers: {
      "@type": "Offer",
      availability: `${availability}`,
      price: `${price}`,
      offerCount: "1",
      priceCurrency: "BDT",
    },
    url: "https://oro-lino.com",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default Microdata;
