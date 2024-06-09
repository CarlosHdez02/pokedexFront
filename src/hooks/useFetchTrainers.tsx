import React from "react";
import { TrainerInterface } from "../interfaces/TrainerInterface";

const useFetchTrainers = (
  setData: React.Dispatch<React.SetStateAction<TrainerInterface[]>>
) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown | undefined>();

  React.useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/trainers/");
        if (!response.ok) {
          throw new Error("Failed to fetch trainers");
        }
        const data = await response.json();
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
