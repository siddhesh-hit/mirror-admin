import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";

import add from "assets/back.svg";

import { getApiById, putApi } from "services/axiosInterceptors";
import { paths } from "services/paths";

const ResetPortalUser = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});

  const location = useLocation();
  const id = location.search.split("=")[1];
  const navigate = useNavigate();

  const userResetPasswordValidation = async (data) => {
    let userRegisterSchema = Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
        )
        .label("Password"),
      passwordInput: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });
    let validationErrors = await userRegisterSchema
      .validate(data, { abortEarly: false })
      .catch((e) => e);
    if (validationErrors.errors && validationErrors.errors.length > 0) {
      return validationErrors.errors[0];
    } else {
      return null;
    }
  };

  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const fetchData = async () => {
    await getApiById("user", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = async () => {
    const validateUser = await userResetPasswordValidation({
      password,
      passwordInput,
    });

    if (validateUser) {
      toast.error(validateUser);
      return;
    }

    data.password = password;

    await putApi("user/resetAdmin", id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success("User password changed!");
          setTimeout(() => {
            navigate(paths.viewPortalUser);
          }, 1110);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewPortalUser} className="addpagess">
          <img src={add} style={{ width: "25px" }} alt="back" />
          Go back
        </Link>
        <h4 className="page-title">• Reset password</h4>
        <div className="card card-info">
          <div className="row pt-5 pb-5">
            <div className="col-lg-11">
              <form className="form-horizontal">
                <div className="card-body">
                  <p className="rest_pass">
                    Enter your new password to reset your password
                  </p>

                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Password :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type={passwordType === "password" ? "password" : "text"}
                        placeholder="Enter the password"
                        name="password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Password Again :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type={passwordType === "password" ? "password" : "text"}
                        placeholder="Enter the password again"
                        name="password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        defaultValue={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="form-control"
                      />
                      <div className="input-group-btn">
                        <span onClick={togglePassword}>
                          {passwordType === "password" ? (
                            <i className="fa fa-eye-slash"></i>
                          ) : (
                            <i className="fa fa-eye"></i>
                          )}
                        </span>
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

export default ResetPortalUser;
