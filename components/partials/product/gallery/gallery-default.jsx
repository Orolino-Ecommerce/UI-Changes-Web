import { Magnifier } from "react-image-magnifiers";
import React, { useState, useEffect } from "react";
import LightBox from "react-image-lightbox";

function GalleryDefault(props) {
  const { product, adClass = "product-gallery-vertical" } = props;
  const { color, OutofStock } = props;
  // console.log("gallery=============outOfStock ",OutofStock );
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [filteredImages, setFilteredImages] = useState([]);
  const [magnifer, setmagnifier] = useState([]);
  useEffect(() => {
    if (product) {
      setIsOpen(false);
      setPhotoIndex(0);

      const filteredImages = product?.product_galleries
        ?.filter((item) => item.product_color_code === color)
        .sort((a, b) => a.gallery_order - b.gallery_order);
      setFilteredImages(filteredImages);
    }
  }, [product, color, product?.product_galleries]);

  function moveNextPhoto() {
    setPhotoIndex((photoIndex + 1) % product.product_galleries.length);
  }

  function movePrevPhoto() {
    setPhotoIndex(
      (photoIndex + product.product_galleries.length - 1) %
        product.product_galleries.length
    );
  }

  function openLightBox() {
    let index = parseInt(
      document.querySelector(".product-main-image").getAttribute("index")
    );

    if (!index) {
      index = 0;
    }
    setIsOpen(true);
    setPhotoIndex(index);
  }

  function closeLightBox() {
    setIsOpen(false);
  }

  function changeBgImage(e, image, index) {
    let imgs = document.querySelectorAll(".product-main-image img");
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].src = image;
    }

    document
      .querySelector(".product-image-gallery .active")
      .classList.remove("active");

    document.querySelector(".product-main-image").setAttribute("index", index);
    e.currentTarget.classList.add("active");
  }

  if (!product) {
    return <div></div>;
  }

  //console.log("galleryproduct------------", filteredImages);

  return (
    <>
      <div className={`product-gallery ${adClass}`}>
        <div className="row m-0">
          <figure className="product-main-image prNone" index="0">
            {product.product_newarrival === 1 ? (
              <span className="product-label label-new">New</span>
            ) : (
              ""
            )}
            {product?.product_verify ? (
              <span
                className="product-label mt-3 label-top"
                style={{ backgroundColor: "#d02b2f" }}
              >
                Verified
              </span>
            ) : (
              ""
            )}
            {product.product_top === 1 ? (
              <span className="product-label label-top">Top</span>
            ) : (
              ""
            )}
            {OutofStock ? (
              <span className="product-label label-top out-of-stock-tag">
                OUT OF STOCK
              </span>
            ) : (
              ""
            )}
            <Magnifier
              imageSrc={filteredImages[0]?.gallery_image}
              imageAlt="product"
              largeImageSrc={filteredImages[0]?.gallery_image} // Optional
              dragToMove={false}
              mouseActivation="hover"
              cursorStyleActive="crosshair"
              id="product-zoom"
              className="zoom-image position-relative overflow-hidden"
              width={800}
              height={1088}
              style={{
                paddingTop: `${(1088 / 800) * 100}%`,
              }}
            />

            <button
              id="btn-product-gallery"
              className="btn-product-gallery"
              onClick={openLightBox}
            >
              <i className="icon-arrows"></i>
            </button>
          </figure>

          <div id="product-zoom-gallery" className="product-image-gallery">
            {filteredImages.map((item, index) => (
              <button
                className={`product-gallery-item ${
                  0 === index ? "active" : ""
                }`}
                key={product.product_id + "-" + index}
                onClick={(e) =>
                  changeBgImage(e, `${item.gallery_image}`, index)
                }
              >
                <div className="img-wrapper h-100">
                  <img
                    src={filteredImages[index]?.gallery_image}
                    alt="product back"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* {isOpen ? (
        <LightBox
          mainSrc={product.product_galleries[photoIndex].gallery_image}
          nextSrc={
            product.product_galleries[
              (photoIndex + 1) % product.product_galleries.length
            ].url
          }
          prevSrc={
            product.product_galleries[
              (photoIndex + product.product_galleries.length - 1) %
                product.product_galleries.length
            ].gallery_image
          }
          onCloseRequest={closeLightBox}
          onMovePrevRequest={moveNextPhoto}
          onMoveNextRequest={movePrevPhoto}
          reactModalStyle={{
            overlay: {
              zIndex: 1041,
            },
          }}
        />
      ) : (
        ""
      )} */}
    </>
  );
}

export default React.memo(GalleryDefault);
