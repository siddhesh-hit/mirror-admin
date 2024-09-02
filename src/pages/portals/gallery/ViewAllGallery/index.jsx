import { useState } from "react";

const ViewAllGallery = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => {
    setIsToggled(!isToggled);
  };
  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <h4 className="page-title">• View All Gallery</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Number</th>
                      <th>View</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <h4>1</h4>
                      </td>
                      <td>
                        <h4>1</h4>
                      </td>
                      <td>
                        <button>
                          View <i className="fa fa-eye" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <div
                          className={`toggle-button ${isToggled ? "active" : ""
                            }`}
                          onClick={toggle}
                        >
                          <div
                            className={`slider ${isToggled ? "active" : ""}`}
                          />
                          <div className="button-text">
                            {isToggled ? "Active" : "Inactive"}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllGallery;
