import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/esm/Spinner";

const ProtectedAdmin = ({ children }) => {
  const {
    authState: { user, authLoading },
    showToastErrorPermission,
    setShowToastErrorPermission,
  } = useContext(AuthContext);

  useEffect(() => {
    if (user.permissons.isAdmin === false) {
      setShowToastErrorPermission({
        show: true,
        msg: "Bạn cần có quyền admin để truy cập trang này",
        type: "danger",
      });
    }
  }, [user.permissons.isAdmin]);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  if (user.permissons.isAdmin === true) {
    return children;
  } else {
    return <Navigate to="/system-management" />;
  }
};

export default ProtectedAdmin;
