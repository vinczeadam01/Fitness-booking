import {Component, ViewChild} from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {AuthService} from "../../../../core/services/auth.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {DatePipe} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {MatButton} from "@angular/material/button";
import {Registration} from "../../../../core/models/Registration";
import {ClassService} from "../../../../core/services/class.service";
import {resolve} from "@angular/compiler-cli";
import {ActivatedRoute, RouterLink} from "@angular/router";

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
    MatButton,
    RouterLink,
    MatNoDataRow
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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.parent?.snapshot.paramMap.get('id') ?? this.authService.getUserId();
    this.userService.getRegistrations(id).subscribe(
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
