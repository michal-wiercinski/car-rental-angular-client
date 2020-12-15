import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'us-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  newUserForm: FormGroup;
  isSuccessful = false;
  isRegistrationFailed = false;
  errorMessage = '';
  submitted = false;
  apiResponse = {message: '', error: false};
  errorFieldSubmitted = {};


  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  get formControls() {
    return this.newUserForm.controls;
  }

  get newPasswordControl() {
    return this.newUserForm.get('password.newPassword');
  }

  get confirmPasswordControl() {
    return this.newUserForm.get('password.confirmPassword');
  }

  ngOnInit(): void {
    this.newUserForm = this.buildNewUserForm();
  }

  buildNewUserForm() {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: this.formBuilder.group({
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      }),
      email: ['', [Validators.email, Validators.required]],
      city: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.authService.register(this.newUserForm.value).subscribe(data => {
        console.log(data);
        this.errorFieldSubmitted = {};
        this.apiResponse.error = false;
        this.apiResponse.message = 'Successful registration';
        this.isSuccessful = true;
        this.isRegistrationFailed = false;
        this.newUserForm.reset();
      },
      error => {
        const errorResponse = error.error;
        this.errorMessage = error.error.message;
        this.isRegistrationFailed = true;
        this.apiResponse.error = true;
        this.apiResponse.message = 'Registration error';
        if (errorResponse.error && errorResponse.message === 'VALIDATION_FAILED') {
          this.errorFieldSubmitted = errorResponse.data;
        }
      }
    );
  }
}
