import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const DeleteModal = ({
  showModal,
  handleModalClose,
  handleModalConfirmation,
}) => {
  return (
    <>
      <Modal
        style={{ color: "black" }}
        show={showModal}
        onHide={handleModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Really?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure we don't need this person?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            I have changed my mind
          </Button>
          <Button variant="primary" onClick={handleModalConfirmation}>
            Remove the attendee
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
