import React from "react";
import Alert from "react-bootstrap/Alert";

const MessageDetail = ({ msg, showError }) => {
  return (
    <Alert variant="danger" show={showError}>
      {msg}
    </Alert>
  );
};

export default MessageDetail;
