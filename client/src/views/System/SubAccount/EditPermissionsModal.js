import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { SubAccountContext } from "../../../contexts/SubAccountContext";
import { useContext, useEffect, useState } from "react";

const EditPermissionsModal = () => {
  const {
    subAccountState: { subAccountLoading, subAccount },
    getSubAccounts,
    showEditSubAccountModal,
    setShowEditSubAccountModal,
    showToast: { show, msg, type },
    setShowToast,
    findSubAccount,
    editPermissions,
  } = useContext(SubAccountContext);

  const [selectedSubAccount, setSelectedSubAccount] = useState(subAccount);

  const {
    permissons: { hasPrice, hasRental, hasRoom, hasType },
    username,
  } = selectedSubAccount;

  useEffect(() => {
    setSelectedSubAccount(subAccount);
  }, [subAccount]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, msg } = await editPermissions(
      selectedSubAccount._id,
      selectedSubAccount.permissons
    );
    setShowToast({
      show: true,
      msg: msg,
      type: success ? "success" : "danger",
    });
    setShowEditSubAccountModal(false);
  };

  return (
    <>
      <Modal
        show={showEditSubAccountModal}
        onHide={setShowEditSubAccountModal.bind(this, false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Permissions: {username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            {/* check box */}
            <Form.Check
              type="checkbox"
              label="Quản lý phòng"
              checked={hasRoom}
              name="hasRoom"
              onChange={() => {
                setSelectedSubAccount({
                  ...selectedSubAccount,
                  permissons: {
                    ...selectedSubAccount.permissons,
                    hasRoom: !hasRoom,
                  },
                });
              }}
            ></Form.Check>
            <Form.Check
              type="checkbox"
              label="Quản lý giá"
              checked={hasPrice}
              name="hasPrice"
              onChange={() => {
                setSelectedSubAccount({
                  ...selectedSubAccount,
                  permissons: {
                    ...selectedSubAccount.permissons,
                    hasPrice: !hasPrice,
                  },
                });
              }}
            ></Form.Check>
            <Form.Check
              type="checkbox"
              label="Quản lý loại
            phòng"
              checked={hasType}
              name="hasType"
              onChange={() => {
                setSelectedSubAccount({
                  ...selectedSubAccount,
                  permissons: {
                    ...selectedSubAccount.permissons,
                    hasType: !hasType,
                  },
                });
              }}
            ></Form.Check>
            <Form.Check
              type="checkbox"
              label="Quản lý thuê"
              checked={hasRental}
              name="hasRental"
              onChange={() => {
                setSelectedSubAccount({
                  ...selectedSubAccount,
                  permissons: {
                    ...selectedSubAccount.permissons,
                    hasRental: !hasRental,
                  },
                });
              }}
            ></Form.Check>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={(e) => {
              setShowEditSubAccountModal(false);
              onSubmit(e);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditPermissionsModal;
