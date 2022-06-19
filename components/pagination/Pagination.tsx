/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";
import {
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
  mdiChevronLeft,
  mdiChevronRight,
} from "@mdi/js";
import Icon from "@mdi/react";
import { PageQueryResponseDataPageInfoType } from "anime";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";

const PaginationBar = styled("div")<{}>({
  clear: "both",
  textAlign: "center",
  marginBottom: "1rem"
});

type PaginationNumberProps = {
  isActive?: boolean;
  disabled?: boolean;
};

const PaginationNumber = styled("a")<PaginationNumberProps>(
  {
    display: "inline-block",
    width: "40px",
    height: "40px",
    borderRadius: "5px",
    boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
    lineHeight: "2.6",
    fontSize: "1em",
    WebkitTransition: ".3s ease",
    transition: ".3s ease",
  },
  (props: PaginationNumberProps): CSSObject => {
    let propsDependedAttributes: CSSObject = {
      background: "#e7e7e7",
      color: "#84878d",
      "&:hover": {
        background: "#ffaa3c",
        color: "white",
      },
    };
    if (props.isActive && !props.disabled) {
      propsDependedAttributes = {
        ...propsDependedAttributes,
        background: "#ffaa3c",
        color: "white",
      };
    } else if (props.disabled) {
      propsDependedAttributes = {
        ...propsDependedAttributes,
        color: "#aaaaaa",
        "&:hover": {
          color: "#aaaaaa",
        },
      };
    }
    return propsDependedAttributes;
  }
);

type propsType = {
  pageInfo: PageQueryResponseDataPageInfoType;
};

const Pagination = (props: propsType): ReactElement => {
  const [paginationNumbers, setPaginationNumbers] = useState([1]);

  const { total, currentPage, lastPage, hasNextPage, perPage } = props.pageInfo;

  useEffect(() => {
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
    <>
      <PaginationBar>
        <PaginationNumber disabled={currentPage === 1}>
          <Link href={currentPage === 1 ? "#" : `?page=${currentPage - 1}`}>
            <Icon size={0.8} path={mdiChevronLeft} />
          </Link>
        </PaginationNumber>
        <PaginationNumber>
          <Link href={"?page=1"}>
            <Icon size={0.8} path={mdiChevronDoubleLeft} />
          </Link>
        </PaginationNumber>
        {paginationNumbers.map((page: number) => {
          return (
            <PaginationNumber key={page} isActive={page === currentPage}>
              <Link href={`?page=${page}`}>
                <p>{page}</p>
              </Link>
            </PaginationNumber>
          );
        })}
        <PaginationNumber>
          <Link href={`?page=${lastPage}`}>
            <Icon size={0.8} path={mdiChevronDoubleRight} />
          </Link>
        </PaginationNumber>
        <PaginationNumber disabled={currentPage === lastPage}>
          <Link
            href={currentPage === lastPage ? "#" : `?page=${currentPage + 1}`}
          >
            <Icon size={0.8} path={mdiChevronRight} />
          </Link>
        </PaginationNumber>
      </PaginationBar>
    </>
  );
};

export default Pagination;
