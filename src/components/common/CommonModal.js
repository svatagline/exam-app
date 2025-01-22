
import { Modal } from "react-bootstrap";

export function CommonModal({ show, handleClose, children, title, size="md" }) {
  return (
    <>
      <Modal show={show} onHide={handleClose} size={size} >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
