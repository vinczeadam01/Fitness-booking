import {Component, Inject, Input} from '@angular/core';
import {ClassService} from "../../../core/services/class.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {Class} from "../../../core/models/Class";
import {MatList, MatListItem} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {User} from "../../../core/models/User";
import {NgForOf} from "@angular/common";
import {FlexModule} from "@angular/flex-layout";

@Component({
  selector: 'app-view-appointment-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatList,
    MatListItem,
    MatLine,
    NgForOf,
    FlexModule
  ],
  templateUrl: './view-appointment-dialog.component.html',
  styleUrl: './view-appointment-dialog.component.scss'
})
export class ViewAppointmentDialogComponent {

  public registrations: any[] = [];

  constructor(
    private classService: ClassService,
    @Inject(MAT_DIALOG_DATA) public data: { appointmentId: string },
  ) {}

  ngOnInit() {
    this.classService.getParticipantsForAppointment(this.data.appointmentId).subscribe(registrations => {
      this.registrations = registrations;
    });
  }

  removeRegistration(id: string) {
    this.classService.deleteRegistration(id).subscribe(() => {
      this.registrations = this.registrations.filter(registration => registration._id !== id);
    });
  }


}
