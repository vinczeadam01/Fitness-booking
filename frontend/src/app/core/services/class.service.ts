import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Class} from "../models/Class";
import {ClassForm} from "../../classes/parts/form-dialog/form-dialog.component";
import {Appointment} from "../models/Appointment";

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(
      'http://localhost:3000/api/course',
      {withCredentials: true}
    );
  }

  getById(id: string) {
    return this.http.get<Class>(
      `http://localhost:3000/api/course/${id}`,
      {withCredentials: true}
    );
  }

  create(data: ClassForm) {
    return this.http.post<Class>(
      'http://localhost:3000/api/course',
      data,
      {withCredentials: true}
    );
  }

  update(id: string, data: any) {
    return this.http.put<Class>(
      `http://localhost:3000/api/course/${id}`,
      data,
      {withCredentials: true}
    );
  }

  delete(id: string) {
    return this.http.delete(
      `http://localhost:3000/api/course/${id}`,
      {withCredentials: true}
    );
  }

  addAppointment(id: string, date: Date) {
    return this.http.post<Appointment>(
      `http://localhost:3000/api/course/${id}/appointment`,
      {date: date},
      {withCredentials: true}
    );
  }

  updateAppointment(classId: string, id: string, date: Date) {
    return this.http.put<Appointment>(
      `http://localhost:3000/api/course/${classId}/appointment/${id}`,
      {date: date},
      {withCredentials: true}
    );
  }

  deleteAppointment(classId: string | undefined, appointmentId: any) {
    return this.http.delete(
      `http://localhost:3000/api/course/${classId}/appointment/${appointmentId}`,
      {withCredentials: true}
    );
  }

  signUp(classId: string | undefined, appointmentId: any) {
    const data = {
      courseId: classId,
      appointmentId: appointmentId
    };
    return this.http.post<boolean>(
      `http://localhost:3000/api/registration`,
      data,
      {withCredentials: true}
    );
  }

  cancelAppointment(appointmentId: any) {
    const data = {
      appointmentId: appointmentId
    };

    return this.http.post<boolean>(
      'http://localhost:3000/api/registration/cancel',
      data,
      {withCredentials: true}
    );

  }
}
