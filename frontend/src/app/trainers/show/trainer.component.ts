import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Trainer} from "../../core/models/Trainer";
import {TrainerService} from "../../core/services/trainer.service";
import {NgIf} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {Class} from "../../core/models/Class";
import {GridComponent} from "../../classes/parts/grid/grid.component";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {AuthService} from "../../core/services/auth.service";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../core/components/confirm-modal/confirm-modal.component";
import {FormDialogComponent} from "../parts/form-dialog/form-dialog.component";

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [
    NgIf,
    FlexLayoutModule,
    GridComponent,
    FormsModule,
    MatInput,
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.scss'
})
export class TrainerComponent {

  trainer: Trainer = {} as Trainer;
  classes: Class[] = [];
  file: any;
  constructor(
    private route: ActivatedRoute,
    private trainerService: TrainerService,
    public authService: AuthService,
    private dialog: MatDialog
    ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.trainerService.getOne(id).subscribe(trainer => this.trainer = trainer);
    this.trainerService.getClasses(id).subscribe(classes => this.classes = classes);
  }

  onChange(event:any) {
    this.file = event.target.files[0];
  }

  upload() {
    this.trainerService.uploadImage(this.trainer._id, this.file).subscribe((data: any) => {
      this.trainer.img = data.url;
    });
  }


  deleteTrainer() {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Delete Trainer',
        message: 'Are you sure you want to delete this trainer?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainerService.delete(this.trainer._id).subscribe(() => {
          window.location.href = '/trainers';
        });
      }
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        trainer: this.trainer
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainerService.getOne(this.trainer._id).subscribe(trainer => this.trainer = trainer);
      }
    });
  }
}
