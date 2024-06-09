import React from "react";
import {
  TrainerInterface,
  TrainerInterfaceCreate,
} from "../interfaces/TrainerInterface";
import { TrainerService } from "../services/Trainer.service";

export const useAddTrainer = (
  setData: (value: React.SetStateAction<TrainerInterface[]>) => void,
  localTrainer: TrainerInterface,
  closeModal: () => void
) => {
  const [error, setError] = React.useState(false);
  const trainerService = new TrainerService();
  const addTrainer = React.useCallback(
    async (body: TrainerInterfaceCreate) => {
      try {
        const id = await trainerService.create(body);
        setData((prevData) => [...prevData, { ...localTrainer, _id: id }]);
        closeModal()
      } catch (error) {
        setError(true);
      }
    },
    [setData, localTrainer]
  );

  return {
    error,
    addTrainer,
  };
};
