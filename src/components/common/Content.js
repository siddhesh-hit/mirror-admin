import React from "react";

const Content = () => {
  return (
    <div
      className="content-wrapper pt-4"
    // style={{
    //   marginLeft: "-250px",
    // }}
    >
      <div className="contentofpages">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-sm-4 col-lg-4 mb-2">
              <div className="card card-primary card-outline">
                <div className="total_users">
                  <p className="">Total Users [Portal]</p>
                  <div className="d-flex cardpadding">
                    <h4>0</h4>
                    <svg
                      style={{ width: "55px" }}
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30 0C13.44 0 0 13.44 0 30C0 46.56 13.44 60 30 60C46.56 60 60 46.56 60 30C60 13.44 46.56 0 30 0ZM40.83 19.02C44.04 19.02 46.62 21.6 46.62 24.81C46.62 28.02 44.04 30.6 40.83 30.6C37.62 30.6 35.04 28.02 35.04 24.81C35.01 21.6 37.62 19.02 40.83 19.02ZM22.83 14.28C26.73 14.28 29.91 17.46 29.91 21.36C29.91 25.26 26.73 28.44 22.83 28.44C18.93 28.44 15.75 25.26 15.75 21.36C15.75 17.43 18.9 14.28 22.83 14.28ZM22.83 41.67V52.92C15.63 50.67 9.93 45.12 7.41 38.04C10.56 34.68 18.42 32.97 22.83 32.97C24.42 32.97 26.43 33.21 28.53 33.63C23.61 36.24 22.83 39.69 22.83 41.67ZM30 54C29.19 54 28.41 53.97 27.63 53.88V41.67C27.63 37.41 36.45 35.28 40.83 35.28C44.04 35.28 49.59 36.45 52.35 38.73C48.84 47.64 40.17 54 30 54Z"
                        fill="#1848A4"
                      />
                    </svg>
                  </div>
                  <h5 className="partofphase">Part of phase 2</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-lg-4 mb-2">
              <div className="card card-danger card-outline">
                <div className="total_users second">
                  <p className="">Total Active Users [Portal]</p>
                  <div className="d-flex cardpadding">
                    <h4>0</h4>
                    <svg
                      style={{ width: "55px" }}
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30 0C13.44 0 0 13.44 0 30C0 46.56 13.44 60 30 60C46.56 60 60 46.56 60 30C60 13.44 46.56 0 30 0ZM40.83 19.02C44.04 19.02 46.62 21.6 46.62 24.81C46.62 28.02 44.04 30.6 40.83 30.6C37.62 30.6 35.04 28.02 35.04 24.81C35.01 21.6 37.62 19.02 40.83 19.02ZM22.83 14.28C26.73 14.28 29.91 17.46 29.91 21.36C29.91 25.26 26.73 28.44 22.83 28.44C18.93 28.44 15.75 25.26 15.75 21.36C15.75 17.43 18.9 14.28 22.83 14.28ZM22.83 41.67V52.92C15.63 50.67 9.93 45.12 7.41 38.04C10.56 34.68 18.42 32.97 22.83 32.97C24.42 32.97 26.43 33.21 28.53 33.63C23.61 36.24 22.83 39.69 22.83 41.67ZM30 54C29.19 54 28.41 53.97 27.63 53.88V41.67C27.63 37.41 36.45 35.28 40.83 35.28C44.04 35.28 49.59 36.45 52.35 38.73C48.84 47.64 40.17 54 30 54Z"
                        fill="#850E35"
                      />
                    </svg>
                  </div>
                  <h5 className="partofphase">Part of phase 2</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-lg-4 mb-2">
              <div className="card card-success card-outline">
                <div className="total_users three">
                  <p className="">Total No. of MLAs</p>
                  <div className="d-flex cardpadding">
                    <h4>0</h4>
                    <svg
                      style={{ width: "55px" }}
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30 0C13.44 0 0 13.44 0 30C0 46.56 13.44 60 30 60C46.56 60 60 46.56 60 30C60 13.44 46.56 0 30 0ZM40.83 19.02C44.04 19.02 46.62 21.6 46.62 24.81C46.62 28.02 44.04 30.6 40.83 30.6C37.62 30.6 35.04 28.02 35.04 24.81C35.01 21.6 37.62 19.02 40.83 19.02ZM22.83 14.28C26.73 14.28 29.91 17.46 29.91 21.36C29.91 25.26 26.73 28.44 22.83 28.44C18.93 28.44 15.75 25.26 15.75 21.36C15.75 17.43 18.9 14.28 22.83 14.28ZM22.83 41.67V52.92C15.63 50.67 9.93 45.12 7.41 38.04C10.56 34.68 18.42 32.97 22.83 32.97C24.42 32.97 26.43 33.21 28.53 33.63C23.61 36.24 22.83 39.69 22.83 41.67ZM30 54C29.19 54 28.41 53.97 27.63 53.88V41.67C27.63 37.41 36.45 35.28 40.83 35.28C44.04 35.28 49.59 36.45 52.35 38.73C48.84 47.64 40.17 54 30 54Z"
                        fill="#285430"
                      />
                    </svg>
                  </div>
                  <h5 className="partofphase">Part of phase 2</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-lg-4 mb-2">
              <div className="card card-primary2 card-outline">
                <div className="total_users">
                  <p className="">Total No. of MCAs</p>
                  <div className="d-flex cardpadding">
                    <h4>0</h4>
                    <svg
                      style={{ width: "55px" }}
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30 0C13.44 0 0 13.44 0 30C0 46.56 13.44 60 30 60C46.56 60 60 46.56 60 30C60 13.44 46.56 0 30 0ZM40.83 19.02C44.04 19.02 46.62 21.6 46.62 24.81C46.62 28.02 44.04 30.6 40.83 30.6C37.62 30.6 35.04 28.02 35.04 24.81C35.01 21.6 37.62 19.02 40.83 19.02ZM22.83 14.28C26.73 14.28 29.91 17.46 29.91 21.36C29.91 25.26 26.73 28.44 22.83 28.44C18.93 28.44 15.75 25.26 15.75 21.36C15.75 17.43 18.9 14.28 22.83 14.28ZM22.83 41.67V52.92C15.63 50.67 9.93 45.12 7.41 38.04C10.56 34.68 18.42 32.97 22.83 32.97C24.42 32.97 26.43 33.21 28.53 33.63C23.61 36.24 22.83 39.69 22.83 41.67ZM30 54C29.19 54 28.41 53.97 27.63 53.88V41.67C27.63 37.41 36.45 35.28 40.83 35.28C44.04 35.28 49.59 36.45 52.35 38.73C48.84 47.64 40.17 54 30 54Z"
                        fill="#000000"
                      />
                    </svg>
                  </div>
                  <h5 className="partofphase">Part of phase 2</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-lg-4 mb-2">
              <div className="card card-danger2 card-outline">
                <div className="total_users second">
                  <p className="">Total No. of Govt. Officials</p>
                  <div className="d-flex cardpadding">
                    <h4>0</h4>
                    <svg
                      style={{ width: "55px" }}
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30 0C13.44 0 0 13.44 0 30C0 46.56 13.44 60 30 60C46.56 60 60 46.56 60 30C60 13.44 46.56 0 30 0ZM40.83 19.02C44.04 19.02 46.62 21.6 46.62 24.81C46.62 28.02 44.04 30.6 40.83 30.6C37.62 30.6 35.04 28.02 35.04 24.81C35.01 21.6 37.62 19.02 40.83 19.02ZM22.83 14.28C26.73 14.28 29.91 17.46 29.91 21.36C29.91 25.26 26.73 28.44 22.83 28.44C18.93 28.44 15.75 25.26 15.75 21.36C15.75 17.43 18.9 14.28 22.83 14.28ZM22.83 41.67V52.92C15.63 50.67 9.93 45.12 7.41 38.04C10.56 34.68 18.42 32.97 22.83 32.97C24.42 32.97 26.43 33.21 28.53 33.63C23.61 36.24 22.83 39.69 22.83 41.67ZM30 54C29.19 54 28.41 53.97 27.63 53.88V41.67C27.63 37.41 36.45 35.28 40.83 35.28C44.04 35.28 49.59 36.45 52.35 38.73C48.84 47.64 40.17 54 30 54Z"
                        fill="#E74C3C"
                      />
                    </svg>
                  </div>
                  <h5 className="partofphase">Part of phase 2</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-lg-4 mb-2">
              <div className="card card-success2 card-outline">
                <div className="total_users three">
                  <p className="">Total No. of Scholar’s & Researchers</p>
                  <div className="d-flex cardpadding">
                    <h4>0</h4>
                    <svg
                      style={{ width: "55px" }}
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30 0C13.44 0 0 13.44 0 30C0 46.56 13.44 60 30 60C46.56 60 60 46.56 60 30C60 13.44 46.56 0 30 0ZM40.83 19.02C44.04 19.02 46.62 21.6 46.62 24.81C46.62 28.02 44.04 30.6 40.83 30.6C37.62 30.6 35.04 28.02 35.04 24.81C35.01 21.6 37.62 19.02 40.83 19.02ZM22.83 14.28C26.73 14.28 29.91 17.46 29.91 21.36C29.91 25.26 26.73 28.44 22.83 28.44C18.93 28.44 15.75 25.26 15.75 21.36C15.75 17.43 18.9 14.28 22.83 14.28ZM22.83 41.67V52.92C15.63 50.67 9.93 45.12 7.41 38.04C10.56 34.68 18.42 32.97 22.83 32.97C24.42 32.97 26.43 33.21 28.53 33.63C23.61 36.24 22.83 39.69 22.83 41.67ZM30 54C29.19 54 28.41 53.97 27.63 53.88V41.67C27.63 37.41 36.45 35.28 40.83 35.28C44.04 35.28 49.59 36.45 52.35 38.73C48.84 47.64 40.17 54 30 54Z"
                        fill="#F49D1A"
                      />
                    </svg>
                  </div>
                  <h5 className="partofphase">Part of phase 2</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-6 mb-2">
              <div className="card card-primary1 card-outline">
                <div className="total_users">
                  <p className="">Total No. of Department</p>
                  <div className="d-flex cardpadding">
                    <h4>0</h4>
                    <svg
                      style={{ width: "55px" }}
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30 0C13.44 0 0 13.44 0 30C0 46.56 13.44 60 30 60C46.56 60 60 46.56 60 30C60 13.44 46.56 0 30 0ZM40.83 19.02C44.04 19.02 46.62 21.6 46.62 24.81C46.62 28.02 44.04 30.6 40.83 30.6C37.62 30.6 35.04 28.02 35.04 24.81C35.01 21.6 37.62 19.02 40.83 19.02ZM22.83 14.28C26.73 14.28 29.91 17.46 29.91 21.36C29.91 25.26 26.73 28.44 22.83 28.44C18.93 28.44 15.75 25.26 15.75 21.36C15.75 17.43 18.9 14.28 22.83 14.28ZM22.83 41.67V52.92C15.63 50.67 9.93 45.12 7.41 38.04C10.56 34.68 18.42 32.97 22.83 32.97C24.42 32.97 26.43 33.21 28.53 33.63C23.61 36.24 22.83 39.69 22.83 41.67ZM30 54C29.19 54 28.41 53.97 27.63 53.88V41.67C27.63 37.41 36.45 35.28 40.83 35.28C44.04 35.28 49.59 36.45 52.35 38.73C48.84 47.64 40.17 54 30 54Z"
                        fill="#0278BB"
                      />
                    </svg>
                  </div>
                  <h5 className="partofphase">Part of phase 2</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-6 mb-2">
              <div className="card card-danger1 card-outline">
                <div className="total_users second">
                  <p className="">Total No. of Department Users</p>
                  <div className="d-flex cardpadding">
                    <h4>0</h4>
                    <svg
                      style={{ width: "55px" }}
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30 0C13.44 0 0 13.44 0 30C0 46.56 13.44 60 30 60C46.56 60 60 46.56 60 30C60 13.44 46.56 0 30 0ZM40.83 19.02C44.04 19.02 46.62 21.6 46.62 24.81C46.62 28.02 44.04 30.6 40.83 30.6C37.62 30.6 35.04 28.02 35.04 24.81C35.01 21.6 37.62 19.02 40.83 19.02ZM22.83 14.28C26.73 14.28 29.91 17.46 29.91 21.36C29.91 25.26 26.73 28.44 22.83 28.44C18.93 28.44 15.75 25.26 15.75 21.36C15.75 17.43 18.9 14.28 22.83 14.28ZM22.83 41.67V52.92C15.63 50.67 9.93 45.12 7.41 38.04C10.56 34.68 18.42 32.97 22.83 32.97C24.42 32.97 26.43 33.21 28.53 33.63C23.61 36.24 22.83 39.69 22.83 41.67ZM30 54C29.19 54 28.41 53.97 27.63 53.88V41.67C27.63 37.41 36.45 35.28 40.83 35.28C44.04 35.28 49.59 36.45 52.35 38.73C48.84 47.64 40.17 54 30 54Z"
                        fill="#773000"
                      />
                    </svg>
                  </div>
                  <h5 className="partofphase">Part of phase 2</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
