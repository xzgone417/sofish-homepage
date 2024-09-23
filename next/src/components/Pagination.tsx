"use client";

import "@/styles/part/pagination.scss";

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 6;

    if (totalPages <= maxVisiblePages) {
      // 如果总页数小于或等于可见页数，直接显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={currentPage === i ? "active" : ""}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // 如果当前页码处于第一页到第四页之间
      if (currentPage <= maxVisiblePages - 2) {
        for (let i = 1; i <= maxVisiblePages - 1; i++) {
          pages.push(
            <button
              key={i}
              className={currentPage === i ? "active" : ""}
              onClick={() => onPageChange(i)}
            >
              {i}
            </button>
          );
        }
        pages.push(<span key="dots">...</span>);
        pages.push(
          <button key={totalPages} onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        );
      }
      // 如果当前页码接近末尾
      else if (currentPage > totalPages - (maxVisiblePages - 2)) {
        pages.push(
          <button key={1} onClick={() => onPageChange(1)}>
            1
          </button>
        );
        pages.push(<span key="dots">...</span>);
        for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
          pages.push(
            <button
              key={i}
              className={currentPage === i ? "active" : ""}
              onClick={() => onPageChange(i)}
            >
              {i}
            </button>
          );
        }
      }
      // 如果当前页码位于中间部分
      else {
        pages.push(
          <button key={1} onClick={() => onPageChange(1)}>
            1
          </button>
        );
        pages.push(<span key="dots-start">...</span>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(
            <button
              key={i}
              className={currentPage === i ? "active" : ""}
              onClick={() => onPageChange(i)}
            >
              {i}
            </button>
          );
        }
        pages.push(<span key="dots-end">...</span>);
        pages.push(
          <button key={totalPages} onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="pagination">
      {totalPages > 1 && (
        <>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="figure"
          >
            Pre
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="figure"
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
