import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatFormField, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {TrainerService} from "../../core/services/trainer.service";
import {Trainer} from "../../core/models/Trainer";
import {RouterLink} from "@angular/router";
import {FilterComponent} from "../../classes/parts/filter/filter.component";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../core/services/auth.service";
import {FormDialogComponent} from "../parts/form-dialog/form-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-trainers',
  standalone: true,
    imports: [
        FlexModule,
        MatFormField,
        MatIcon,
        MatInput,
        MatPrefix,
        ReactiveFormsModule,
        FormsModule,
        MatCard,
        MatCardContent,
        NgForOf,
        RouterLink,
        FilterComponent,
        MatButton,
        NgIf,
        MatCardTitle
    ],
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.scss'
})
export class TrainersComponent {
    items: Trainer[] = [];

    filteredItems: Trainer[] = [];

    constructor(
      private trainerService: TrainerService,
      protected authService: AuthService,
      public dialog: MatDialog,
    ) {}

    ngOnInit(): void {
      this.trainerService.getAll().subscribe({
        next: (data: any) => {
          this.items = data;
          this.filteredItems = data;
        }
      });
    }

    searchChanged(event: any) {
      const search = event.target.value;
      this.filteredItems = this.items.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
    }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FormDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
