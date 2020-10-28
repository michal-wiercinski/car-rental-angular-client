import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'cs-password-update-form',
  templateUrl: './password-update-form.component.html',
  styleUrls: ['./password-update-form.component.scss']
})
export class PasswordUpdateFormComponent implements OnInit {
  updatePasswordForm: FormGroup;
  isCollapsed: boolean;
  errorMessage = '';
  submitted = false;
  apiResponse = {message: '', error: false};
  errorFieldSubmitted = {};

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.updatePasswordForm = this.buildUpdatePasswordForm();
  }

  get updatePasswordFormControl() {
    return this.updatePasswordForm.controls;
  }

  buildUpdatePasswordForm() {
    return this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.userService.updatePassword(this.updatePasswordForm.value).subscribe(() => {
        this.errorFieldSubmitted = {};
        this.apiResponse.error = false;
        this.apiResponse.message = 'Password has been updated';
        this.updatePasswordForm.reset();
      },
      error => {
        const errorResponse = error.error;
        this.errorMessage = error.error.message;
        this.apiResponse.error = true;
        this.apiResponse.message = 'Password change error';
        if (errorResponse.error && errorResponse.message === 'VALIDATION_FAILED') {
          this.errorFieldSubmitted = errorResponse.data;
        }
      }
    );
  }

  collapsing() {
    this.isCollapsed = !this.isCollapsed;
  }
}

