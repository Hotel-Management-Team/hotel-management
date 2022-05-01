import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/esm/Spinner";

const ProtecteRoomType = ({ children }) => {
  const {
    authState: { user, authLoading },
    showToastErrorPermission,
    setShowToastErrorPermission,
  } = useContext(AuthContext);

  useEffect(() => {
    if (user.permissons.hasType === false) {
      setShowToastErrorPermission({
        show: true,
        msg: "Bạn cần có quyền quản lý loại phòng để truy cập trang này",
        type: "danger",
      });
    }
  }, [user.permissons.hasType]);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  if (user.permissons.hasType === true) {
    return children;
  } else {
    return <Navigate to="/system-management" />;
  }
};

export default ProtecteRoomType;
