import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Trainer} from "../models/Trainer";
import {Class} from "../models/Class";

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Trainer[]>(
      'http://localhost:3000/api/trainer',
      {withCredentials: true}
    );
  }

  getOne(id: any) {
    return this.http.get<Trainer>(
      `http://localhost:3000/api/trainer/${id}`,
      {withCredentials: true}
    );
  }

  create(trainer: Trainer) {
    return this.http.post(
      'http://localhost:3000/api/trainer',
      trainer,
      {withCredentials: true}
    );
  }

  getClasses(trainerId: any) {
    return this.http.get<Class[]>(
      `http://localhost:3000/api/trainer/${trainerId}/courses`,
      {withCredentials: true}
    );
  }

  uploadImage(trainerId: any, file: any) {
    const formData = new FormData();
    formData.append("file", file, file.name);

    return this.http.post(
      `http://localhost:3000/api/trainer/${trainerId}/upload`,
      formData,
      {withCredentials: true}
    );
  }
}
