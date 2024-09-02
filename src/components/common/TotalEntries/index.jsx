import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

const TotalEntries = ({
  returnCount,
  returnSearch,
  searchQuery = "the message",
}) => {
  const [selectValue, setSelectValue] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    returnCount(selectValue);
  }, [selectValue]);

  useEffect(() => {
    returnSearch(search);
  }, [search]);

  return (
    <div>
      <Row>
        <Col lg={6}>
          <div className="dt-length">
            <select
              onChange={(e) => setSelectValue(e.target.value)}
              name="example_length"
              aria-controls="example"
              className="dt-length-control"
              id="dt-length-0"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <label htmlFor="dt-length-0"> entries per page</label>
          </div>
        </Col>
        <Col lg={6}>
          <div className="col-md-auto ml-auto ">
            <div className="dt-search">
              <label htmlFor="dt-search-0">Search:</label>
              <input
                type="search"
                placeholder={`Search ${searchQuery}`}
                className="searchtext"
                id="dt-search-0"
                aria-controls="example"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TotalEntries;
