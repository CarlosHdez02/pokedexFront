import React from "react";
import { TrainerInterface } from "../interfaces/TrainerInterface";
export const useDeleteTrainer = ()=>{
    const [trainers, setTrainers] = React.useState<TrainerInterface[]>()

    React.useEffect(()=>{
        const deleteTrainer = async(trainerId:number)=>{
            setTrainers(trainers?.filter(trainer=> trainer.id !== trainerId)
        )
        }
    },[])
    return{
        trainers
    }
}