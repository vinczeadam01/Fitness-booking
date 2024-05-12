import {Component, Inject, Input} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {TrainerService} from "../../../core/services/trainer.service";
import {Trainer} from "../../../core/models/Trainer";

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIcon,
    MatInput,
    FormsModule,
    MatButton,
    MatSelect,
    MatOption,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatDialogTitle
  ],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss'
})
export class FormDialogComponent {

  trainerForm: TrainerForm = new TrainerForm();
  title: string = 'Create Trainer';

  constructor(
    private trainerService: TrainerService,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {trainer?: Trainer}
  ) { }

  ngOnInit(): void {
    if (this.data.trainer) {
      this.trainerForm = this.data.trainer;
      this.title = 'Edit Trainer';
    }
  }

  submit() {
    if (this.data.trainer) {
      this.trainerService.update(this.data.trainer._id, this.trainerForm as Trainer).subscribe((res) => {
        console.log(res);
      });
      return;

    }
    this.trainerService.create(this.trainerForm as Trainer).subscribe((res) => {
      console.log(res);
    });
  }

}

class TrainerForm {
  name: string = '';
  description: string = '';
}
