import React, { ReactNode, FC, useState } from "react";
import AdminNav from "components/Header/AdminNav";
import { Helmet } from "react-helmet";
import Logo from "shared/Logo/Logo";
import AdminSideNav from "shared/Navigation/AdminSideNav";
import { Link } from "react-router-dom";

export interface PortalWrapperProps {
  children: ReactNode;
}

const PortalWrapper: FC<PortalWrapperProps> = ({ children }) => {
  const [openSideBar, setOpenSideBar] = useState(true);

  return (
    <>
      <Helmet>
        <title>Dashboard - Stopthefake - Legit-check your item</title>
      </Helmet>
      <div className={`${!openSideBar && "portalWrapper-sidebar-toggle"}`}>
        <main className="portalWrapper-main">
          <div className="portalWrapper-main-nav border-b-2 border-neutral-0 dark:border-neutral-800 dark:bg-neutral-900 bg-white">
            <AdminNav setOpenSideBar={setOpenSideBar} />
          </div>
          <div className="portalWrapper-main-content p-3">{children}</div>
          <p className="text-center mt-12 mb-3">
            Copyrights &copy; {new Date().getFullYear()}. All rights reserved.{" "}
            <Link to="/">StopTheFake.fr</Link>
          </p>
        </main>

        <aside
          className={`portalWrapper-sidebar border-r-2 border-neutral-0 dark:border-neutral-800 bg-white dark:bg-neutral-900`}
          id="portalWrapper-sidebar"
        >
          <div className="portalWrapper-sidebar-logo border-b-2 dark:border-neutral-800 border-neutral-0">
            <div
              className="portalWrapper-sidebar-close hover:bg-gray-100 dark:hover:bg-neutral-800"
              onClick={() => setOpenSideBar(true)}
            >
              &times;
            </div>
            <Logo />
          </div>
          <AdminSideNav />
        </aside>
        <br style={{ clear: "both" }} />
      </div>
    </>
  );
};

export default PortalWrapper;
