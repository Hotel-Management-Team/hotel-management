import React from "react";
import { Toast } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const ToastErrorPermission = () => {
  const {
    showToastErrorPermission: { show, msg, type },
    setShowToastErrorPermission,
  } = useContext(AuthContext);

  return (
    <Toast
      onClose={() =>
        setShowToastErrorPermission({ show: false, msg: "", type: "" })
      }
      show={show}
      delay={3000}
      autohide
      style={{
        position: "fixed",
        bottom: "10%",
        right: "10px",
      }}
      className={`bg-${type} text-white`}
    >
      <Toast.Body>
        <strong>{msg}</strong>
      </Toast.Body>
    </Toast>
  );
};

export default ToastErrorPermission;
