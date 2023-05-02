const app = {
  name: "StopTheFake",
  tagline: "Legit-check your item",
  appURL: process.env.REACT_APP_PUBLIC_URL,
  serverURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
  // trackingIdGA: "UA-250130798-3",
  measurementIdGA4: "G-BW6DCMPQK7",
  stripePublishableKey:
    "pk_live_51INKfkGxLlRUHBeTGpwTJyBZpMxT2QSpxNC2xrja28JyL1rBlVYExir2gkrtK1cyOZO7ezAmjb5SBablfEKOVjem007oEQqx5G",
};

export default app;
