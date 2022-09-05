import React from "react";
import Modal from "react-bootstrap/Modal";

import ReportData from "./ReportData";
import { ExportCSV } from "./ExportCSV";

export const ReportModal = ({ excelData, handleClose, show }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop={true}>
      <Modal.Header closeButton>
        <Modal.Title>Comparison Report</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ReportData excelData={excelData} />
      </Modal.Body>

      <Modal.Footer>
        <ExportCSV csvData={excelData} fileName="comparison-report" />
      </Modal.Footer>
    </Modal>
  );
};

export default ReportModal;
