import React from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useContext, useState } from "react";
import { AccountContext } from "../contexts/AccountContext";
import { AuthContext } from "../contexts/AuthContext";
import AlertMessage from "../components/layout/AlertMessage";

const Account = () => {
  const {
    authState: {
      user: { username, email, role, createdAt, phoneNumber, fullName },
    },
  } = useContext(AuthContext);
  const { updateAccount } = useContext(AccountContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const isEmpty = Object.values(updateForm).every(x => x === null || x === '');
    const isPwdMatch = updateForm.password === updateForm.confirmPassword;
    if (isEmpty || !isPwdMatch) {
      setAlert({
        type: "danger",
        msg: (isEmpty) ? "Không có thông tin nào thay đổi" : "Mât khẩu không khớp",
      });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    } else {
      handleShow();
    }
  };

  const editAccount = async (e) => {
    setLoading(true);
    try {
      const updateResult = await updateAccount(updateForm);
      setAlert({
        type: (updateResult.success) ? "success" : "danger",
        msg: updateResult.msg,
      });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>Lưu thay đổi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc lưu những thay đổi này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Huỷ
          </Button>
          <Button variant="success" onClick={editAccount} disabled={loading}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container mt-5 text-dark">
        <div className="row">
          <div className="col-md-3">
            <div className="card border border-info border">
              <ul className="list-group list-group-flush">
                <h4 className="list-group-item text-center p-3 text-uppercase">
                  {fullName}
                </h4>
                <li className="list-group-item pt-0">Vai trò: {role}</li>
                <li className="list-group-item">Username: {username}</li>
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">
                  Số điện thoại: {phoneNumber}
                </li>
                <li className="list-group-item">Ngày tạo: {createdAt}</li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card border-info border">
              <div className="card-body">
                <h4 className="text-center">Thông tin cá nhân</h4>
                <Form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Tên</label>
                        <input
                          placeholder={fullName}
                          name="fullName"
                          onChange={onInputChange}
                          type="text"
                          className="form-control text-success"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input
                          placeholder={email}
                          type="email"
                          name="email"
                          onChange={onInputChange}
                          className="form-control text-success"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Username</label>
                        <input
                          placeholder={username}
                          type="text"
                          name="username"
                          onChange={onInputChange}
                          className="form-control text-success"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Số điện thoại</label>
                        <input
                          placeholder={phoneNumber}
                          type="tel"
                          name="phoneNumber"
                          onChange={onInputChange}
                          className="form-control text-success"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Mật khẩu</label>
                        <input
                          placeholder="********"
                          type="password"
                          name="password"
                          onChange={onInputChange}
                          className="form-control text-success"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Nhập lại mật khẩu</label>
                        <input
                          placeholder="********"
                          type="password"
                          name="confirmPassword"
                          onChange={onInputChange}
                          className="form-control text-success"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <AlertMessage info={alert} />
                    <Button
                      variant="success"
                      type="button"
                      size="md"
                      onClick={validateForm}
                    >
                      Thay đổi
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;