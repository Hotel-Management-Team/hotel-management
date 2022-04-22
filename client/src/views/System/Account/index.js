import React from "react";
import { Form, Button, Spinner, Table } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { AccountContext } from '../../../contexts/AccountContext';
import { AuthContext } from "../../../contexts/AuthContext";

const Account = () => {
  // const {
  //   authState: {
  //     user: { username, email, role, createdAt, phoneNumber, fullName },
  //   },
  // } = useContext(AuthContext);

  // const edit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const editResult = await loginUser(loginForm);
  //     if (!loginData.success) {
  //       setAlert({
  //         type: "danger",
  //         msg: loginData.msg,
  //       });
  //       setTimeout(() => {
  //         setAlert(null);
  //       }, 5000);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      {/* <div className="container mt-5 text-dark">
        <div className="row">
          <div className="col-md-3">
            <div className="card border border-info border">
              <ul class="list-group list-group-flush">
                <h4 class="list-group-item text-center p-3 text-uppercase">{fullName}</h4>
                <li class="list-group-item pt-0">Vai trò: {role}</li>
                <li class="list-group-item">Username: {username}</li>
                <li class="list-group-item">Email: {email}</li>
                <li class="list-group-item">Số điện thoại: {phoneNumber}</li>
                <li class="list-group-item">Ngày tạo: {createdAt}</li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card border-info border">
              <div className="card-body">
                <h4 className='text-center'>Thông tin cá nhân</h4>
                <Form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Tên</label>
                        <input placeholder={fullName} type="text" className="form-control text-success" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input placeholder={email} type="email" className="form-control text-success" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Số điện thoại</label>
                        <input placeholder={phoneNumber} type="text" className="form-control text-success" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Username</label>
                        <input placeholder={username} type="text" className="form-control text-success" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Mật khẩu</label>
                        <input placeholder="********" type="password" className="form-control text-success" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Nhập lại mật khẩu</label>
                        <input placeholder="********" type="password" className="form-control text-success" />
                      </div>
                    </div>
                  </div>
                  <div className='mt-3 text-center' >
                    <Button variant="success" type="submit" size="md" onSubmit={edit}>
                      Thay đổi
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div > */}
    </>
  );
};

export default Account;
