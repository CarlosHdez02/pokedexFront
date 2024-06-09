import React from "react";
import { TrainerInterface } from "../interfaces/TrainerInterface";
export const useEditTrainer = () => {
  const handleUpdate = React.useCallback(async (body: TrainerInterface, id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/trainers/${id}`, {
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch trainers");
      }
      const data = await response.json();
      return data;
    } catch (err: unknown) {
    } finally {
    }
  }, []);
  return {
    handleUpdate,
  };
};
