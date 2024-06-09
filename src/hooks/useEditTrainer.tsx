import React from "react";
import { TrainerInterface } from "../interfaces/TrainerInterface";
import { TrainerService } from "../services/Trainer.service";
export const useEditTrainer = (
  setData: (value: React.SetStateAction<TrainerInterface[]>) => void,
  trainer: TrainerInterface | undefined,
  localTrainer: TrainerInterface,
  closeModal: () => void
) => {
  const [error, setError] = React.useState(false);
  const trainerService = new TrainerService();
  const handleUpdate = React.useCallback(
    async (body: TrainerInterface, _id: string) => {
      try {
        await trainerService.update(_id, body);
      setData((prevData) => {
        const updatedData = prevData.map((el) => {
          if (el._id === trainer?._id) {
            return localTrainer;
          }
          return el;
        });
        closeModal()
        return updatedData;
      });
      } catch (error) {
        setError(true);
      }
    },
    [trainer, localTrainer, setData]
  );

  return {
    error,
    handleUpdate,
  };
};
