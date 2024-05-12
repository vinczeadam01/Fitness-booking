import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/User";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButton,
    RouterLink,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements AfterViewInit{

  dataSource = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
