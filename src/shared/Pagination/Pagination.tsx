import { FC } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";

const PagerItem = ({ page, currentPage }: any) => {
  return page == currentPage ? (
    <span
      className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
    >
      {page}
    </span>
  ) : (
    <Link
      className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
      to={
        "/page-search?page=" +
        (page === "<<" ? page - 1 : page === ">>" ? page + 1 : page)
      }
    >
      {page}
    </Link>
  );
};

export interface PaginationProps {
  className?: string;
  pageSize?: any;
  total?: any;
  paginate?: any;
}

const Pagination: FC<PaginationProps> = ({
  className = "",
  pageSize,
  total,
  paginate,
}) => {
  const totalPageCount = Math.ceil(total / pageSize);

  const handlePageChange = ({ selected }: any) => {
    paginate(selected + 1);
  };

  const pageCN = `inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`;

  const activeLCN = `inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`;

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      <ReactPaginate
        pageCount={totalPageCount}
        previousLabel={"<<"}
        nextLabel={">>"}
        onPageChange={handlePageChange}
        previousClassName={pageCN}
        nextClassName={pageCN}
        pageClassName={pageCN}
        breakClassName={pageCN}
        activeLinkClassName={activeLCN}
      />
    </nav>
  );
};

export default Pagination;
