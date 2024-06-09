import React from "react";
import { TrainerInterface } from "../interfaces/TrainerInterface";
import { TrainerService } from "../services/Pokemon.service";
export const useEditTrainer = (
  setData: (value: React.SetStateAction<TrainerInterface[]>) => void,
  trainer: TrainerInterface | undefined,
  localTrainer: TrainerInterface
) => {
  const trainerService = new TrainerService();
  const handleUpdate = React.useCallback(
    async (body: TrainerInterface, _id: string) => {
      await trainerService.update(_id, body);
      setData((prevData) => {
        const updatedData = prevData.map((el) => {
          if (el._id === trainer?._id) {
            return localTrainer;
          }
          return el;
        });
        return updatedData;
      });
    },
    [trainer, localTrainer, setData]
  );

  return {
    handleUpdate,
  };
};
