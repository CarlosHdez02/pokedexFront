import React from "react";
import { TrainerInterface } from "../interfaces/TrainerInterface";
import { TrainerService } from "../services/Pokemon.service";

export const useDeleteTrainer = (setData: any) => {
  const trainerService = new TrainerService();
  const deleteTrainer = React.useCallback(async (_id: string) => {
    await trainerService.delete(_id);
    setData((prevTrainers: any) => {
      return prevTrainers.filter(
        (trainer: TrainerInterface) => trainer._id !== _id
      );
    });
  }, [setData]);

  return {
    deleteTrainer,
  };
};
