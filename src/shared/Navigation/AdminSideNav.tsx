import { Disclosure } from "@headlessui/react";
import {
  DocumentTextIcon,
  HomeIcon,
  PencilAltIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { NAVIGATION_SIDE } from "data/sideNavigation";
import React from "react";
import { NavLink } from "react-router-dom";
import { NavItemType } from "./NavigationItem";

export interface AdminSideNavProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const AdminSideNav: React.FC<AdminSideNavProps> = ({
  data = NAVIGATION_SIDE,
  onClickClose,
}) => {
  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <NavLink
              exact
              strict
              to={{
                pathname: i.href || undefined,
              }}
              className="flex px-4 py-2.5 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px]"
              activeClassName="text-secondary"
            >
              <span
                className={!i.children ? "block w-full" : ""}
                onClick={onClickClose}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="block flex-grow"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="flex justify-end flex-grow"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </NavLink>
            {i.children && (
              <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <NavLink
          exact
          strict
          className="adminSideBarMenuItem flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          to={{
            pathname: item.href || undefined,
          }}
          activeClassName="text-secondary"
        >
          <span
            className={`${
              !item.children ? "block w-full" : ""
            } flex items-center`}
            onClick={onClickClose}
          >
            {item.icon && item.icon === "dashboard" ? (
              <HomeIcon width={24} height={24} className="mr-3" />
            ) : item.icon === "legit-checks" ? (
              <ShieldCheckIcon width={24} height={24} className="mr-3" />
            ) : item.icon === "users" ? (
              <UsersIcon width={24} height={24} className="mr-3" />
            ) : item.icon === "editors" ? (
              <PencilAltIcon width={24} height={24} className="mr-3" />
            ) : item.icon === "library" ? (
              <DocumentTextIcon width={24} height={24} className="mr-3" />
            ) : null}
            {item.name}
          </span>
          {item.children && (
            <span
              className="block flex-grow"
              onClick={(e) => e.preventDefault()}
            >
              <Disclosure.Button
                as="span"
                className="flex justify-end flex-grow"
              >
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </NavLink>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  return (
    <div className="overflow-y-auto w-full max-w-sm py-2">
      <ul className="flex flex-col py-6 px-2 space-y-1 sidebar-nav">
        {data.map(_renderItem)}
      </ul>
    </div>
  );
};

export default AdminSideNav;
