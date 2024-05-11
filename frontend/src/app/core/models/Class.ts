import {Trainer} from "./Trainer";
import {Appointment} from "./Appointment";

export interface Class {
  _id: string;
  name: string;
  description: string;
  category: string;
  duration: number;
  capacity: number;
  trainer: Trainer;
  appointments: Appointment[];
}
