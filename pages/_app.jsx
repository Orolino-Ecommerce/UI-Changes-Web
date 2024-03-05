import { useEffect } from "react";
import Helmet from "react-helmet";
import { useStore } from "react-redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { WishlistProvider } from "~/components/partials/header/partials/WishlistContext.jsx";
import { wrapper } from "../store/index.js";
import Layout from "../components/layout";

import { actions as demoAction } from "../store/demo";

import "~/public/scss/plugins/owl-carousel/owl.carousel.scss";
import "~/public/scss/style.scss";
import "~/public/css/custom.css";
import { InitializeGoogleAnalytics } from "~/pages/trackingevents";
//import { init } from "react-facebook-pixel";

const WrappedApp = ({ Component, pageProps }) => {
  const store = useStore();
  useEffect(() => {
    if (store.getState().demo.current != process.env.NEXT_PUBLIC_DEMO) {
      store.dispatch(demoAction.refreshStore(process.env.NEXT_PUBLIC_DEMO));
    }
  }, []);
  useEffect(() => {
    // Initialize Google Analytics when the component mounts
    InitializeGoogleAnalytics();
    //initiatePixel();
  }, []);
  // const initiatePixel = () => {
  //   const pixelOptions = {
  //     autoConfig: true, // set pixel's autoConfig
  //     debug: false, // enable logs
  //   };
  //   init("1004527530844756", pixelOptions);
  // };
  return (
    <Provider store={store}>
      <PersistGate
        persistor={store.__persistor}
        loading={
          <div className="loading-overlay">
            <div className="bounce-loader">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
        }
      >
        <Helmet>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="keywords" content="Orolino - Online Clothing Store" />
          <meta name="description" content="Orolino - Online Clothing Store" />
          <meta name="author" content="d-themes" />
          <meta name="apple-mobile-web-app-title" content="Orolino" />
          <meta
            name="google-site-verification"
            content="qddyjUMakbwnNjhtEowBu50DIvRJ6BTo-YR2t0S4U_8"
          />
          <meta
            name="application-name"
            content="Orolino - Online Clothing Store"
          />
          <meta name="msapplication-TileColor" content="#d02b2f" />
          <meta
            name="msapplication-config"
            content="images/icons/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
          <title>Orolino - Online Clothing Store</title>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="images/icons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="images/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="images/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="images/icons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="images/icons/safari-pinned-tab.svg"
            color="#666666"
          />
          <link rel="shortcut icon" href="images/icons/favicon-32x32.ico" />

          <script>
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TN8JLVLJ');`}
          </script>
          <script>
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1004527530844756');
fbq('track', 'PageView');`}
          </script>
          <noscript>
            {`<img
              height="1"
              width="1"
              style="display:none"
              src="https://www.facebook.com/tr?id=1004527530844756&ev=PageView&noscript=1"
            />`}
          </noscript>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-FHXZWXN3JD"
          ></script>
          <script>
            {`window.dataLayer = window.dataLayer || []; function gtag()
            {dataLayer.push(arguments)}
            gtag('js', new Date()); gtag('config', 'G-FHXZWXN3JD');`}
          </script>
        </Helmet>

        <WishlistProvider>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-TN8JLVLJ"
              height="0"
              width="0"
              style="display:none;visibility:hidden"
            ></iframe>
          </noscript>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WishlistProvider>
      </PersistGate>
    </Provider>
  );
};

WrappedApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default wrapper.withRedux(WrappedApp);
