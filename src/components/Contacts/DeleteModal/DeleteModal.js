import { Button, Modal } from "react-bootstrap";
const DeleteModal = ({clickDelete, contact, show, handleCloseModal}) => {
  
  const  deleteContact = () => {
    clickDelete(contact.id)
    
  }
  
  return (
    <Modal show={show} onHide={handleCloseModal} >
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete{" "}
        <span className="text-danger">{contact.name}</span>?
      </Modal.Body>
      <Modal.Footer >
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button
          
          variant="danger"
          onClick={() => deleteContact()}
        >
          Delete Contact
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
