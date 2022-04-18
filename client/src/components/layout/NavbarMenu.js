import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  const location = useLocation();

  return (
    <Navbar style={{ background: "#78c2ad" }} expand="lg" variant="dark" className="shadow px-4">
      <Navbar.Brand
        className="font-weight-bolder text-white border border-white p-1 "
        to="/dashboard"
        as={Link}
      >
        MERN HOTEL
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse
        id="basic-navbar-nav"
        className="d-flex justify-content-between"
      >
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white mx-2"
            style={
              location.pathname.includes("/booking")
                ? { borderBottom: "2px solid white" }
                : {}
            }
            to="/booking"
            as={Link}
          >
            ĐẶT PHÒNG
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white  mx-2"
            style={
              location.pathname.includes("/system-management")
                ? { borderBottom: "2px solid white" }
                : {}
            }
            to="/system-management"
            as={Link}
          >
            QUẢN LÝ HỆ THỐNG
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white mx-2"
            style={
              location.pathname.includes("/revenue-management")
                ? { borderBottom: "2px solid white" }
                : {}
            }
            to="/revenue-management"
            as={Link}
          >
            QUẢN LÝ THU CHI
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white  mx-2"
            style={
              location.pathname.includes("/account-management")
                ? { borderBottom: "2px solid white" }
                : {}
            }
            to="/account-management"
            as={Link}
          >
            TÀI KHOẢN
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link className="font-weight-bolder text-white" disabled>
            Welcome {username}
          </Nav.Link>
          <Button
            variant="danger"
            className="font-weight-bolder text-white"
            size="sm"
            onClick={logout}
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="32"
              height="32"
              className="mr-2"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
