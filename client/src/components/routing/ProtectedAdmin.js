import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/esm/Spinner";
import NavbarMenu from "../layout/NavbarMenu";
import { Button, Toast } from "react-bootstrap";

const ProtecteAdmin = ({ children }) => {
  const {
    authState: { user, authLoading },
  } = useContext(AuthContext);

  const [show, setShow] = useState(true);

  const navigate = useNavigate();

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  return user.permissons.isAdmin ? (
    <>{children}</>
  ) : (
    <>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-danger text-white`}
      >
        <Toast.Body>
          <strong>Cần có quyền Admin để sử dụng tính năng này</strong>
        </Toast.Body>
      </Toast>
      <div className="d-flex justify-content-center mt-5">
        <Button
          variant="danger"
          onClick={() => {
            navigate("/system-management");
          }}
        >
          Trở về
        </Button>
      </div>
    </>
  );
};

export default ProtecteAdmin;
