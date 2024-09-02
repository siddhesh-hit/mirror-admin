import React, { useState, useEffect } from "react";
import ShowingEntries from "components/common/ShowingEntries";
import JumpTo from "components/common/JumpTo";

const Pagination = ({ totalCount, perPage, handlePageChange, initialPage }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const numberOfPages = Math.ceil(totalCount / perPage);
  const pageToShow = 5;
  const displayPage = [];

  const countPagesToShow = () => {
    displayPage.length = 0;
    if (numberOfPages <= pageToShow) {
      for (let i = 0; i < numberOfPages; i++) {
        displayPage.push(i);
      }
    } else {
      const lastPage = numberOfPages - 1;

      if (currentPage <= pageToShow / 2 + 1) {
        for (let i = 0; i < pageToShow && i < numberOfPages; i++) {
          displayPage.push(i);
        }
        if (numberOfPages > pageToShow) {
          displayPage.push("...");
          displayPage.push(lastPage);
        }
      } else if (currentPage >= numberOfPages - pageToShow / 2) {
        displayPage.push(0);
        displayPage.push("...");
        for (
          let i = Math.max(lastPage - pageToShow + 1, 1);
          i <= lastPage;
          i++
        ) {
          displayPage.push(i);
        }
      } else {
        displayPage.push(0);
        displayPage.push("...");
        for (
          let i = Math.max(currentPage - Math.floor(pageToShow / 2), 1);
          i <= Math.min(currentPage + Math.floor(pageToShow / 2), lastPage);
          i++
        ) {
          displayPage.push(i);
        }
        displayPage.push("...");
        displayPage.push(lastPage);
      }
    }
    return displayPage;
  };

  const handleClick = (page) => {
    if (page >= 0 && page < numberOfPages + 1) {
      setCurrentPage(page);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numberOfPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageLinks = () => {
    return countPagesToShow().map((page, index) => (
      <span
        className={`${page === currentPage ? "active" : "inactive"}`}
        key={index}
        onClick={() => handleClick(page)}
      >
        {page === "..." ? page : page + 1}
      </span>
    ));
  };

  useEffect(() => {
    handlePageChange(currentPage);
  }, [currentPage]);

  return (
    <div className="paginationcss">
      <ShowingEntries
        start={initialPage * perPage + 1}
        end={
          (initialPage + 1) * perPage > totalCount
            ? totalCount
            : (initialPage + 1) * perPage
        }
        total={totalCount}
      />

      {/*  <JumpTo
        currentPage={initialPage}
        total={numberOfPages}
        setCurrentPage={setCurrentPage}
        className="form-control"
      /> */}

      <div className="paginationnew">
        <button onClick={goToPrevPage} disabled={currentPage === 0}>
          «
        </button>
        {renderPageLinks()}
        <button
          onClick={goToNextPage}
          disabled={currentPage === numberOfPages - 1}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
