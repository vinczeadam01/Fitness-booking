import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'core-footer',
  standalone: true,
  imports: [
    FlexModule,
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
