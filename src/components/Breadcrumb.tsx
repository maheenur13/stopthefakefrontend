import { HomeIcon } from "@heroicons/react/outline";
import { useAuth } from "contexts/AuthContext";
import React, { FC } from "react";

interface BreadcrumbProps {
  page: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ page }) => {
  const { user } = useAuth();

  return (
    <div className="bg-primary-100 dark:bg-neutral-800/50 p-5 rounded-md mb-10">
      <div className="flex flex-col md:flex-row items-center">
        <h1 className="font-bold text-lg mr-12">
          Hello {user ? user["name"] : "Eden Tuan"}
        </h1>
        <h5 className="flex items-center">
          <span className="mx-1">
            <HomeIcon width={24} height={24} />
          </span>
          <span className="mx-1">&gt;&gt;</span>
          <span className="mx-1">Home</span>
          <span className="mx-1">&gt;&gt;</span>
          <span className="mx-1">{page}</span>
        </h5>
      </div>
    </div>
  );
};

export default Breadcrumb;
