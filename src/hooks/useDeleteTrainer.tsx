import React from "react";
import { TrainerInterface } from "../interfaces/TrainerInterface";
import { TrainerService } from "../services/Trainer.service";

export const useDeleteTrainer = (setData: any) => {
  const trainerService = new TrainerService();
  const [error, setSerror] = React.useState(false);
  const deleteTrainer = React.useCallback(async (_id: string) => {
   try {
    await trainerService.delete(_id);
    setData((prevTrainers: any) => {
      return prevTrainers.filter(
        (trainer: TrainerInterface) => trainer._id !== _id
      );
    });
   } catch (error) {
    setSerror(true)
   }
  }, [setData]);

  return {
    error,
    deleteTrainer,
  };
};
