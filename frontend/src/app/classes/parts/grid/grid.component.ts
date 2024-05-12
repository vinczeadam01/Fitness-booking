import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardImage, MatCardTitle} from "@angular/material/card";
import {Class} from "../../../core/models/Class";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'classes-grid',
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatCardContent,
    MatCardImage,
    MatCardTitle,
    RouterLink,
    NgIf
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {

  @Input() items?: Class[] = [];
  @Input() emptyMessage: string = 'No classes found';

  constructor() { }
}
