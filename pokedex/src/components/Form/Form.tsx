import React, { FormEvent, useState, ChangeEvent } from "react";
import { TrainerInterface } from "../../interfaces/TrainerInterface";
import { Button } from "../Button/Button";
import classes from './Form.module.css'

const Form: React.FC = () => {
  const [trainer, setTrainer] = useState<TrainerInterface>({
    id: Date.now(), // Assign a unique id based on the current timestamp
    name: "",
    lastName: "",
    phoneNumber: '',
    medals: 0,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log(trainer);
    // Optionally handle the submission (e.g., send the data to a server)

    // Reset the form with a new unique id
    setTrainer({
      id: Date.now(),
      name: "",
      lastName: "",
      phoneNumber: '',
      medals: 0,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTrainer({
      ...trainer,
      [name]:
       name === "medals" ? Number(value) : value,
    });
  };

  console.log(trainer);

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={classes.label} htmlFor="name">Name:</label>
          <input
            className={classes.myInput}
            type="text"
            id="name"
            name="name"
            value={trainer.name}
            onChange={handleInputChange}
            required
            autoComplete="off"
            minLength={5}
          />
        </div>
        <div>
          <label className={classes.label}htmlFor="lastName">Last Name:</label>
          <input
            className={classes.myInput}
            type="text"
            id="lastName"
            name="lastName"
            value={trainer.lastName}
            onChange={handleInputChange}
            required
            autoComplete="off"
            minLength={4}
          />
        </div>
        <div>
          <label className={classes.label} htmlFor="phoneNumber">Phone Number:</label>
          <input
            className={classes.myInput}
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={trainer.phoneNumber}
            onChange={handleInputChange}
            required
            autoComplete="off"
            minLength={10}
          />
        </div>
        <div>
          <label className={classes.label} htmlFor="medals">Medals:</label>
          <input
            className={classes.myInput}
            type="number"
            id="medals"
            name="medals"
            value={trainer.medals}
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
