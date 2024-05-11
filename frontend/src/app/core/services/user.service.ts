import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Appointment} from "../models/Appointment";
import {Registration} from "../models/Registration";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(
      'http://localhost:3000/api/user',
      {withCredentials: true}
    );
  }

  getOne(id: any) {
    return this.http.get(
      `http://localhost:3000/api/user/${id}`,
      {withCredentials: true}
    );
  }

  update(id: any, data: any) {
    return this.http.put(
      `http://localhost:3000/api/user/${id}`,
      data,
      {withCredentials: true}
    );
  }

  delete(id: any) {
    return this.http.delete(
      `http://localhost:3000/api/user/${id}`,
      {withCredentials: true}
    );
  }

  getRegistrations(userId: any) {
    return this.http.get<Registration[]>(
      `http://localhost:3000/api/user/${userId}/registrations`,
      {withCredentials: true}
    );
  }
}
