import Logo from "shared/Logo/Logo";
import SocialsList1 from "shared/SocialsList1/SocialsList1";
import { CustomLink } from "data/types";
import React from "react";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "/about", label: "About stopthefake" },
      { href: "/legitcheck", label: "Explore our legitcheck" },
      { href: "/privacy-policy", label: "PRIVACY POLICY" },
      { href: "/terms-and-conditions", label: "TERM AND CONDITIONS" },
    ],
  },
  {
    id: "2",
    title: "Support",
    menus: [
      { href: "/faqs", label: "FAQ" },
      { href: "#", label: "contact@stopthefake.fr" },
    ],
  },
  // {
  //   id: "4",
  //   title: "Social media",
  //   menus: [
  //     { href: "#", label: "instagram" },
  //     { href: "#", label: "Tiktok" },
  //     { href: "#", label: "twitter" },
  //     { href: "#", label: "Youtube" },
  //   ],
  // },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="nc-Footer relative py-20 lg:pt-32 lg:pb-28 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
          {/* <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
          </div> */}
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
        <div className="text-sm">
          <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
            Social Media
          </h2>
          <ul className="mt-5 space-y-4"></ul>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
          </div>
        </div>
      </div>
      <div className="text-center mt-12 mb-3">
        <p>Copyrights © 2021. All rights reserved. stopthefake.fr</p>
      </div>
    </div>
  );
};

export default Footer;
