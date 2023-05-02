import { useAuth } from "contexts/AuthContext";
import { useFullScreen } from "contexts/FullscreenContext";
import { Dispatch, FC, SetStateAction } from "react";
import ButtonCircle from "shared/Button/ButtonCircle";
import Input from "shared/Input/Input";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import AvatarDropdown2 from "./AvatarDropdown2";
import MailDropdown from "./MailDropdown";
import NotifyDropdown from "./NotifyDropdown";

interface AdminNavProps {
  setOpenSideBar: Dispatch<SetStateAction<boolean>>;
}

const AdminNav: FC<AdminNavProps> = ({ setOpenSideBar }) => {
  const { user, logout } = useAuth();
  const handle = useFullScreen();

  return (
    <div
      style={{ padding: "10px" }}
      className="flex md:flex-row flex-col items-center justify-between"
    >
      <div className="flex items-center">
        <div
          className="cursor-pointer group mx-3 p-3 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full inline-flex items-center text-base font-medium hover:text-opacity-100
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative"
          onClick={() => setOpenSideBar((prev: boolean) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        {/* <Logo /> */}
        {/* <div style={{ maxWidth: "450px" }}>
          <form
            className="relative w-full "
            method="post"
            style={{ height: "50px" }}
          >
            <label
              htmlFor="search-input"
              className="text-neutral-500 dark:text-neutral-300"
            >
              <span className="sr-only">Search all icons</span>
              <Input
                className="border-2 border-neutral-0 dark:border-neutral-800"
                id="search-input"
                type="search"
                placeholder="Search..."
                sizeClass="pl-14 py-5 pr-5 md:pl-16"
                rounded="rounded-full"
                style={{ height: "50px" }}
              />
              <ButtonCircle
            className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
            size=" w-11 h-11"
            type="submit"
          >
            <i className="las la-arrow-right text-xl"></i>
          </ButtonCircle>
              <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </label>
          </form>
        </div> */}
      </div>
      <div className="flex items-center">
        <SwitchDarkMode />
        {/* {handle?.handle.active ? ( */}
        {/* <div
            className="group cursor-pointer p-3 bg-gray-100 dark:bg-neutral-800 rounded-full inline-flex items-center text-base font-medium hover:text-opacity-100
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative"
            onClick={handle?.handle.exit}
          > */}
        {/* <span className="w-2 h-2 bg-blue-500 absolute top-2 right-2 rounded-full"></span> */}
        {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </div> */}
        {/* ) : ( */}
        {/* <div
            className="group cursor-pointer p-3 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full inline-flex items-center text-base font-medium hover:text-opacity-100
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative"
            onClick={handle?.handle.enter}
          > */}
        {/* <span className="w-2 h-2 bg-blue-500 absolute top-2 right-2 rounded-full"></span> */}
        {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </div> */}
        {/* )} */}
        {/* <NotifyDropdown />
        <MailDropdown /> */}
        <AvatarDropdown2 user={user} logout={logout} />
      </div>
    </div>
  );
};

export default AdminNav;
