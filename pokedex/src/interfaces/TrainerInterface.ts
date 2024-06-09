export interface TrainerInterface{
    _id: string;
    firstName:string;
    lastName:string;
    phoneNumber:string ;
    medals:number ;
}

export type TrainerInterfaceCreate = Pick<TrainerInterface, 'firstName' | 'lastName' | 'medals' | 'phoneNumber'>
 