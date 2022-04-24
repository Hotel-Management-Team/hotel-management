import React from "react";
import { useContext, useEffect } from "react";
import { SubAccountContext } from "../../../contexts/SubAccountContext";
import ControlBar from "../../../components/common/ControlBar";
import { Spinner, Toast } from "react-bootstrap";
import CardSubAccount from "./CardSubAccount";
import AddSubAccountModal from "./AddSubAccountModal";

const SubAccount = () => {
  const {
    subAccountState: { subAccountLoading, subAccounts },
    getSubAccounts,
    setShowAddSubAccountModal,
    showAddSubAccountModal,
    showToast: { show, msg, type },
    setShowToast,
    findSubAccount,
    // setShowDeleteSubAccountModal,
    // setShowUpdateSubAccountModal,
  } = useContext(SubAccountContext);

  useEffect(() => {
    getSubAccounts();
  }, []);

  //   console.log(subAccounts);

  if (subAccountLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  let body = (
    <>
      <div className="container overflow-hidden my-5">
        <div className="row g-5">
          {subAccounts.map((subAccount) => {
            return (
              <div
                className="col-md-4 d-flex justify-content-center"
                key={subAccount._id}
              >
                <CardSubAccount SubAccount={subAccount} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <>
      <AddSubAccountModal />
      <ControlBar
        Link="/system-management"
        onClickAdd={() => {
          setShowAddSubAccountModal(true);
        }}
      />
      {body}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          msg: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{msg}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default SubAccount;
