import { Component } from '@angular/core';
import {GridComponent} from "../parts/grid/grid.component";
import {FilterComponent} from "../parts/filter/filter.component";
import {Class} from "../../core/models/Class";
import {ClassService} from "../../core/services/class.service";
import Categories from "../../core/models/Categories";
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormDialogComponent} from "../parts/form-dialog/form-dialog.component";
import {AuthService} from "../../core/services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    GridComponent,
    FilterComponent,
    FlexModule,
    MatButton,
    NgIf
  ],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {
    classes?: Class[];
    filteredClasses?: Class[];

    categories = Categories;


  constructor(
    private classService: ClassService,
    public dialog: MatDialog,
    protected authService: AuthService
  ) { }

  ngOnInit() {
    this.classService.getAll().subscribe({
      next: (data) => {
        this.classes = data as Class[];
        this.filteredClasses = data as Class[];
      }, error: (err) => {
      }
    });
  }

  filterByCategory(category: string | null) {
    if (!category) {
      this.filteredClasses = this.classes;
      return;
    }
    this.filteredClasses = this.classes!.filter(c => c.category === category);
  }

  filterBySearch(search: string) {
    this.filteredClasses = this.classes!.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.componentInstance.onSuccess.subscribe((res: Class) => {
      this.classes!.push(res);
      this.filteredClasses = this.classes;
    });
  }
}
