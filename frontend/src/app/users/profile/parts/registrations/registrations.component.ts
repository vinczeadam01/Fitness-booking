import {Component, ViewChild} from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {AuthService} from "../../../../core/services/auth.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {DatePipe} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {MatButton} from "@angular/material/button";
import {Registration} from "../../../../core/models/Registration";
import {ClassService} from "../../../../core/services/class.service";
import {resolve} from "@angular/compiler-cli";

@Component({
  selector: 'app-registrations',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    DatePipe,
    MatPaginator,
    MatButton
  ],
  templateUrl: './registrations.component.html',
  styleUrl: './registrations.component.scss'
})
export class RegistrationsComponent {

  public registrations: any[] = [];
  displayedColumns: string[] = ['category', 'class', 'date', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private classService: ClassService,
  ) {}

  ngOnInit() {
    this.userService.getRegistrations(this.authService.getUserId()).subscribe(
      (registrations) => {
        this.registrations = registrations;

        for (let i = 0; i < this.registrations.length; i++) {
          this.registrations[i].appointment = this.registrations[i].course.appointments.find((appointment: any) => appointment._id === this.registrations[i].appointmentId);
        }
      }
    );
  }


  cancel(element: Registration) {
    this.classService.cancelAppointment(element.appointmentId).subscribe(
      (response) => {
        this.registrations = this.registrations.filter((registration) => registration._id !== element._id);
      }
    );
  }
}
