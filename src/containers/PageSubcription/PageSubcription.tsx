import { CheckIcon } from "@heroicons/react/solid";
import { FC, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Helmet } from "react-helmet";
import HeaderLogged from "components/Header/HeaderLogged";
import Footer from "shared/Footer/Footer";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useAuth } from "contexts/AuthContext";
import { useHistory, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

export interface PageSubcriptionProps {
  className?: string;
}

export interface PricingItem {
  id: number;
  isPopular: boolean;
  name: string;
  pricing: string;

  features: string[];
}

export const pricings: PricingItem[] = [
  {
    id: 2,
    isPopular: false,
    name: "Starter",
    pricing: "2,90€",
    features: [
      "1 Token",
      "Results within 3 Hours",
      "Double authentification", 
      "certificate of authenticity by email",
      
    ],
  },
  {
    id: 1,
    isPopular: true,
    name: "POPULAR",
    pricing: "3,90€",
    features: [
      "2 Token",
      "Results within 30 Min",
      "Double authentification",
      "certificate of authenticity by email",
    ],
  },
  {
    id: 3,
    isPopular: false,
    name: "EXPRESS",
    pricing: "4,90€",

    features: [
      "3 Token",
      "Results within 15 Min",
      "Double authentification",
      "certificate of authenticity by email",
    ],
  },
  {
    id: 8,
    isPopular: false,
    name: "VIP",
    pricing: "149,90€",

    features: [
      "150 Token",
      "VIP offers",
      
    ],
  },
  {
    id: 4,
    isPopular: false,
    name: "VETERANS",
    pricing: "14,90€",

    features: ["10 Token", "Veterans offers"],
  },
  {
    id: 5,
    isPopular: false,
    name: "RESELLER’S",
    pricing: "89,90€",

    features: ["70 Token", "Reseller’s offers"],
  },
];

const PageSubcription: FC<PageSubcriptionProps> = ({ className = "" }) => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.hostname + window.location.search,
      title: "Pricing Page",
    });
  }, []);

  const { token, setUser } = useAuth();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const pkgId = search.get("pkgId");
  const history = useHistory();

  const handlePaymentCancel = async () => {
    const sessionId = localStorage.getItem("sessId");
    localStorage.removeItem("sessId");
    await axios
      .post(
        "/subscription/credits",
        { pkgId, sessionId },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      )
      .then((resp: any) => {
        setUser((prev: any) => ({ ...prev, credits: resp.data.credits }));
        toast.success(resp.data.message);
        history.push("/subscription");
      })
      .catch((err: any) => console.error(err.message));
  };

  useEffect(() => {
    if (pkgId) {
      handlePaymentCancel();
    }
  });

  const handlePackageBuy = async (id: number) => {
    await axios
      .post(
        "/subscription",
        { pkgId: id },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      )
      .then((resp: any) => {
        localStorage.setItem("sessId", resp.data.id);
        window.location = resp.data.url;
      })
      .catch((err: any) => {
        toast.error(
          err.response?.data ? err.response?.data?.message : err.message
        );
      });
  };

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
      <Helmet>
        <title>Stopthefake - Legit-check your item</title>
      </Helmet>
      <div
        className={`nc-PageSubcription container pb-24 lg:pb-32 ${className}`}
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
      <Footer />
    </>
  );
};

export default PageSubcription;
