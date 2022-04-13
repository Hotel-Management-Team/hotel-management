import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/esm/Spinner";
import NavbarMenu from "../layout/NavbarMenu";

const ProtecteRoute = ({ children }) => {
  const {
    authState: { isAuthenticated, authLoading },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  return isAuthenticated ?
   (
    <>
        <NavbarMenu/>
        {children}
    </>
   ) : <Navigate to="/login" />;
};

export default ProtecteRoute;
