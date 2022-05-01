import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/esm/Spinner";

const ProtectedBooking = ({ children }) => {
  const {
    authState: { user, authLoading },
  } = useContext(AuthContext);

  const navigate = useNavigate();

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  if (user.permissons.hasRental === true) {
    return children;
  }

  return (
    <>
      <div className="container mt-5">
        <h1>Bạn cần có quyền quản lý đặt phòng để sử dụng tính năng này!</h1>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Go back to dashboard
        </Button>
      </div>
    </>
  );
};

export default ProtectedBooking;
