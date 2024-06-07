import React from "react";
import classes from "./Modal.module.css";
import Form from "../Form/Form";

export interface ModalProps {
  closeModal: () => void; // Change the type of closeModal function
}

const Modal = ({ closeModal }: ModalProps) => {
  // Handle click event on background overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal(); // Close modal only if background overlay is clicked directly
    }
  };

  return (
    <div className={classes.modalBackground} onClick={handleOverlayClick}>
      <div className={classes.modalContainer}>
        <div className={classes.titleCloseButton}>
          <button onClick={closeModal}>X</button>
        </div>
        <div className={classes.title}>
          <h1>Add a new trainer</h1>
        </div>
        <div className={classes.body}>
          <Form />
        </div>
        <div className={classes.footer}>
          <button onClick={closeModal} id="cancelBtn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
