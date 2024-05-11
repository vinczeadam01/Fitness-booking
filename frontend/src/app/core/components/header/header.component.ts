import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Component} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'core-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbar,
    FlexLayoutModule,
    RouterOutlet,
    NgForOf,
    MatFormFieldModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'Fitness';
  navItems = [
    {name: 'Home', route: '/', icon: 'home_outlined'},
    {name: 'Classes', route: '/classes', icon: 'fitness_center'},
    {name: 'Trainers', route: '/trainers', icon: 'person_search'},
  ];
  isAuthenticated?: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated.subscribe({
      next: (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
