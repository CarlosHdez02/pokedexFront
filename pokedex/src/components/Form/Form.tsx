import React, { FormEvent, useState, ChangeEvent } from "react";
import { TrainerInterface } from "../../interfaces/TrainerInterface";
import { Button } from "../Button/Button";
import { useAddTrainer } from "../../hooks/useAddTrainer";
import classes from './Form.module.css'

const Form: React.FC = () => {
  const [trainer, setTrainer] = useState<TrainerInterface>({
    id: Date.now(), // Assign a unique id based on the current timestamp
    name: "",
    lastName: "",
    phoneNumber: 0,
    medals: 0,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (trainer.name.length < 5 && trainer.lastName.length < 5) {
      return ``;
    }
    console.log(trainer);
    // Optionally handle the submission (e.g., send the data to a server)

    // Reset the form with a new unique id
    setTrainer({
      id: Date.now(),
      name: "",
      lastName: "",
      phoneNumber: 0,
      medals: 0,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTrainer({
      ...trainer,
      [name]:
        name === "phoneNumber" || name === "medals" ? Number(value) : value,
    });
  };

  console.log(trainer);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={trainer.name}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={trainer.lastName}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            value={trainer.phoneNumber}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="medals">Medals:</label>
          <input
            type="number"
            id="medals"
            name="medals"
            value={trainer.medals}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
        </div>
        <Button type="submit">Submit</Button>{" "}
        {/* Use custom Button component */}
      </form>
    </div>
  );
};

export default Form;
