import React, { FC } from "react";
import Heading from "components/Heading/Heading";
import Pagination from "shared/Pagination/Pagination";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import WidgetCategories from "./WidgetCategories";
import WidgetPosts from "./WidgetPosts";
import Card3 from "./Card3";
import Spinner from "components/Spinner";

//
export interface SectionLatestPostsProps {
  className?: string;
  postCardName?: "card3";
  posts?: any;
  postLoading?: boolean;
  popularPosts?: any;
  popularLoading?: boolean;
  count?: number;
  paginate?: any;
  dashboard?: boolean;
}

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
  postCardName = "card3",
  className = "",
  posts,
  postLoading,
  popularPosts,
  popularLoading,
  count,
  paginate,
  dashboard = false,
}) => {
  return (
    <div className={`nc-SectionLatestPosts relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        <div
          className={dashboard ? "w-full" : "w-full lg:w-3/5 xl:w-2/3 xl:pr-14"}
        >
          {!dashboard && <Heading>Latest Articles 🎈</Heading>}
          <div className={`grid gap-6 md:gap-8 grid-cols-1`}>
            {postLoading ? (
              <div className="flex items-center justify-center">
                <Spinner size="lg" />
              </div>
            ) : posts.length > 0 ? (
              posts?.map((post: any, index: number) => (
                <Card3 key={index} className="" post={post} />
              ))
            ) : (
              <p className="text-center">No posts to show.</p>
            )}
          </div>
          <div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination pageSize={10} total={count} paginate={paginate} />
            {/* <ButtonPrimary>Show me more</ButtonPrimary> */}
          </div>
        </div>
        {!dashboard && (
          <div className="w-full space-y-7 mt-24 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3 ">
            {/* <WidgetCategories /> */}
            {popularLoading ? (
              <div className="flex items-center justify-center">
                <Spinner size="lg" />
              </div>
            ) : popularPosts.length > 0 ? (
              <WidgetPosts posts={popularPosts} />
            ) : (
              <p className="text-center">No posts to show.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionLatestPosts;
