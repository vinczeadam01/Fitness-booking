import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../core/services/auth.service";
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {ClassService} from "../core/services/class.service";
import {GridComponent} from "../classes/parts/grid/grid.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    FlexModule,
    MatButton,
    RouterLink,
    GridComponent
  ],
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public popularClasses: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private classService: ClassService
  ) {}

  ngOnInit() {
    this.classService.getPopular().subscribe((classes: any) => {
      this.popularClasses = classes;
    });
  }

}
