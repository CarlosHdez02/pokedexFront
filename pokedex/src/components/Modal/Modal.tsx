import React from "react";
import classes from "./Modal.module.css";
import Form from "../Form/Form";
import { TrainerInterface } from "../../interfaces/TrainerInterface";

export interface ModalProps {
  trainer: TrainerInterface | undefined,
  setData: React.Dispatch<React.SetStateAction<TrainerInterface[]>>
  closeModal: () => void; // Change the type of closeModal function
}

const Modal = ({ closeModal, trainer, setData }: ModalProps) => {
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
          <h1>Enter your Poke trainer</h1>
        </div>
        <div className={classes.body}>
          <Form setData={setData} trainer={trainer} closeModal={closeModal} />
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
