import React from "react";
import { TrainerInterface } from "../interfaces/TrainerInterface";

export const useAddTrainer = ()=>{
    const [trainers,setTrainers] = React.useState<TrainerInterface[]>()

    React.useEffect(()=>{
        const addTrainer = async()=>{
            try{
                const response = await fetch('',{
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(
                        {title:'First test'}) 
                })
                const data = await response.json()
                console.log(data)
               // setTrainers([...trainers, newTrainer])
            }catch(err:unknown){

            }
        }
        addTrainer()
    },[])
    return{
        trainers,

    }
}