import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackBar: MatSnackBar) {
  }

  info(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }

  error(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
