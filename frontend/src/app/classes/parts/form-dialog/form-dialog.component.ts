import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {Class} from "../../../core/models/Class";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import Categories from "../../../core/models/Categories";
import {ClassService} from "../../../core/services/class.service";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {TrainerService} from "../../../core/services/trainer.service";

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

  @Output() onSuccess: EventEmitter<Class> = new EventEmitter<Class>();

  classForm: ClassForm = new ClassForm();
  trainerList: any[] = [];
  title: string = 'Create Class';

  constructor(
    private classService: ClassService,
    private trainerService: TrainerService,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { class?: Class },
  ) { }

  ngOnInit(): void {
    if (this.data.class) {
      this.title = 'Edit Class';
      this.classForm = {
        name: this.data.class.name,
        description: this.data.class.description,
        category: this.data.class.category,
        trainer: this.data.class.trainer._id,
        capacity: this.data.class.capacity,
        duration: this.data.class.duration
      };
    }

    this.trainerService.getAll().subscribe((res: any[]) => {
      this.trainerList = res.map((trainer) => {
        return {
          id: trainer._id,
          name: trainer.name
        };
      });
    });
  }

  submit() {
    if (this.data.class) {
      this.classService.update(this.data.class._id, this.classForm).subscribe((res: Class) => {
        this.onSuccess.emit(res);
        this.dialogRef.close();
      });
      return;
    }

    this.classService.create(this.classForm).subscribe((res: Class) => {
      this.onSuccess.emit(res);
      this.dialogRef.close();
    });
  }

  protected readonly Categories = Categories;

}

export class ClassForm {
  name: string = '';
  description: string = '';
  category: string = '';
  trainer: string = '';
  capacity: number = 10;
  duration: number = 60;
}
