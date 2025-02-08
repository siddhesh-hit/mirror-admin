import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { auth, removeTailingId } from "data/RouteStructure";
import { getApi } from "services/axiosInterceptors";
import { Link } from "react-router-dom";
import { paths } from "services/paths";

const UserRole = () => {
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);

  const fetchData = async (role) => {
    await getApi(`user/roletask/query?role=${role}`)
      .then((res) => setRoles(res.data.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <div className="panell">Role Based User Access Management System</div>
          <div className="usetype">
            <h3>• User Type</h3>
            <select
              className="form-control"
              defaultValue={role}
              onChange={(e) => {
                setRole(e.target.value);
                setRoles([]);
                fetchData(e.target.value);
              }}
            >
              <option hidden>Select a role type</option>
              {auth.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {roles?.length > 0 ? (
              <table className="table table-striped table-bordered mb-0 mt-5 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Authorities</th>
                    <th>Create</th>
                    <th>View</th>
                    <th>Update</th>
                    <th>Delete</th>
                    <th>User</th>
                    <th>Download</th>
                    <th>Upload</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {roles?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <h4>{item?.userId?.full_name}</h4>
                      </td>
                      <td>
                        <p>{item?.role}</p>
                      </td>
                      <td className="markyesorno">
                        <div>
                          {item?.permission?.includes("create") ? (
                            <i class="fa-solid fa-check"></i>
                          ) : (
                            <i class="fa-solid fa-xmark"></i>
                          )}
                        </div>
                      </td>
                      <td className="markyesorno">
                        <div>
                          {item?.permission?.includes("read") ? (
                            <i class="fa-solid fa-check"></i>
                          ) : (
                            <i class="fa-solid fa-xmark"></i>
                          )}
                        </div>
                      </td>
                      <td className="markyesorno">
                        <div>
                          {item?.permission?.includes("update") ? (
                            <i class="fa-solid fa-check"></i>
                          ) : (
                            <i class="fa-solid fa-xmark"></i>
                          )}
                        </div>
                      </td>
                      <td className="markyesorno">
                        <div>
                          {item?.permission?.includes("delete") ? (
                            <i class="fa-solid fa-check"></i>
                          ) : (
                            <i class="fa-solid fa-xmark"></i>
                          )}
                        </div>
                      </td>
                      <td className="markyesorno">
                        <div>
                          {item?.permission?.includes("user") ? (
                            <i class="fa-solid fa-check"></i>
                          ) : (
                            <i class="fa-solid fa-xmark"></i>
                          )}
                        </div>
                      </td>
                      <td className="markyesorno">
                        <div>
                          {item?.permission?.includes("download") ? (
                            <i class="fa-solid fa-check"></i>
                          ) : (
                            <i class="fa-solid fa-xmark"></i>
                          )}
                        </div>
                      </td>
                      <td className="markyesorno">
                        <div>
                          {item?.permission?.includes("upload") ? (
                            <i class="fa-solid fa-check"></i>
                          ) : (
                            <i class="fa-solid fa-xmark"></i>
                          )}
                        </div>
                      </td>
                      <td>
                        <Link to={`${removeTailingId(paths.editRole)}/${item._id}`}>
                          <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>Edit the data.</Tooltip>
                            )}
                            placement="bottom"
                          >
                            <i className="fa fa-edit" aria-hidden="true"></i>
                          </OverlayTrigger>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRole;
