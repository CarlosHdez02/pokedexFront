import React from "react";
import { TrainerInterface } from "../interfaces/TrainerInterface";
import { TrainerService } from "../services/Pokemon.service";

export const useAddTrainer = (
  setData: (value: React.SetStateAction<TrainerInterface[]>) => void,
  localTrainer: TrainerInterface
) => {
  const trainerService = new TrainerService();
  const addTrainer = React.useCallback(
    async (
      body: Pick<
        TrainerInterface,
        "firstName" | "lastName" | "medals" | "phoneNumber"
      >
    ) => {
      const id = await trainerService.create(body);
      setData((prevData) => [...prevData, { ...localTrainer, _id: id }]);
    },
    [setData, localTrainer]
  );

  return {
    addTrainer,
  };
};
