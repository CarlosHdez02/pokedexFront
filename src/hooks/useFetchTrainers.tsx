import React from "react";
import { TrainerInterface } from "../interfaces/TrainerInterface";
import { TrainerService } from "../services/Trainer.service";

const useFetchTrainers = (
  setData: React.Dispatch<React.SetStateAction<TrainerInterface[]>>
) => {
  const trainerService = new TrainerService();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown | undefined>();

  React.useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true);
      try {
        const data = await trainerService.get();
        setData(data);
      } catch (err: unknown) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  return {
    loading,
    error,
  };
};

export default useFetchTrainers;
