import Button from "react-bootstrap/Button";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { Modal } from "react-bootstrap";
import { useContext, useState } from "react";
import { RoomsContext } from "../../contexts/RoomsContext";

const ActionButton = ({ children, _id }) => {
  const { findRoom, setShowUpdateRoomModal, deleteRoom, setShowToast } =
    useContext(RoomsContext);
  const [show, setShow] = useState(false);

  const choosePost = (postId) => {
    console.log(postId);
    findRoom(postId);
    setShowUpdateRoomModal(true);
  };

  const ModalDelete = ({ postId }) => {
    return (
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure you want to delete ?</h5>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={async () => {
              const { success, msg } = await deleteRoom(_id);
              setShowToast({
                show: true,
                msg,
                type: success ? "success" : "danger",
              });
              setShow(false);
            }}
          >
            YES
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <ModalDelete postId={_id} />
      <div className="d-flex justify-content-between">
        <Button className="action-button" onClick={choosePost.bind(this, _id)}>
          <img src={editIcon} alt="edit" width="24" height="24" />
        </Button>
        {children}
        <Button className="action-button" onClick={() => setShow(true)}>
          <img src={deleteIcon} alt="delete" width="24" height="24" />
        </Button>
      </div>
    </>
  );
};

export default ActionButton;
