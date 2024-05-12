import {Component, ViewChild} from '@angular/core';
import {FormDialogComponent} from "../parts/form-dialog/form-dialog.component";
import {FlexModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {GridComponent} from "../parts/grid/grid.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ClassService} from "../../core/services/class.service";
import {Class} from "../../core/models/Class";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {AddAppointmentDialogComponent} from "../parts/add-appointment-dialog/add-appointment-dialog.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {Appointment} from "../../core/models/Appointment";
import {ConfirmModalComponent} from "../../core/components/confirm-modal/confirm-modal.component";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {AuthService} from "../../core/services/auth.service";
import {MatPaginator} from "@angular/material/paginator";
import {ViewAppointmentDialogComponent} from "../parts/view-appointment-dialog/view-appointment-dialog.component";
import {AlertService} from "../../core/services/alert.service";

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [
    FormDialogComponent,
    FlexModule,
    FormsModule,
    GridComponent,
    MatButton,
    NgIf,
    MatIcon,
    RouterLink,
    DatePipe,
    NgForOf,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatPaginator,
  ],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss'
})
export class ClassComponent {

  public class: Class | null = null;

  appointmentsDataSource = new MatTableDataSource<Appointment>([]);
  appointmentsDisplayColumnsUser: string[] = ['date', 'freeSpaces', 'actionUser'];
  appointmentsDisplayColumnsAdmin: string[] = ['date', 'freeSpaces', 'actionAdmin'];
  appointmentsDisplayColumnsGuest: string[] = ['date', 'freeSpaces'];

  appointmentsDisplayColumns: string[] = [];


  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.classService.getById(id).subscribe((data: Class) => {
      this.class = data;
      this.appointmentsDataSource.data = this.class.appointments;
    });

    if (!this.authService.getUserId()) {
      this.appointmentsDisplayColumns = this.appointmentsDisplayColumnsGuest;
    } else {
      this.appointmentsDisplayColumns = this.authService.isAdmin() ? this.appointmentsDisplayColumnsAdmin : this.appointmentsDisplayColumnsUser;
    }
  }

  openAppointmentDialog(appointment?: Appointment) {
    let dialogRef = this.dialog.open(AddAppointmentDialogComponent, {
      data: {
        classId: this.class?._id,
        appointment: appointment
      }
    });

    dialogRef.componentInstance.onSuccess.subscribe((res: Appointment) => {
      // if the appointment is already in the list, update it
      const index = this.class?.appointments.findIndex((a) => a._id === res._id);
      if (index !== undefined && index !== -1) {
        if (this.class) {
          this.class.appointments = this.class.appointments.map((a, i) => i === index ? res : a);
          this.alertService.info('Appointment updated');
        }
      } else {
        if (this.class) {
          this.class.appointments = [...this.class.appointments, res];
          this.alertService.info('Appointment added');
        }
      }

    });
  }

  signUp(appointmentId: any) {
    this.classService.signUp(this.class?._id, appointmentId).subscribe((res: boolean) => {
      if (res && this.class) {
        const appointment = this.class.appointments.find((a) => a._id === appointmentId);
        if (appointment) {
          appointment.registrations.push({user: this.authService.getUserId()});
        }
        this.class.appointments = [...this.class.appointments];
        this.alertService.info('Signed up for appointment');
      }
    });
  }

  cancel(appointmentId: any) {
    this.classService.cancelAppointment(appointmentId).subscribe((res: boolean) => {
      if (res && this.class) {
        const appointment = this.class.appointments.find((a) => a._id === appointmentId);
        if (appointment) {
          appointment.registrations = appointment.registrations.filter((r: any) => r.user !== this.authService.getUserId());
        }
        this.class.appointments = [...this.class.appointments];
        this.alertService.info('Canceled appointment');
      }
    });
  }

  deleteAppointment(appointmentId: any) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Delete Appointment',
        message: 'Are you sure you want to delete this appointment?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classService.deleteAppointment(this.class?._id, appointmentId).subscribe(() => {
          if (this.class) {
            this.class.appointments = this.class.appointments.filter((a) => a._id !== appointmentId);
          }
          this.alertService.info('Appointment deleted');
        });
      }
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px',
      data: {
        class: this.class
      }
    });

    dialogRef.componentInstance.onSuccess.subscribe((res: Class) => {
      this.class = res;
      this.alertService.info('Class updated');
    });
  }

  deleteClass() {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Delete Class',
        message: 'Are you sure you want to delete this class?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.class) {
        this.classService.delete(this.class._id).subscribe(() => {
          this.router.navigate(['/classes']);
        });
      }
    });
  }

  arraySome(array: any[], value: any) {
    return array.some((a) => a.user === value);
  }

  viewAppointment(_id: any) {
    this.dialog.open(ViewAppointmentDialogComponent, {
      width: '500px',
      data: {
        appointmentId: _id
      }
    });
  }
}
