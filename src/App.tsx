import AuthProvider from "contexts/AuthContext";
import FullscreenProvider from "contexts/FullscreenContext";
import MyRouter from "routers/index";
import { ToastContainer } from "react-toastify";
import ReactGA from "react-ga4";
import app from "config/app";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  ReactGA.initialize(app.measurementIdGA4);

  const stripePromise = loadStripe(app.stripePublishableKey);

  return (
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <FullscreenProvider>
          <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
            <ToastContainer
              position="top-right"
              theme="colored"
              hideProgressBar={true}
              toastStyle={{ top: "65px" }}
            />
            <MyRouter />
          </div>
        </FullscreenProvider>
      </Elements>
    </AuthProvider>
  );
}

export default App;
