import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import logo from "assets/logo.svg";

import { postApi } from "services/axios";
import { login } from "sredux/authSlice";
import { encrypt } from "lib/encrypt";
import Captcha from "components/common/Captcha";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  // const naviagte = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [captcha, setCaptcha] = useState(false);
  const [isSubmitted, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const captchaRef = useRef();

  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!email) {
  //     newErrors.email = "Email is mandatory";
  //   } else if (!/\S+@\S+\.\S+/.test(email)) {
  //     newErrors.email = "Please enter valid email address";
  //   } else if (!password) {
  //     newErrors.password = "Password is mandatory";
  //   }

  //   setErrors(newErrors);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validateForm();

    if (!email || !password) {
      toast.error("Fill the fields first!");
      if (captchaRef.current) {
        captchaRef.current?.reset();
        setCaptcha(null);
      }
      return;
    }

    if (!captcha) {
      toast.error("Captcha is filled wrong");
      if (captchaRef.current) {
        captchaRef.current?.reset();
        setCaptcha(null);
      }
      return;
    }

    if (Object.keys(errors).every((key) => errors[key] === "")) {
      const data = { email, password };

      if (isSubmitted) return;

      setSubmit(true);
      await postApi("user/loginEmail", data)
        .then((res) => {
          if (res.data && res.data.success) {
            setErrors((pre) => ({ ...pre, error: false }));
            toast.success("Login Successfully");

            let enData = encrypt(res.data.data);
            localStorage.setItem("userInfo", enData);
            dispatch(login(enData));

            setTimeout(() => {
              window.location.href = "/Dashboard";
            }, 1100);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to Sign in");
          err.data && setErrors((pre) => ({ ...pre, error: true }));
          if (captchaRef.current) {
            captchaRef.current?.reset();
            setCaptcha(null);
          }
        });
    }
    setSubmit(false);
  };

  return (
    <div className="container-fluid loginboxpage" style={{ height: "100vh" }}>
      <img src={logo} alt="logo" className="loginbg" />
      <div className="container">
        <Row className="justify-content-center">
          <Col lg={6} md={6} sm={12} xs={12}>
            <form className="login-boxs" onSubmit={handleSubmit}>
              <h3 className="mb-4">
                To sign in, please
                <br />
                enter your Email Address
              </h3>
              <InputGroup className="mb-4">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email ID"
                  aria-label="Email ID"
                  aria-describedby="basic-addon1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                // onBlur={validateForm} // Validate on blur
                />
              </InputGroup>
              {errors.email && <p className="error">{errors.email}</p>}
              <InputGroup className="mb-4">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </InputGroup.Text>
                <Form.Control
                  type={passwordType === "password" ? "password" : "text"}
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                // onBlur={validateForm} // Validate on blur
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
              </InputGroup>
              {errors.password && <p className="error">{errors.password}</p>}
              {errors.error && (
                <p className="error">{"something went wromg"}</p>
              )}

              {/* <Captcha getIsCurrent={getIsCurrent} /> */}
              <ReCAPTCHA ref={captchaRef} sitekey={process.env.REACT_APP_CAPTCHA_V2} onChange={data => setCaptcha(data)} />

              <Button type="submit" variant="primary" className="mt-3">
                Sign In
              </Button>
              {/* <Link to="/Forgetpassword" className="new_account">
                Forgot password ?
              </Link> */}
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
