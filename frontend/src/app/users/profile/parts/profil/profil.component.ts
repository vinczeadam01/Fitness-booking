import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {User} from "../../../../core/models/User";
import {AuthService} from "../../../../core/services/auth.service";
import {UserService} from "../../../../core/services/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    FlexModule,
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
    NgIf,
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {

    user: User | null = null;
    profileForm?: ProfileForm;
    passwordForm: PasswordForm = new PasswordForm();

    constructor(private authService: AuthService, private userService: UserService) { }

    ngOnInit(): void {
      this.userService.getOne(this.authService.getUserId()).subscribe((user: any) => {
        this.user = user;
        this.profileForm = new ProfileForm(user);
      });
    }

    submit() {
      this.userService.update(this.authService.getUserId(), this.profileForm).subscribe((user: any) => {
        this.user = user;
      });
    }

    savePassword() {
      if (!this.passwordForm.validate()) {
        return;
      }

    }

}

class ProfileForm {
  email: string = '';
  name: string = '';

  constructor(user: User) {
    this.email = user.email;
    this.name = user.name;
  }
}

class PasswordForm {
  oldPassword: string = '';
  newPassword: string = '';
  reNewPassword: string = '';

  error: string = '';

  validate(): boolean {
    if (!this.oldPassword || !this.newPassword || !this.reNewPassword) {
      this.error = 'All fields are required';
      return false;
    }

    if (this.newPassword.length < 8) {
      this.error = 'The new password must be at least 8 characters long';
      return false;
    }

    if (this.newPassword !== this.reNewPassword) {
      this.error = 'The new password and the confirmation do not match';
      return false;
    }

    return true;
  }
}
