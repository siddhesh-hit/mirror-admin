import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import add from "assets/add.svg";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { getApi } from "services/axios";
import { paths } from "services/paths";
import { removeTailingId } from "data/RouteStructure";

const ViewContact = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getApi("/contact")
        .then((res) => {
          if (res.data.success) {
            setData(res.data.data);
          }
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link className="addpagess" to={paths.addContact}>
            <img src={add} alt="add" />
            Add Contact Us
          </Link>
          <h4 className="page-title">• View Contact Us</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>Email</th>
                      <th>Fax Number</th>
                      <th>Legislature No</th>
                      <th>Active</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data?.length > 0 &&
                      data?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h4
                              dangerouslySetInnerHTML={{
                                __html: item?.english?.address,
                              }}
                            ></h4>
                          </td>
                          <td>
                            <h4>{item?.english?.email}</h4>
                          </td>
                          <td>
                            <h4>{item?.english?.fax}</h4>
                          </td>
                          <td>
                            <h4>{item?.english?.telephone}</h4>
                          </td>
                          <td>
                            <h4>{item?.isActive ? "Active" : "Inactive"}</h4>
                          </td>
                          <td>
                            <Link to={`${removeTailingId(paths.editContact)}/${item._id}`}>
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Edit the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i
                                  className="fa fa-edit"
                                  aria-hidden="true"
                                ></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                          <td>
                            <Link to="/">
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Delete the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                        </tr>
                      ))}
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

export default ViewContact;
