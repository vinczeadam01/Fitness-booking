import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Trainer} from "../../core/models/Trainer";
import {TrainerService} from "../../core/services/trainer.service";
import {NgIf} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {Class} from "../../core/models/Class";
import {GridComponent} from "../../classes/parts/grid/grid.component";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [
    NgIf,
    FlexLayoutModule,
    GridComponent,
    FormsModule,
    MatInput,
    MatButton
  ],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.scss'
})
export class TrainerComponent {

  trainer: Trainer = {} as Trainer;
  classes: Class[] = [];
  file: any;
  constructor(
    private route: ActivatedRoute,
    private trainerService: TrainerService,
    public authService: AuthService
    ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.trainerService.getOne(id).subscribe(trainer => this.trainer = trainer);
    this.trainerService.getClasses(id).subscribe(classes => this.classes = classes);
  }

  onChange(event:any) {
    this.file = event.target.files[0];
  }

  upload() {
    this.trainerService.uploadImage(this.trainer._id, this.file).subscribe((data: any) => {
      this.trainer.img = data.url;
    });
  }


}
