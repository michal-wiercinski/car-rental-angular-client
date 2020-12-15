import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'us-password-change-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.scss']
})
export class PasswordResetFormComponent implements OnInit {
  changePasswordForm: FormGroup;
  tokenFromUrl: string;
  errorMessage = '';
  submitted = false;
  apiResponse = {message: '', error: false};
  errorFieldSubmitted = {};

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadToken();
    this.changePasswordForm = this.buildChangePasswordForm();
  }

  loadToken() {
    this.tokenFromUrl = this.route.snapshot.params['token'];
  }

  get changePasswordFormControl() {
    return this.changePasswordForm.controls;
  }

  buildChangePasswordForm() {
    return this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      token: [this.tokenFromUrl, Validators.required],
    });
  }

  onSubmit() {
    console.log(this.changePasswordForm.value);
    this.userService.changePasswordByToken(this.tokenFromUrl, this.changePasswordForm.value).subscribe(() => {
        this.router.navigate(['/sign-in']);
      },
      error => {
        const errorResponse = error.error;
        this.errorMessage = error.error.message;
        this.apiResponse.error = true;
        this.apiResponse.message = 'Password change error';
        if (errorResponse.error && errorResponse.message === 'VALIDATION_FAILED') {
          this.errorFieldSubmitted = errorResponse.data;
        }
      });
  }
}
