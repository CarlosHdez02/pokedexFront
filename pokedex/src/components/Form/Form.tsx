import React, { FormEvent, useState, ChangeEvent } from "react";
import { TrainerInterface } from "../../interfaces/TrainerInterface";
import { Button } from "../Button/Button";
import classes from "./Form.module.css";
import { useEditTrainer } from "../../hooks/useEditTrainer";
import { useAddTrainer } from "../../hooks/useAddTrainer";

type FormProps = {
  trainer: TrainerInterface | undefined;
  closeModal: () => void;
  setData: React.Dispatch<React.SetStateAction<TrainerInterface[]>>;
};
const Form: React.FC<FormProps> = ({
  trainer,
  closeModal,
  setData,
}: FormProps) => {
  const { handleUpdate } = useEditTrainer();
  const { addTrainer } = useAddTrainer();
  const [localTrainer, setLocalTrainer] = useState<TrainerInterface>(
    trainer ?? {
      firstName: "",
      lastName: "",
      medals: 0,
      phoneNumber: "",
      _id: "",
    }
  );

  console.log(localTrainer);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(e, "this vluer");
    e.preventDefault();

    console.log(trainer);

    if (trainer) {
      try {
        //Sending it back to the server
        await handleUpdate(localTrainer, trainer._id);
        setData((prevData) => {
          const updatedData = prevData.map((el) => {
            if (el._id === trainer._id) {
              return localTrainer;
            }
            return el;
          });
          return updatedData;
        });
        // Reset the form with a new unique id
        closeModal();
      } catch (error) {}
      return;
    }

    try {
      const {_id, ...rest} = localTrainer
      const id = await addTrainer(rest);
      setData((prevData) => [...prevData, {...localTrainer, _id: id}]);
      closeModal()
    } catch (error) {}
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLocalTrainer({
      ...localTrainer,
      [name]: name === "medals" ? Number(value) : value,
    });
  };

  console.log(localTrainer.firstName);

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={classes.label} htmlFor="name">
            Name:
          </label>
          <input
            className={classes.myInput}
            type="text"
            id="firstName"
            name="firstName"
            value={localTrainer.firstName}
            onChange={handleInputChange}
            required
            autoComplete="off"
            minLength={5}
          />
        </div>
        <div>
          <label className={classes.label} htmlFor="lastName">
            Last Name:
          </label>
          <input
            className={classes.myInput}
            type="text"
            id="lastName"
            name="lastName"
            value={localTrainer.lastName}
            onChange={handleInputChange}
            required
            autoComplete="off"
            minLength={4}
          />
        </div>
        <div>
          <label className={classes.label} htmlFor="phoneNumber">
            Phone Number:
          </label>
          <input
            className={classes.myInput}
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={localTrainer.phoneNumber}
            onChange={handleInputChange}
            required
            autoComplete="off"
            minLength={10}
          />
        </div>
        <div>
          <label className={classes.label} htmlFor="medals">
            Medals:
          </label>
          <input
            className={classes.myInput}
            type="number"
            id="medals"
            name="medals"
            value={localTrainer.medals}
            onChange={handleInputChange}
            required
            autoComplete="off"
            min={0}
          />
        </div>
        <Button type="submit">Submit</Button>{" "}
        {/* Use custom Button component */}
      </form>
    </div>
  );
};

export default Form;
