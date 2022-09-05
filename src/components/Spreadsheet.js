import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReportModal from "./ReportModal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

function Spreadsheet() {
  // on change
  const notify = (e) => {
    e.preventDefault();
    toast.success("File Submitted !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  // const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [show, setShow] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [excelData, setExcelData] = useState(null);

  const [html, setHtml] = useState("");
  const tbl = useRef(null);

  const handleClose = () => setShow(false);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleChange2(event) {
    setFile2(event.target.files[0]);
  }

  // submit function
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (file !== null && file2 !== null) {
        setShowLoader(true);
        const formData = new FormData();
        formData.append("file1", file);
        formData.append("file2", file2);
        const API_URL = "http://localhost:9090/upload-file";
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
          responseType: "arraybuffer",
        };

        await axios.post(API_URL, formData, config).then((response) => {
          const workbook = XLSX.read(response.data, { type: "buffer" });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // const dataHtml = XLSX.utils.sheet_to_html(worksheet); // generate HTML
          // setHtml(dataHtml); // update state

          setExcelData(data);
          setShowLoader(false);
          setShow(true);
          console.log("Done");
        });
      }
    } catch (error) {
      setShowLoader(false);
      alert(error);
    }
  };

  return (
    <div className="container pt-5 mt-3">
      <div className="row">
        <div className="col-12">
          <Card bg="primary" text="white">
            <Card.Header>
              <h4>Select Google Spreadsheet to Compare</h4>
            </Card.Header>
            <Card.Body>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="form p-4">
                      <form
                        className="form-group"
                        autoComplete="off"
                        onSubmit={handleSubmit}
                      >
                        <div className="row mb-4">
                          <div className="col-6">
                            <label>
                              <h5>Spreadsheet 1</h5>
                            </label>
                            <input
                              type="file"
                              name="file1"
                              className="form-control"
                              onChange={handleChange}
                              required
                            ></input>
                          </div>
                          <div className="col-6">
                            <label>
                              <h5>Spreadsheet 2</h5>
                            </label>
                            <input
                              type="file"
                              name="file2"
                              className="form-control"
                              onChange={handleChange2}
                              required
                            ></input>
                          </div>
                        </div>
                        {excelFileError && (
                          <div
                            className="text-danger"
                            style={{ marginTop: 5 + "px" }}
                          >
                            {excelFileError}
                          </div>
                        )}
                        <div className="row">
                          <div className="col-12">
                            <div className="d-grid gap-2">
                              <Button
                                type="submit"
                                variant="warning"
                                size="lg"
                                disabled={showLoader}
                              >
                                {showLoader ? (
                                  <Spinner animation="border" role="status">
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </Spinner>
                                ) : (
                                  "Compare"
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <ReportModal
        show={show}
        excelData={excelData}
        handleClose={handleClose}
      />
    </div>
  );
}
export default Spreadsheet;
