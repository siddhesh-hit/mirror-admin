import React from "react";

const JumpTo = (props) => {
  const { currentPage, total, setCurrentPage, className } = props;

  return (
    <input
      type="number"
      defaultValue={currentPage}
      min={0}
      max={total - 1}
      onChange={(e) => setCurrentPage(e.target.value)}
      //   className={className}
    />
  );
};

export default JumpTo;
