function Loader() {
  return (
    <>
      {/* <Spinner animation="border" size="sm" /> */}
      {/* <Spinner animation="grow" size="sm" /> */}
      {/* <Spinner animation="grow" /> */}

      <section className="wrapper">
        <div className="card">
          <div className="loading">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Loader;
