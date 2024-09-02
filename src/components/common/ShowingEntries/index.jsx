import React from "react";

const ShowingEntries = ({ start, end, total }) => {
  return (
    <>
      <div className="col-md-auto mr-auto ">
        <div
          className="dt-info"
          aria-live="polite"
          id="example_info"
          role="status"
        >
          Showing {start} to {end} of {total} entries
        </div>
      </div>
    </>
  );
};

export default ShowingEntries;
