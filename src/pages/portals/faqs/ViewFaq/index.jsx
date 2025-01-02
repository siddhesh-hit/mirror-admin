import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

import back from "assets/back.svg";

import { useDataFetchingForBothApis } from "lib/useDataFetchingForBothApis";
import Loading from "components/common/Loader";
import { paths } from "services/paths";

const ViewFaq = () => {
  const { data, loading, error } = useDataFetchingForBothApis("faq");

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to={paths.viewAllFaq} className="addpagess">
          <img src={back} alt="back" style={{ width: "25px" }} />
          Go Back
        </Link>
        <h4 className="page-title">• View Faqs</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th style={{ width: "23%" }}>Question</th>
                    <th style={{ width: "23%" }}>प्रश्न</th>
                    <th style={{ width: "23%" }}>Answer</th>
                    <th style={{ width: "23%" }}>उत्तर</th>
                    <th style={{ width: "8%" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data && (
                    <tr>
                      <td>{data.english.question}</td>
                      <td>{data.marathi.question}</td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: data.english.answer,
                        }}
                      ></td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: data.marathi.answer,
                        }}
                      ></td>
                      <td>
                        <Link to={`${paths.editFaq}?id=${data._id}`}>
                          <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>Edit the data.</Tooltip>
                            )}
                            placement="bottom"
                          >
                            <i className="fa fa-edit"></i>
                          </OverlayTrigger>
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFaq;
