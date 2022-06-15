import { mdiChevronDoubleLeft, mdiChevronDoubleRight } from "@mdi/js";
import Icon from "@mdi/react";
import { PageQueryResponseDataPageInfoType } from "anime";
import { isEmpty, toNumber } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

type propsType = {
  pageInfo: PageQueryResponseDataPageInfoType;
};

const Pagination = (props: propsType): ReactElement => {
  const [paginationNumbers, setPaginationNumbers] = useState([1]);

  const { total, currentPage, lastPage, hasNextPage, perPage } = props.pageInfo;

  useEffect(() => {
    console.log({ total, lastPage });
    let firstAvailablePage = currentPage - 4;
    if (firstAvailablePage < 0) firstAvailablePage = 1;
    let lastAvailablePage = firstAvailablePage + 9;
    if (lastAvailablePage > lastPage) {
      lastAvailablePage = lastPage;
      firstAvailablePage = lastPage - 9;
    }

    const pages = [];

    for (let p = firstAvailablePage; p <= lastAvailablePage; p++) {
      pages.push(p);
    }

    setPaginationNumbers(pages);
  }, [props.pageInfo]);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center my-5 flex-wrap">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <Link href={`?page=${currentPage - 1}`}>
            <a className="page-link">Previous</a>
          </Link>
        </li>
        <li className="page-item">
          <Link href="?page=1">
            <a className="page-link">
              <Icon size={0.7} path={mdiChevronDoubleLeft}></Icon>
            </a>
          </Link>
        </li>
        {paginationNumbers.map((page: number) => {
          return (
            <li
              className={`page-item ${page === currentPage ? "active" : ""}`}
              key={page}
            >
              <Link href={`?page=${page}`}>
                <a className="page-link">{page}</a>
              </Link>
            </li>
          );
        })}
        <li className="page-item">
          <Link href={`?page=${lastPage}`}>
            <a className="page-link">
              <Icon size={0.7} path={mdiChevronDoubleRight}></Icon>
            </a>
          </Link>
        </li>
        <li
          className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}
        >
          <Link href={`?page=${currentPage + 1}`}>
            <a className="page-link" href="#">
              Next
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
