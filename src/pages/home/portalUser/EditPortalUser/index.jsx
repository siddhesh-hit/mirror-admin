import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import add from "assets/back.svg";

import {
  getApiById,
  getApi,
  putApi,
} from "services/axios";
import { paths } from "services/paths";

const EditPortalUser = () => {
  const [server, setServer] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const [options, setOptions] = useState({
    designation: [],
    department: [],
    navigation: [],
    gender: [],
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const maxAllowedSize = 2.5 * 1024 * 1024;

    if (files) {
      if (
        files[0]?.type.startsWith("image/png") ||
        files[0]?.type.startsWith("image/jpeg") ||
        files[0]?.type.startsWith("image/jpg")
      ) {
        if (files[0].size > maxAllowedSize) {
          alert("Upload the file of size less than 2MB.");
        } else {
          setServer((prev) => ({
            ...prev,
            [name]: files[0],
          }));
        }
      } else {
        alert("Only upload JPEG/JPG/PNG format assets");
      }
    } else {
      setServer((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    if (
      server?.date_of_birth &&
      !(
        new Date().getFullYear() -
        new Date(server?.date_of_birth).getFullYear() >=
        18
      )
    ) {
      toast.error("Age is not above 18 year.");
      return;
    }

    if (server?.phone_number && server?.phone_number.toString().length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if (isSubmitted) return;
    setSubmit(true);

    const formData = new FormData();
    formData.append("data", JSON.stringify(server));
    formData.append("user_image", server.user_image);

    await putApi("user/admin", id, formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("User updated Successfully");
          navigate(paths.viewPortalUser);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    setSubmit(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getApiById("user/admin", id)
        .then((res) => {
          setServer(res.data.data);
          setServer((prev) => ({
            ...prev,
            date_of_birth: prev.date_of_birth.split("T")[0],
          }));
        })
        .catch((err) => console.log(err));

      await getApi("navigation")
        .then((res) => {
          if (res.data.success) {
            setOptions((prev) => ({
              ...prev,
              navigation: res.data.data,
            }));
          }
        })
        .catch((err) => console.log(err));

      await getApi(`portalBranch`)
        .then((res) => {
          if (res.data.success) {
            setOptions((prev) => ({
              ...prev,
              designation: res.data.data,
            }));
          }
        })
        .catch((err) => console.log(err));

      await getApi(`portalDept`)
        .then((res) => {
          if (res.data.success) {
            setOptions((prev) => ({
              ...prev,
              department: res.data.data,
            }));
          }
        })
        .catch((err) => console.log(err));

      await getApi(`gender`)
        .then((res) => {
          if (res.data.success) {
            setOptions((prev) => ({
              ...prev,
              gender: res.data.data,
            }));
          }
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewPortalUser} className="addpagess">
          <img src={add} style={{ width: "25px" }} alt="back" />
          Go back
        </Link>
        <h4 className="page-title">• Edit Portal User</h4>
        <div className="card card-info">
          <div className="row pt-5 pb-5">
            <div className="col-lg-11">
              <form className="form-horizontal">
                <div className="card-body">
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Name :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="full_name"
                        defaultValue={server?.full_name}
                        onChange={handleChange}
                        className="form-control mb-3"
                        placeholder="Enter Name"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Houses :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="houses"
                        value={server?.houses}
                        onChange={handleChange}
                      >
                        <option hidden>Select Houses</option>
                        <option value={"Assembly"}> Assembly</option>
                        <option value={"Council"}>Council</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Department :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="department"
                        value={server?.department}
                        onChange={handleChange}
                      >
                        <option hidden>Select Department</option>
                        {options?.department?.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item.english.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Designation :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="designation"
                        value={server?.designation}
                        onChange={handleChange}
                      >
                        <option hidden>Select Designation</option>
                        {options?.designation?.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item.english.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Email Id :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="email"
                        defaultValue={server?.email}
                        onChange={handleChange}
                        className="form-control mb-3"
                        placeholder="Enter Email id"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Mobile Number :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="phone_number"
                        defaultValue={server?.phone_number}
                        onChange={handleChange}
                        className="form-control mb-3"
                        placeholder="Enter Mobile Number"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Date Of Birth :
                    </label>
                    <div className="col-sm-9">
                      <DatePicker
                        value={dayjs(server?.date_of_birth)}
                        label="Select your date of birth"
                        onChange={(date) => {
                          setServer((prev) => ({
                            ...prev,
                            date_of_birth: date,
                          }));
                        }}
                        format={"DD-MM-YYYY"}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Gender :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="gender"
                        value={server?.gender}
                        onChange={handleChange}
                      >
                        <option hidden>Enter Gender</option>
                        {options?.gender?.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item?.english?.gender}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Interest Area :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="interest_area"
                        value={server?.interest_area}
                        onChange={handleChange}
                      >
                        <option hidden>Select Interest Area</option>
                        {options?.navigation?.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item?.english?.navigation}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Profile :
                    </label>
                    <div className="col-sm-9">
                      <div className="custom-file">
                        <input
                          type="file"
                          title={
                            server?.user_image?.name ||
                            server?.user_image?.filename
                          }
                          accept="image/pne, image/jpg, image/jpeg"
                          name="user_image"
                          onChange={handleChange}
                          className="custom-file-input"
                          id="customFile"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Profile -{" "}
                          {server?.user_image?.name ||
                            server?.user_image?.filename}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <button className="submit123" onClick={() => handleSubmit()}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPortalUser;
