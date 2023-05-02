import { CheckIcon } from "@heroicons/react/solid";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  PaymentRequestButtonElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeCardNumberElement } from "@stripe/stripe-js";
import HeaderLogged from "components/Header/HeaderLogged";
import Spinner from "components/Spinner";
import app from "config/app";
import { useAuth } from "contexts/AuthContext";
import { FormEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "shared/Button/Button";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Footer from "shared/Footer/Footer";
import axios from "../axios";
import { PricingItem, pricings } from "./PageSubcription/PageSubcription";

let pricingHeight: number = 0;

const Checkout = () => {
  const { token, setUser } = useAuth();
  const [cardHolderName, setCardHolderName] = useState("");
  const location = useLocation();
  const history = useHistory();
  const [btnAction, setBtnAction] = useState(false);

  const [renderPayBtn, setRenderPayBtn] = useState<any>(null);

  const search = new URLSearchParams(location.search);
  const pkgId = atob(search.get("pkgId") as string);

  const [pckg, setPckg] = useState<any>(null);

  const getPackage = async () => {
    const res = await axios
      .post(
        `${app.serverURL}/api/subscription/get`,
        { id: pkgId },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      )
      .then((resp: any) => resp.data);

    setPckg(res);
  };

  useEffect(() => {
    if (pkgId) {
      getPackage();
    }
  }, [pkgId]);

  useEffect(() => {
    pricingHeight = document.getElementById("pricingPage")?.clientHeight || 0;
  }, []);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe || !elements || !pckg) {
      return;
    }

    const pr = stripe.paymentRequest({
      country: "FR",
      currency: "eur",
      requestPayerEmail: true,
      requestPayerName: true,
      total: {
        label: pckg.title,
        amount: +pckg.price.split(",").join(".") * 100,
      },
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setRenderPayBtn(pr);
      }
    });

    pr.on("paymentmethod", async (e) => {
      const { client_secret } = await axios
        .post(
          `${app.serverURL}/api/subscription/create-payment-intent`,
          { amount: pckg.price.split(",").join(".") * 100 },
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        )
        .then((resp: any) => resp.data);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        client_secret,
        {
          payment_method: e.paymentMethod.id,
        },
        {
          handleActions: false,
        }
      );

      if (error) {
        e.complete("fail");
        toast.error(error.message);
        return;
      }

      e.complete("success");

      if (paymentIntent.status === "requires_action") {
        stripe.confirmCardPayment(client_secret);
      }

      await axios
        .post(
          "/subscription/credits",
          { pkgId: pckg._id, sessionId: paymentIntent.id },
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        )
        .then((resp: any) => {
          setUser((prev: any) => ({
            ...prev,
            credits: resp.data.credits,
          }));
          toast.success(resp.data.message);
          history.push("/subscription");
        })
        .catch((err: any) => {
          console.error(err.message);
        });
    });
  }, [stripe, elements, pckg]);

  const renderPricingItem = (pricing: PricingItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
          pricing.isPopular
            ? "border-primary-500"
            : "border-neutral-100 dark:border-neutral-700"
        }`}
      >
        {pricing.isPopular && (
          <span className="bg-primary-500 text-white px-3 py-1 tracking-widest text-xs absolute right-3 top-3 rounded-full z-10">
            POPULAR
          </span>
        )}
        <div className="mb-8">
          <h3 className="block text-sm uppercase tracking-widest text-neutral-6000 dark:text-neutral-300 mb-2 font-medium">
            {pricing.name}
          </h3>
          <h2 className="text-pricing text-5xl leading-none flex items-center">
            <span>{pricing.pricing}</span>
          </h2>
        </div>
        <nav className="space-y-4 mb-8">
          {pricing.features.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="mr-4 inline-flex flex-shrink-0 text-primary-6000">
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-neutral-700 dark:text-neutral-300">
                {item}
              </span>
            </li>
          ))}
        </nav>
        <div className="flex flex-col mt-auto">
          {pricing.isPopular ? (
            <ButtonPrimary
              onClick={() => {
                // handlePackageBuy(pricing.id);
                history.push("/checkout?pkgId=" + btoa(pricing.id.toString()));
              }}
            >
              Buy now
            </ButtonPrimary>
          ) : (
            <ButtonSecondary>
              <span
                className="font-medium"
                onClick={() => {
                  // handlePackageBuy(pricing.id);
                  history.push(
                    "/checkout?pkgId=" + btoa(pricing.id.toString())
                  );
                }}
              >
                Buy now
              </span>
            </ButtonSecondary>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <HeaderLogged />
      <div className="nc-PageHome relative overflow-hidden">
        <Helmet>
          <title>Order || Stopthefake Legit-check your item</title>
        </Helmet>

        {/* <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28"> */}

        <div style={{ position: "relative" }} id="pricingPage">
          <div
            className={`nc-PageSubcription container pb-24 lg:pb-32`}
            data-nc-id="PageSubcription"
          >
            <header className="text-center max-w-2xl mx-auto my-10">
              <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                Pricing
              </h2>
              <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
                Buy Token Plans
              </span>
            </header>
            <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
              <div className="grid lg:grid-cols-3 gap-5 xl:gap-8">
                {pricings.map(renderPricingItem)}
              </div>
            </section>
          </div>

          <div
            className="container py-10"
            style={{
              height: pricingHeight + "px",
              position: "absolute",
              top: "0px",
              left: "0px",
              zIndex: 10,
              // backgroundColor: "#F28A4B",
            }}
          >
            <div
              style={{
                maxWidth: "700px",
                margin: "0px auto",
                backgroundColor: "white",
              }}
              className="flex flex-col sm:flex-row sm:items-stretch"
            >
              <div
                style={{
                  flex: 1,
                  backgroundColor: "white",
                }}
                className="or-main  hidden sm:inline-block"
              >
                <img
                  src="/stf-checkout.jpg"
                  width="100%"
                  style={{ width: "100%", height: "450px" }}
                />
                <div
                  className="or-detail p-4"
                  style={{ color: "black", paddingBottom: "30px" }}
                >
                  {pckg ? (
                    <>
                      <h2
                        style={{
                          textTransform: "uppercase",
                          marginBottom: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        {pckg.title}
                      </h2>
                      <h1 style={{ fontSize: "40px" }}>{pckg.price} €</h1>
                    </>
                  ) : (
                    <Spinner size="md" />
                  )}
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "0px",
                    bottom: "0px",
                    width: "100%",
                    padding: "10px",
                  }}
                >
                  <h3
                    className="text-center"
                    style={{
                      color: "black",
                      textAlign: "center",
                      width: "100% !important",
                    }}
                  >
                    Powered{" "}
                    <span style={{ fontWeight: "bolder", fontSize: "25px" }}>
                      stripe
                    </span>
                    &nbsp;&nbsp; | &nbsp;&nbsp;Terms Privacy
                  </h3>
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  backgroundColor: "#2E2C32",
                  padding: "25px",
                }}
              >
                <button
                  type="button"
                  style={{
                    color: "white",
                    fontSize: "25px",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 10,
                  }}
                  onClick={() => history.push("/subscription")}
                >
                  &times;
                </button>

                <div className="mb-3">
                  {renderPayBtn && (
                    <PaymentRequestButtonElement
                      options={{ paymentRequest: renderPayBtn }}
                    />
                  )}
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div style={{ borderTop: "2px solid white", flex: 1 }}></div>
                  <p>Or pay other way</p>
                  <div style={{ borderTop: "2px solid white", flex: 1 }}></div>
                </div>

                <h3
                  style={{
                    textTransform: "uppercase",
                    marginBottom: "25px",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  Credit Card Checkout
                </h3>
                <form
                  noValidate
                  onSubmit={async (e: FormEvent) => {
                    e.preventDefault();

                    if (!stripe || !elements) {
                      return;
                    }

                    const cardNumberEmpty = document
                      .getElementById("cardNumber")
                      ?.classList.contains("StripeElement--empty");
                    const cardExpiryEmpty = document
                      .getElementById("cardExpiry")
                      ?.classList.contains("StripeElement--empty");
                    const cardCvcEmpty = document
                      .getElementById("cardCvc")
                      ?.classList.contains("StripeElement--empty");

                    if (cardHolderName === "") {
                      toast.error("Enter cardholder name.");
                      return false;
                    } else if (cardNumberEmpty) {
                      toast.error("Enter card number.");
                      return false;
                    } else if (cardExpiryEmpty) {
                      toast.error("Enter expiry date of card.");
                      return false;
                    } else if (cardCvcEmpty) {
                      toast.error("Enter cvc number.");
                      return false;
                    } else {
                      setBtnAction(true);
                      try {
                        const { client_secret } = await axios
                          .post(
                            `${app.serverURL}/api/subscription/create-payment-intent`,
                            { amount: pckg.price.split(",").join(".") * 100 },
                            {
                              headers: {
                                token: `Bearer ${token}`,
                              },
                            }
                          )
                          .then((resp: any) => resp.data);

                        const { error, paymentIntent } =
                          await stripe.confirmCardPayment(client_secret, {
                            payment_method: {
                              card: elements.getElement(
                                CardNumberElement
                              ) as StripeCardNumberElement,
                              billing_details: {
                                name: cardHolderName,
                              },
                            },
                          });

                        if (error) {
                          toast.error(error.message);
                          setBtnAction(false);
                          return false;
                        }

                        if (paymentIntent.status === "succeeded") {
                          await axios
                            .post(
                              "/subscription/credits",
                              { pkgId: pckg._id, sessionId: paymentIntent.id },
                              {
                                headers: {
                                  token: `Bearer ${token}`,
                                },
                              }
                            )
                            .then((resp: any) => {
                              setUser((prev: any) => ({
                                ...prev,
                                credits: resp.data.credits,
                              }));
                              toast.success(resp.data.message);
                              setBtnAction(false);
                              history.push("/subscription");
                            })
                            .catch((err: any) => {
                              setBtnAction(false);
                              console.error(err.message);
                            });
                          // toast.success("Payment successfull");
                        }
                      } catch (error) {
                        setBtnAction(false);
                        console.log("AXIOS ERROR: ", error);
                      }
                    }
                  }}
                >
                  <div className="or-input-group">
                    <label htmlFor="cardHolder">Cardholder's Name</label>
                    <input
                      id="cardHolder"
                      type="text"
                      className="or-input"
                      value={cardHolderName}
                      onChange={(e) => {
                        setCardHolderName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="or-input-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <CardNumberElement
                      id="cardNumber"
                      options={{
                        showIcon: true,
                        iconStyle: "solid",
                        placeholder: "",
                        style: {
                          base: {
                            color: "white",
                            fontSize: "17px",
                            lineHeight: "40px",
                          },
                        },
                      }}
                      className="or-input"
                    />
                  </div>
                  <div className="flex items-center gap-5">
                    <div style={{ flex: 2 }} className="or-input-group">
                      <label htmlFor="cardExpiry">Expiration Date</label>
                      <CardExpiryElement
                        id="cardExpiry"
                        options={{
                          placeholder: "",
                          style: {
                            base: {
                              color: "white",
                              fontSize: "17px",
                              lineHeight: "40px",
                            },
                          },
                        }}
                        className="or-input"
                      />
                    </div>
                    <div style={{ flex: 1 }} className="or-input-group">
                      <label htmlFor="cardCvc">CVC</label>
                      <CardCvcElement
                        id="cardCvc"
                        options={{
                          placeholder: "",
                          style: {
                            base: {
                              color: "white",
                              fontSize: "17px",
                              lineHeight: "40px",
                            },
                          },
                        }}
                        className="or-input"
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <Button
                      className="bg-success flex-1 order-btn"
                      disabled={btnAction}
                    >
                      {btnAction ? (
                        <Spinner size="md" />
                      ) : (
                        <>
                          Buy Now
                          <span className="inline-block sm:hidden">
                            &nbsp;| {pckg?.price || "..."} €
                          </span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
