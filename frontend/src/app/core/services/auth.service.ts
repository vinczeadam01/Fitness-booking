import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() isAuthenticated: EventEmitter<boolean> = new EventEmitter<boolean>();

  private userId: string | null = null;

  public role = 0;
  public isAdmin = () => this.role == 2;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const req = this.http.post(
      'http://localhost:3000/api/auth/login',
      body,
      {headers: headers, withCredentials: true}
    );

    req.subscribe({
      next: (data: any) => {
        this.isAuthenticated.emit(true);
        this.userId = data._id;
        this.role = data.role;
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.isAuthenticated.emit(false);
        this.userId = null;
      }
    });
    return req;
  }

  signup(user: any) {
    return this.http.post(
      'http://localhost:3000/api/auth/signup',
      user,
      {withCredentials: true}
    );
  }

  checkAuth() {
    return this.http.get(
      'http://localhost:3000/api/auth/user',
      {withCredentials: true}
    );
  }

  init() {
    this.checkAuth().subscribe({
      next: (data: any) => {
        if (data) {
          this.isAuthenticated.emit(true);
          this.userId = data._id;
          this.role = data.role;
        } else {
          this.isAuthenticated.emit(false);
        }
      },
      error: (err: any) => {
        this.isAuthenticated.emit(false);
      }
    });
  }

  getUserId() {
    return this.userId;
  }

  logout() {
    return this.http.get(
      'http://localhost:3000/api/auth/logout',
      {withCredentials: true}
    ).subscribe({
      next: () => {
        this.isAuthenticated.emit(false);
        this.userId = null;
        this.role = 0;
        this.router.navigate(['/login']);
      }
    })
  }
}
