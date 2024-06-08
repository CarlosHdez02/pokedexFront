import React from "react";
import { TrainerInterface } from "../interfaces/TrainerInterface";
export const useDeleteTrainer = (setData:any) => {
  
    const deleteTrainer = React.useCallback((id: number) => {
      console.log("Deleting trainer with id:", id);
      setData((prevTrainers:any) => {
        return prevTrainers.filter((trainer:any) => trainer.id !== id);
      });
    }, []);
  
  
    return {
      //trainers,
      deleteTrainer,
    };
  };
  