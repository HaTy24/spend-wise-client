import { FC } from "react";
import {
  DEFAULT_PAGE_INDEX,
  NUMBER_OF_SHOWING_PAGES,
} from "../models/contants";

interface Props {
  totalPages: number;
  pageIndex: number;
  onChange: (pageIndex: number) => void;
}

export const Pagination: FC<Props> = ({ totalPages, pageIndex, onChange }) => {
  const renderPages: any[] = [];

  if (
    totalPages <= NUMBER_OF_SHOWING_PAGES &&
    pageIndex < NUMBER_OF_SHOWING_PAGES - 1
  ) {
    for (let i = 0; i < totalPages; i++) {
      renderPages.push(i);
    }
  } else if (
    totalPages > NUMBER_OF_SHOWING_PAGES &&
    pageIndex < NUMBER_OF_SHOWING_PAGES - 1
  ) {
    for (let i = 0; i < NUMBER_OF_SHOWING_PAGES; i++) {
      renderPages.push(i);
    }
  } else if (totalPages - pageIndex <= 4) {
    renderPages.push(
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1
    );
  } else {
    renderPages.push(
      pageIndex - 2,
      pageIndex - 1,
      pageIndex,
      pageIndex + 1,
      pageIndex + 2
    );
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li
          role="button"
          className={`page-item ${
            pageIndex === DEFAULT_PAGE_INDEX ? "disabled" : ""
          }`}
          onClick={() => {
            if (pageIndex > DEFAULT_PAGE_INDEX) onChange(pageIndex - 1);
          }}
        >
          <a className="page-link pe-none" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pageIndex >= NUMBER_OF_SHOWING_PAGES - 1 &&
          totalPages - NUMBER_OF_SHOWING_PAGES > 1 && (
            <>
              <li
                role="button"
                className="page-item"
                onClick={() => onChange(DEFAULT_PAGE_INDEX)}
              >
                <a className="page-link pe-none">{DEFAULT_PAGE_INDEX + 1}</a>
              </li>
              <li className="page-item">
                <a className="page-link pe-none">...</a>
              </li>
            </>
          )}
        {renderPages.map((page) => (
          <li
            key={page}
            role="button"
            className={`page-item ${pageIndex === page ? "active" : ""}`}
            onClick={() => {
              if (pageIndex !== page) onChange(page);
            }}
          >
            <a className="page-link pe-none">{page + 1}</a>
          </li>
        ))}
        {totalPages - pageIndex > 4 && (
          <>
            {totalPages - NUMBER_OF_SHOWING_PAGES > 1 && (
              <li className="page-item">
                <a className="page-link pe-none">...</a>
              </li>
            )}
            <li
              role="button"
              className={`page-item ${
                pageIndex === totalPages - 1 ? "active" : ""
              }`}
              onClick={() => onChange(totalPages - 1)}
            >
              <a className="page-link pe-none">{totalPages}</a>
            </li>
          </>
        )}
        <li
          role="button"
          className={`page-item ${pageIndex === totalPages ? "disabled" : ""}`}
          onClick={() => {
            if (pageIndex < totalPages) onChange(pageIndex + 1);
          }}
        >
          <a className="page-link pe-none" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
