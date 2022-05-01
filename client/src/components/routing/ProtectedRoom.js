import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/esm/Spinner";

const ProtecteRoom = ({ children }) => {
  const {
    authState: { user, authLoading },
    showToastErrorPermission,
    setShowToastErrorPermission,
  } = useContext(AuthContext);

  useEffect(() => {
    if (user.permissons.hasRoom === false) {
      setShowToastErrorPermission({
        show: true,
        msg: "Bạn cần có quyền quản lý phòng để truy cập trang này",
        type: "danger",
      });
    }
  }, [user.permissons.hasRoom]);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  if (user.permissons.hasRoom === true) {
    return children;
  } else {
    return <Navigate to="/system-management" />;
  }
};

export default ProtecteRoom;
