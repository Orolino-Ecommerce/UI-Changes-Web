import GoogleMapReact from "google-map-react";
import ALink from "~/components/features/alink";
import { useEffect, useState } from "react";
import { addContactList, settings } from "~/core/requests";
import { toast } from "react-toastify";
const MapComponent = ({ text }) => <div>{text}</div>;
import PageHeader from "~/components/features/page-header";
function Contact() {
  const [loading, setloading] = useState(false);
  const [setting, setsetting] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setcontact] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");

  const toastStyle = {
    width: "800px", // Adjust the width as needed
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setloading(true);
    const data = {
      name: name,

      email: email,
      contact: contact,
      subject: subject,
      message: message,
    };
    // console.log("submitted data", data);
    addContactList(data).then((res) => {
      // console.log("contact add", res.data?.Code);
      // console.log("contact add", res.data?.Message);
      if (res?.data?.Code === 1) {
        toast.success(res?.data?.Message, {
          style: toastStyle,
        });
        setloading(false);
        setName("");
        setEmail("");
        setcontact("");
        setsubject("");
        setmessage("");
      } else {
        toast.error(res?.data?.Message);
        setloading(false);
        setName("");
        setEmail("");
        setcontact("");
        setsubject("");
        setmessage("");
      }
    });
  };

  useEffect(() => {
    settings().then((res) => {
      // console.log("res?.data?.data[0]",res?.data?.data[0]);
      setsetting(res?.data?.data[0]);
    });
  }, []);
  return (
    <div className="main">
      <PageHeader title="Contact" subTitle="Pages" />
      <div className="container">
        <div
          className="page-header page-header-big text-center"
          style={{ backgroundImage: `url(images/contact-header-bg.jpg)` }}
        >
          <h1 className="page-title text-white">
            Contact us<span className="text-white">keep in touch with us</span>
          </h1>
        </div>
      </div>

      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-2 mb-lg-0">
              <h2 className="title mb-1">Contact Information</h2>
              <p className="mb-3">
                Drop Us a Line: Your thoughts matter! Drop us a line and let's
                start a conversation about your shopping experience.
              </p>
              <div className="row">
                <div className="col-sm-7">
                  <div className="contact-info">
                    <h3>The Office</h3>

                    <ul className="contact-list">
                      <li>
                        <i className="icon-map-marker"></i>
                        {setting?.address1}, {setting?.address2}
                        <br></br>
                        Bangladesh
                      </li>
                      <li>
                        <i className="icon-phone"></i>
                        <a href="tel:#">{setting?.phone1}</a>
                      </li>
                      <li>
                        <i className="icon-envelope"></i>
                        <a href="mailto:#">{setting?.email}</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-sm-5">
                  <div className="contact-info">
                    <h3>The Office</h3>

                    <ul className="contact-list">
                      <li>
                        <i className="icon-clock-o"></i>
                        <span className="text-dark">
                          Saturday - Thursday
                        </span>{" "}
                        <br />
                        9 AM – 6:30 PM BST
                      </li>
                      <li>
                        <i className="icon-calendar"></i>
                        <span className="text-dark">Friday</span> <br /> Holiday
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="title mb-1">Got Any Questions?</h2>
              <p className="mb-2">
                Use the form below to get in touch with the sales team
              </p>

              <form onSubmit={handleSubmit} className="contact-form mb-3">
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="cname" className="sr-only">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cname"
                      placeholder="Name *"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="cemail" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="cemail"
                      placeholder="Email *"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="cphone" className="sr-only">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="cphone"
                      placeholder="Phone"
                      value={contact}
                      onChange={(e) => setcontact(e.target.value)}
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="csubject" className="sr-only">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="csubject"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setsubject(e.target.value)}
                    />
                  </div>
                </div>

                <label htmlFor="cmessage" className="sr-only">
                  Message
                </label>
                <textarea
                  className="form-control"
                  cols="30"
                  rows="4"
                  id="cmessage"
                  required
                  placeholder="Message *"
                  value={message}
                  onChange={(e) => setmessage(e.target.value)}
                ></textarea>

                {!loading ? (
                  <>
                    {" "}
                    <button
                      type="submit"
                      className="btn btn-outline-primary-2 btn-minwidth-sm"
                    >
                      <span>Submit</span>{" "}
                      <i className="icon-long-arrow-right"></i>{" "}
                    </button>
                  </>
                ) : (
                  <button className="btn btn-outline-primary-2 btn-minwidth-sm">
                    <span>Loading...</span>
                  </button>
                )}
              </form>
            </div>
          </div>

          <hr className="mt-4 mb-5" />

          {/* <div className="stores mb-4 mb-lg-5">
            <h2 className="title text-center mb-3">Our Stores</h2>

            <div className="row">
              <div className="col-lg-6">
                <div className="store">
                  <div className="row align-items-center">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img
                          src="images/stores/img-1.jpg"
                          alt="desc"
                          className="w-100"
                        />
                      </figure>
                    </div>
                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">Orolino</h3>
                        <address>
                          {" "}
                          71, Lake Drive Road, Sector-7, Uttara, Dhaka-1230,
                          Bangladesh{" "}
                        </address>
                        <div>
                          <a href="tel:#">+1 987-876-6543</a>
                        </div>

                        <h4 className="store-subtitle">Store Hours:</h4>
                        <div>Saturday - Thursday 9 AM – 6:30 PM </div>
                        <div>Sunday - Holiday</div>

                        <ALink
                          href="#"
                          className="btn btn-link"
                          target="_blank"
                        >
                          
                          <i className="icon-long-arrow-right"></i>
                        </ALink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="store">
                  <div className="row align-items-center">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img
                          src="images/stores/img-2.jpg"
                          alt="desc"
                          className="w-100"
                        />
                      </figure>
                    </div>

                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">Orolino</h3>
                        <address>
                          {" "}
                          71, Lake Drive Road, Sector-7, Uttara, Dhaka-1230,
                          Bangladesh{" "}
                        </address>
                        <div>
                          <ALink href="tel:#">+1 987-876-6543</ALink>
                        </div>

                        <h4 className="store-subtitle">Store Hours:</h4>
                        <div>Saturday - Thursday 9 AM – 6:30 PM</div>
                        <div>Sunday - Holiday</div>

                        <ALink
                          href="#"
                          className="btn btn-link"
                          target="_blank"
                        >
                          
                          <i className="icon-long-arrow-right"></i>
                        </ALink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div id="map" className="container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3648.460971877642!2d90.3912566!3d23.8732673!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c43d8778fde3%3A0xadf89188f60e4e09!2sDaisy%20Harbour%20Apartments%2C%2071%20Lake%20Dr%20Rd%2C%20Dhaka%201230%2C%20Bangladesh!5e0!3m2!1sen!2sin!4v1692438816627!5m2!1sen!2sin"
            width="100%"
            height="500"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
