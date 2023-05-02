import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};
  "/home2"?: {};
  //
  "/nft-detailt"?: {};
  "/page-collection"?: {};
  "/page-search"?: {};
  "/page-author"?: {};
  "/page-upload-item"?: {};
  "/home-header-2"?: {};
  "/connect-wallet"?: {};
  //
  "/account"?: {};
  //
  "/real-vs-fake"?: {};
  "/blog"?: {};
  "/blog-single"?: {};

  "/about"?: {};
  "/contact"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/forgot-pass"?: {};
  "/page404"?: {};
  "/subscription"?: {};
  "/faqs"?: {};
  "/privacy-policy"?: {};
  "/terms-and-conditions"?: {};

  "/dashboard"?: {};
  "/my-legit-checks"?: {};
  "/users"?: {};
  "/update-item"?: {};
  "/historical"?: {};
  "/forgot-password"?: {};
  "/reset-password"?: {};
  "/my-requests"?: {};
  "/edit-profile"?: {};
  "/legitcheck"?: {};
  "/library"?: {};
  "/post/new"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  // path: PathName;
  path: string;
  exact?: boolean;
  component: ComponentType<Object>;
  isProtected?: boolean;
}
