import {Class} from "./Class";
import {User} from "./User";

export interface Registration {
  _id: string;
  class: Class;
  user: User;
  appointmentId: string;
  date: string;
}
