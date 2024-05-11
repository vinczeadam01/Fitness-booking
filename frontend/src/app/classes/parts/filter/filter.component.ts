import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatFormField, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {NgForOf} from "@angular/common";
import {FlexModule} from "@angular/flex-layout";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'classes-filter',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    MatChipListbox,
    MatChipOption,
    NgForOf,
    FlexModule,
    MatIcon,
    MatPrefix
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  @Input() categories: string[] = [];

  @Output() filterEvent = new EventEmitter<string | null>();
  @Output() searchEvent = new EventEmitter<string>();

  search: string = '';

  constructor() { }

  filterByCategory(category: string | null, event: any) {
    if (event.selected === false) {
      category = null;
    }
    this.filterEvent.emit(category);
  }

  searchItems(event: any) {
    this.searchEvent.emit(event.target.value);
  }

}
