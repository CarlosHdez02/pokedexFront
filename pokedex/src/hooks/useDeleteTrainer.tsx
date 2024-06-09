import React from "react";
import { TrainerInterface } from "../interfaces/TrainerInterface";
export const useDeleteTrainer = (setData:any) => {
  
    const deleteTrainer = React.useCallback(async(_id: string) => {
      console.log("Deleting trainer with id:", _id);
      setData((prevTrainers:any) => {
        return prevTrainers.filter((trainer:TrainerInterface) => trainer._id !== _id);
      });
    }, []);
  
  
    return {
      //trainers,
      deleteTrainer,
    };
  };
  