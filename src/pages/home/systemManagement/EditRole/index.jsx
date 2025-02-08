import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getApi, putApi } from "services/axiosInterceptors";
import { toast } from "react-toastify";
import { paths } from "services/paths";

const EditRole = () => {
  const [role, setRole] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const pathnameArray = location.pathname?.split("/");
  const id = location.pathname?.split("/")[pathnameArray.length - 1];

  const handleChange = (e) => {
    let bool = e.target.checked;
    let name = e.target.name;

    console.log(bool);

    if (bool) {
      alert(`${name.toUpperCase()} added in permission.`);
      setRole((prev) => ({
        ...prev,
        permission: [...prev.permission, name],
      }));
    } else {
      console.log("ko");
      if (role?.permission.includes(name)) {
        alert(`${name.toUpperCase()} removed from permission.`);

        let index = role?.permission.indexOf(name);
        let oldArr = role?.permission;
        oldArr.splice(index, 1);
        setRole((prev) => ({
          ...prev,
          permission: oldArr,
        }));
      }
    }
  };

  const fetchData = async () => {
    await getApi(`/user/roletask/${id}`)
      .then((res) => setRole(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setSubmit(true);
    await putApi(`/user/roletask`, id, role)
      .then((res) => {
        if (res.data.success) {
          navigate(paths.userRole);
          toast.success("Updated permission");
        }
      })
      .catch((err) => toast.error(err));

    setSubmit(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <div className="panell">Edit Role Based Access</div>
          <div className="usetype">
            <h3>• {role?.userId?.full_name}</h3>

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
                </tr>
              </thead>
              <tbody>
                {role && (
                  <tr>
                    <td>
                      <h4>{role?.userId?.full_name}</h4>
                    </td>
                    <td>
                      <p>{role?.role}</p>
                    </td>
                    <td className="markyesorno">
                      <div>
                        <input
                          type="checkbox"
                          name="create"
                          onChange={handleChange}
                          checked={role?.permission?.includes("create")}
                        />
                      </div>
                    </td>
                    <td className="markyesorno">
                      <div>
                        <input
                          type="checkbox"
                          name="read"
                          onChange={handleChange}
                          checked={role?.permission?.includes("read")}
                        />
                      </div>
                    </td>
                    <td className="markyesorno">
                      <div>
                        <input
                          type="checkbox"
                          name="update"
                          onChange={handleChange}
                          checked={role?.permission?.includes("update")}
                        />
                      </div>
                    </td>
                    <td className="markyesorno">
                      <div>
                        <input
                          type="checkbox"
                          name="delete"
                          onChange={handleChange}
                          checked={role?.permission?.includes("delete")}
                        />
                      </div>
                    </td>
                    <td className="markyesorno">
                      <div>
                        <input
                          type="checkbox"
                          name="user"
                          onChange={handleChange}
                          checked={role?.permission?.includes("user")}
                        />
                      </div>
                    </td>
                    <td className="markyesorno">
                      <div>
                        <input
                          type="checkbox"
                          name="download"
                          onChange={handleChange}
                          checked={role?.permission?.includes("download")}
                        />
                      </div>
                    </td>
                    <td className="markyesorno">
                      <div>
                        <input
                          type="checkbox"
                          name="upload"
                          onChange={handleChange}
                          defaultChecked={role?.permission?.includes("upload")}
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button className="submit123 mt-5" onClick={() => handleSubmit()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRole;
