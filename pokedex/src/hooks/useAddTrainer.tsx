import React from "react";
import { TrainerInterface } from "../interfaces/TrainerInterface";

export const useAddTrainer = () => {
  const addTrainer = React.useCallback(
    async (
      body: Pick<
        TrainerInterface,
        "firstName" | "lastName" | "medals" | "phoneNumber"
      >
    ) => {
      try {
        const response = await fetch("http://localhost:3000/api/trainers/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch trainers");
        }
        return data._id;
      } catch (err: unknown) {}
    },
    []
  );

  return {
    addTrainer,
  };
};
