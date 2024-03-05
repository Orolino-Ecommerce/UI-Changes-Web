import React, { useState, useRef, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Modal from "react-modal";
import ALink from "~/components/features/alink";
import ReactHtmlParser from "react-html-parser";
import { addReview, listReviews } from "~/core/requests";
import { toast } from "react-toastify";
import TimeAgo from "~/core/TimeAgo";
function InfoOne(props) {
  const { product } = props;
  const { slug } = props;

  const UserDetail = JSON.parse(localStorage.getItem("User"));
  const fileInputRef = useRef(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const loggedUser = UserDetail?.userId;
  const setRating = (e) => {
    e.preventDefault();

    if (e.currentTarget.parentNode.querySelector(".active")) {
      e.currentTarget.parentNode
        .querySelector(".active")
        .classList.remove("active");
    }

    e.currentTarget.classList.add("active");
    const ratingValue = parseInt(e.currentTarget.textContent, 10);
    setSelectedRating(ratingValue);
  };

  if (!product) {
    return <div></div>;
  }
  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === "remove") {
        return <></>;
      }
    },
  };

  const [reviewBtn, setreviewBtn] = useState(false);
  const [loading, setloading] = useState(false);
  const [ImageAlert, setImageAlert] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [ImageFiles, setimageFiles] = useState([]);
  const [listReview, setlistReview] = useState([]);
  const [maxFiles, setMaxFiles] = useState(0);
  const Addreview = () => {
    setreviewBtn(true);
    setMaxFiles(0);
    setSelectedImages([]);
    setImageAlert("");
    setSelectedRating(0);
  };

  const closeModal = () => {
    setreviewBtn(false);
  };
  const onSubmit = (event) => {
    setloading(true);
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append form fields to the FormData object
    // (You can add other form fields here as needed)
    formData.append("rating", document.getElementById("rating").value);
    formData.append("product_id", product?.product_id);
    formData.append("user_id", loggedUser);
    formData.append("comment", document.getElementById("reply-message").value);
    // console.log("rat", document.getElementById("rating").value);
    // console.log("rm", document.getElementById("reply-message").value);

    // Append selected images to the FormData object
    for (let i = 0; i < ImageFiles.length; i++) {
      formData.append("images", ImageFiles[i]);
      // console.log("images", ImageFiles[i]);
    }
    // console.log("formData", formData);

    // You can now submit the formData to your server using an HTTP request, e.g., fetch or axios
    // Example using fetch:
    addReview(formData)
      .then((response) => {
        // Handle the response from the server
        setreviewBtn(false);
        if (response?.data?.Code === 1) {
          toast.success(response?.data?.Message);
        } else {
          toast.error(response?.data?.Message);
        }

        // console.log("Review submitted successfully!");
        setloading(false);
        fetchNewReviews();
      })
      .catch((error) => {
        // Handle errors
        console.error("Error submitting review:", error);
        setloading(false);
      });
  };

  const handleImageChange = (event) => {
    const imageFiles = event.target.files; // This will be a FileList object containing the selected files
    // Do whatever you want to do with the selected image files here (e.g., store them in state, show preview, etc.)

    const maxFiles = 4;
    setImageAlert(``);
    setMaxFiles(imageFiles.length);

    if (imageFiles.length > maxFiles) {
      // You can display an error message or take other actions here to notify the user.
      // console.log(`Please select a maximum of ${maxFiles} files.`);
      // Clear the selected files to enforce the limit.
      event.target.value = null;
      setImageAlert(`Note : Please select a maximum of ${maxFiles} files.`);
      return;
    } else {
      const imagePreviews = [];
      const images = [];
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          imagePreviews.push(e.target.result);
          images.push(file);
          if (imagePreviews.length === imageFiles.length) {
            setSelectedImages(imagePreviews);
          }
        };

        reader.readAsDataURL(file);
      }
      setimageFiles(images);
    }
  };
  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    const updatedImagesFiles = [...ImageFiles];
    updatedImagesFiles.splice(index, 1);
    setimageFiles(updatedImagesFiles);

    // Trigger a re-render of the file input element to update its value
    setMaxFiles((prevKey) => prevKey - 1);
  };

  useEffect(() => {
    // Update the file input value whenever the selectedImages state changes
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the value to trigger the onChange event
    }
  }, [selectedImages, product, slug]);
  const fetchNewReviews = async () => {
    listReviews(slug).then((res) => {
      setlistReview(res?.data?.result);
    });
  };
  useEffect(() => {
    fetchNewReviews();
  }, [product, slug]);
  // console.log("listReview=========",listReview)
  return (
    <>
      <Tabs selectedTabClassName="show" selectedTabPanelClassName="active show">
        <div className="product-details-tab">
          <TabList className="nav nav-pills justify-content-center">
            <Tab className="nav-item">
              <span className="nav-link"> Description</span>
            </Tab>

            <Tab className="nav-item">
              <span className="nav-link"> Additional information</span>
            </Tab>

            <Tab className="nav-item">
              <span className="nav-link">Shipping & Returns</span>
            </Tab>

            <Tab className="nav-item">
              <span className="nav-link">
                Reviews
                {/* ({product.review}) */}
              </span>
            </Tab>
          </TabList>

          <div className="tab-content">
            <TabPanel className="tab-pane">
              <div className="product-desc-content">
                <div className="product-desc-content">
                  {ReactHtmlParser(product?.product_description)}
                </div>
              </div>
            </TabPanel>

            <TabPanel className="tab-pane">
              <div className="product-desc-content">
                {ReactHtmlParser(product?.product_feature)}
              </div>
            </TabPanel>

            <TabPanel className="tab-pane">
              <div className="product-desc-content">
                <h3>Delivery & returns</h3>
                <p>
                  We deliver to over 100 countries around the world. For full
                  details of the delivery options we offer, please view our{" "}
                  <ALink href="#">Delivery information</ALink>
                  <br />
                  We hope you’ll love every purchase, but if you ever need to
                  return an item you can do so within a month of receipt. For
                  full details of how to make a return, please view our{" "}
                  <ALink href="#">Returns information</ALink>
                </p>
              </div>
            </TabPanel>

            <TabPanel className="tab-pane">
              <button
                onClick={Addreview}
                className="btn btn-primary"
                style={{ float: "right" }}
              >
                Add Review
              </button>
              <div className="reviews mt-5">
                <h3>Reviews ({listReview?.length})</h3>
                <div className="review">
                  {listReview?.map((item, i) => {
                    return (
                      <>
                        <div className="row no-gutters" key={i}>
                          <div className="col-auto">
                            <h4>
                              <ALink href="#">{item?.user?.user_name}.</ALink>
                            </h4>

                            <div className="ratings-container">
                              <div className="ratings">
                                <div
                                  className="ratings-val"
                                  style={{
                                    width: item?.reviews_rating * 20 + "%",
                                  }}
                                ></div>
                                <span className="tooltip-text">
                                  {item?.reviews_rating}
                                </span>
                              </div>
                            </div>

                            <span className="review-date mb-1">
                              {" "}
                              <TimeAgo date={item?.createdAt} />
                            </span>
                          </div>
                          <div className="col">
                            <div className="review-content">
                              <p>{item?.reviews_description}</p>

                              <div style={{ display: "flex" }}>
                                {item?.reviews_img?.map((img, j) =>
                                  img ? (
                                    <div key={j}>
                                      <img
                                        src={
                                          process.env.NEXT_PUBLIC_UPLOAD_URL +
                                          "review/" +
                                          img
                                        }
                                        width="100"
                                      />
                                    </div>
                                  ) : null
                                )}
                              </div>
                              {item?.reply ? (
                                <div
                                  style={{ float: "right" }}
                                  className="mt-2"
                                >
                                  <h6 className="text-right">
                                    Reply from Orolino
                                  </h6>
                                  <p>{item?.reply}</p>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>{" "}
                        {i < listReview.length - 1 && <hr />}
                      </>
                    );
                  })}
                </div>
              </div>
            </TabPanel>
          </div>
        </div>
      </Tabs>
      <Modal
        isOpen={reviewBtn}
        // style={customStyles}
        contentLabel="login Modal"
        className="modal-dialog"
        overlayClassName="d-flex align-items-center justify-content-center"
        id="login-modal"
        onRequestClose={closeModal}
        closeTimeoutMS={10}
      >
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="close" onClick={closeModal}>
              <span aria-hidden="true">
                <i className="icon-close"></i>
              </span>
            </button>
            <div className="form-box">
              <div className="reply">
                <div className="title-wrapper text-left">
                  <h3 className="title title-simple text-left text-normal mb-5">
                    Add a Review
                  </h3>
                  <p>
                    {/* Your email address will not be published. Required fields
                      are marked * */}
                  </p>
                </div>
                <form onSubmit={onSubmit}>
                  <div className="rating-form">
                    <label htmlFor="rating" className="text-dark">
                      Your rating{" "}
                    </label>
                    <span className="rating-stars selected">
                      {[1, 2, 3, 4, 5].map((num, index) => (
                        <a
                          className={`star-${num}${
                            selectedRating === num ? " active" : ""
                          }`}
                          href="#"
                          onClick={setRating}
                          key={"star-" + index}
                        >
                          {num}
                        </a>
                      ))}
                    </span>

                    <select
                      name="rating"
                      id="rating"
                      required=""
                      value={selectedRating}
                      style={{ display: "none" }}
                    >
                      <option value="">Rate…</option>
                      <option value="5">Perfect</option>
                      <option value="4">Good</option>
                      <option value="3">Average</option>
                      <option value="2">Not that bad</option>
                      <option value="1">Very poor</option>
                    </select>
                  </div>

                  <textarea
                    id="reply-message"
                    cols="30"
                    rows="6"
                    className="form-control mb-2"
                    placeholder="Comment *"
                    required
                    //onChange={reviewContent}
                  ></textarea>
                  <input
                    type="file"
                    id="image-input"
                    accept="image/*"
                    className="form-control mb-2"
                    multiple
                    onChange={handleImageChange}
                    max={4}
                    ref={fileInputRef}
                  />
                  {ImageAlert ? "" : <span>{maxFiles} files selected</span>}
                  <label htmlFor="rating" className="text-dark   mb-2">
                    {ImageAlert}
                  </label>
                  <div className="image-box">
                    {selectedImages.map((previewUrl, index) => (
                      <div key={index} className="image-container">
                        <img
                          src={previewUrl}
                          alt={`Preview ${index + 1}`}
                          className="image-preview"
                        />
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => removeImage(index)}
                        >
                          <i className="icon-close"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  <br></br>
                  {loading ? (
                    <button className="btn btn-primary">Loading ...</button>
                  ) : (
                    <button
                      type="submit"
                      // onClick={onSubmit}
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default React.memo(InfoOne);
