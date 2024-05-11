import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {ClassService} from "../../../core/services/class.service";
import {Appointment} from "../../../core/models/Appointment";
import {Class} from "../../../core/models/Class";

@Component({
  selector: 'app-add-appointment-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInput,
    DatePipe,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add-appointment-dialog.component.html',
  styleUrl: './add-appointment-dialog.component.scss'
})
export class AddAppointmentDialogComponent {

  @Output() onSuccess: EventEmitter<Appointment> = new EventEmitter<Appointment>();

  public date: Date = new Date();
  public title: string = 'Add Appointment';

  constructor(
    private classService: ClassService,
    @Inject(MAT_DIALOG_DATA) public data: {classId: string, appointment?: Appointment},
    public dialogRef: MatDialogRef<AddAppointmentDialogComponent>
    ) {
  }

  ngOnInit() {
    if (this.data.appointment) {
      this.date = new Date(this.data.appointment.date);
      this.title = 'Update Appointment';
    }
  }

  onDateChanged($event: Event) {
    const date = ($event.target as HTMLInputElement).value;
    this.date = new Date(date);
  }

  submit() {
    if (!this.data.appointment) {
      this.classService.addAppointment(this.data.classId, this.date).subscribe((res: Appointment) => {
        this.onSuccess.emit(res as Appointment);
        this.dialogRef.close();
      });
    } else {
      this.classService.updateAppointment(this.data.classId, this.data.appointment._id, this.date).subscribe((res: Appointment) => {
        this.onSuccess.emit(res as Appointment);
        this.dialogRef.close();
      });
    }

  }
}
