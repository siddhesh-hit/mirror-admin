import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import add from "assets/back.svg";

import { getApi, postApi } from "services/axiosInterceptors";
import { paths } from "services/paths";

const AddPortalUser = () => {
  const [isSubmitted, setSubmit] = useState(false);

  const [data, setData] = useState({
    full_name: "",
    houses: "",
    department: "",
    designation: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    interest_area: "",
    user_image: "",
  });

  const [options, setOptions] = useState({
    designation: [],
    department: [],
    navigation: [],
    gender: [],
  });

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
          setData((prev) => ({
            ...prev,
            [name]: files[0],
          }));
        }
      } else {
        alert("Only upload JPEG/JPG/PNG format assets");
      }
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      data.date_of_birth &&
      !(
        new Date().getFullYear() - new Date(data.date_of_birth).getFullYear() >=
        18
      )
    ) {
      toast.error("Age is not above 18 year.");
      return;
    }
    console.log(data.phone_number.toString().length);
    if (data.phone_number && data.phone_number.toString().length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if (isSubmitted) return;
    setSubmit(true);

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("user_image", data.user_image);

    await postApi("/user/invite", formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("User Added Successfully");
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
        <Link className="addpagess" to={paths.viewPortalUser}>
          <img src={add} alt="back" style={{ width: 25 }} />
          Go back
        </Link>
        <h4 className="page-title">• Add Portal User</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-9">
              <form onSubmit={handleSubmit} className="form-horizontal">
                <div className="card-body">
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Name :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="full_name"
                        defaultValue={data.full_name}
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
                      Add Houses :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="houses"
                        defaultValue={data.houses}
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
                      Add Department :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="department"
                        defaultValue={data.department}
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
                      Add Designation :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="designation"
                        defaultValue={data.designation}
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
                      Add Email Id :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="email"
                        defaultValue={data.email}
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
                      Add Mobile Number :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="number"
                        name="phone_number"
                        defaultValue={data.phone_number}
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
                      Add Date Of Birth :
                    </label>
                    <div className="col-sm-9">
                      <DatePicker
                        name="date"
                        label="Select your date of birth"
                        defaultValue={dayjs("")}
                        onChange={(date) => {
                          setData((prev) => ({
                            ...prev,
                            date_of_birth: date.format(),
                          }));
                        }}
                        format="DD/MM/YYYY"
                        minDate={dayjs("1937-01-01")}
                        maxDate={dayjs(new Date().toISOString().split("T")[0])}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Gender :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="gender"
                        defaultValue={data.gender}
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
                      Add Interest Area :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="interest_area"
                        value={data.interest_area}
                        onChange={handleChange}
                      >
                        <option hidden>Enter Interest Area</option>
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
                      Add Profile :
                    </label>
                    <div className="col-sm-9">
                      <div className="custom-file">
                        <input
                          type="file"
                          title={data.user_image.name || "Please choose a file"}
                          name="user_image"
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={handleChange}
                          className="custom-file-input"
                          id="customFile"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Profile - {data.user_image.name || ""}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="submit123" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPortalUser;
