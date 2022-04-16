import React from 'react'
import { Form, Button } from 'react-bootstrap';
const User = {
  name: 'Dang Tu Thieu',
  email: 'dangtuthieu@gmail.com',
  role: 'admin',
  username: 'dangtuthieu',
  createAt: '2020-01-01',
  phoneNumber: '0987654321'
}

const Account = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <div className="col-md-12">
                  <h4 style={{ textAlign: 'center' }}>{User.name}</h4>
                  <br></br>
                  <p>Vai trò: {User.role}</p>
                  <p>Username: {User.username}</p>
                  <p>Email: {User.email}</p>
                  <p>Số điện thoại: {User.phoneNumber}</p>
                  <p>Ngày tạo: {User.createAt}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h4 style={{ textAlign: 'center' }}>Thông tin cá nhân</h4>
                <Form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Tên</label>
                        <input placeholder={User.name} type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input placeholder={User.email} type="email" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Số điện thoại</label>
                        <input placeholder={User.phoneNumber} type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Username</label>
                        <input placeholder={User.username} type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Mật khẩu</label>
                        <input placeholder="********" type="password" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Nhập lại mật khẩu</label>
                        <input placeholder="********" type="password" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className='mt-3 text-center' >
                    <Button variant="success" type="submit" size="md">
                      Submit
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
}

export default Account