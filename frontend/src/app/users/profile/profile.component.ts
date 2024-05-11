import { Component } from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {User} from "../../core/models/User";
import {AuthService} from "../../core/services/auth.service";
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FlexModule,
    RouterOutlet,
    MatButton,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  user: User | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? this.authService.getUserId();
    if (!id) {
      console.error('No user id provided');
      return;
    }
    this.userService.getOne(id).subscribe({
      next: (user: any) => {
        this.user = user;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

}
