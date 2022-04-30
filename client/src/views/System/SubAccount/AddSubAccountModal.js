import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { SubAccountContext } from "../../../contexts/SubAccountContext";
import { useContext, useEffect, useState } from "react";

const AddSubAccountModal = () => {
  const {
    subAccountState: { subAccountLoading, subAccounts },
    getSubAccounts,
    showAddSubAccountModal,
    setShowAddSubAccountModal,
    showToast: { show, msg, type },
    setShowToast,
    findSubAccount,
    setShowDeleteSubAccountModal,
    setShowUpdateSubAccountModal,
    addSubAccount,
  } = useContext(SubAccountContext);

  const [newSubAccount, setNewSubAccount] = useState({
    email: "",
    password: "",
    username: "",
    fullName: "",
    phoneNumber: "",
    rePassword: "",
    role: "",
    permissons: {
      hasRoom: false,
      hasPrice: false,
      hasType: false,
      hasRental: false,
      isAdmin: false,
    },
  });

  const {
    email,
    password,
    username,
    fullName,
    phoneNumber,
    rePassword,
    role,
    permissons: { hasRoom, hasPrice, hasType, hasRental },
  } = newSubAccount;

  const resetAddSubAccountData = () => {
    setNewSubAccount({
      email: "",
      password: "",
      username: "",
      fullName: "",
      phoneNumber: "",
      rePassword: "",
      role: "",
      permissons: {
        hasRoom: true,
        hasPrice: true,
        hasType: true,
        hasRental: true,
        isAdmin: false,
      },
    });
  };

  const closeDialog = () => {
    resetAddSubAccountData();
    setShowAddSubAccountModal(false);
  };

  // check password and confirm password
  const checkPassword = () => {
    if (password !== rePassword) {
      setShowToast({
        show: true,
        msg: "Mật khẩu không khớp",
        type: "danger",
      });
      return false;
    }
    return true;
  };

  const onChangeNewSubAccountForm = (e) => {
    setNewSubAccount({
      ...newSubAccount,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (checkPassword()) {
      const newSubAccount = {
        email,
        password,
        username,
        fullName,
        phoneNumber,
        role,
        permissons: {
          hasRoom,
          hasPrice,
          hasType,
          hasRental,
          isAdmin: role === "Admin" ? true : false,
        },
        createdAt: Date.now(),
      };
      const { success, msg } = await addSubAccount(newSubAccount);
      setShowToast({
        show: true,
        msg,
        type: success ? "success" : "danger",
      });

      closeDialog();
    }
  };

  return (
    <Modal show={showAddSubAccountModal} onHide={closeDialog} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Nhập thông tin tài khoản cần thêm mới</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => onChangeNewSubAccountForm(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => onChangeNewSubAccountForm(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => onChangeNewSubAccountForm(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Re-Password</Form.Label>
            <Form.Control
              type="password"
              name="rePassword"
              placeholder="Re-Password"
              value={rePassword}
              onChange={(e) => onChangeNewSubAccountForm(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Fullname"
              value={fullName}
              onChange={(e) => onChangeNewSubAccountForm(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => onChangeNewSubAccountForm(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              placeholder="Role"
              value={role}
              onChange={(e) => onChangeNewSubAccountForm(e)}
            >
              <option value="">Select Role</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </Form.Control>
          </Form.Group>
          {/* check box permission */}
          {role === "Manager" && (
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Quản lý phòng"
                name="hasRoom"
                checked={hasRoom}
                onChange={(e) => {
                  setNewSubAccount({
                    ...newSubAccount,
                    permissons: {
                      ...newSubAccount.permissons,
                      hasRoom: e.target.checked,
                    },
                  });
                }}
              />
              <Form.Check
                type="checkbox"
                label="Quản lý giá"
                name="hasPrice"
                checked={hasPrice}
                onChange={(e) => {
                  setNewSubAccount({
                    ...newSubAccount,
                    permissons: {
                      ...newSubAccount.permissons,
                      hasPrice: e.target.checked,
                    },
                  });
                }}
              />
              <Form.Check
                type="checkbox"
                label="Quản lý loại phòng"
                name="hasType"
                checked={hasType}
                onChange={(e) => {
                  setNewSubAccount({
                    ...newSubAccount,
                    permissons: {
                      ...newSubAccount.permissons,
                      hasType: e.target.checked,
                    },
                  });
                }}
              />
              <Form.Check
                type="checkbox"
                label="Quản lý thuê"
                name="hasRental"
                checked={hasRental}
                onChange={(e) => {
                  setNewSubAccount({
                    ...newSubAccount,
                    permissons: {
                      ...newSubAccount.permissons,
                      hasRental: e.target.checked,
                    },
                  });
                }}
              />
            </Form.Group>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            Thêm mới
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddSubAccountModal;
