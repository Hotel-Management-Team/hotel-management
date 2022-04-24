import React from "react";
import { useContext, useEffect } from "react";
import { SubAccountContext } from "../../../contexts/SubAccountContext";
import ControlBar from "../../../components/common/ControlBar";
import { Spinner } from "react-bootstrap";
import CardSubAccount from "./CardSubAccount";

const SubAccount = () => {
  const {
    subAccountState: { subAccountLoading, subAccounts },
    getSubAccounts,
    // setShowAddSubAccountModal,
    // showToast: { show, msg, type },
    // setShowToast,
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
      <ControlBar Link="/system-management" onClickAdd={() => {}} />
      {body}
    </>
  );
};

export default SubAccount;
