import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../core/services/auth.service";
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    FlexModule,
    MatButton,
    RouterLink
  ],
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router, private authService: AuthService) {
  }

}
