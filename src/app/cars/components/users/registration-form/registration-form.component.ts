import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  newUserForm: FormGroup;
  isSuccessful = false;
  isRegistrationFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }


  ngOnInit(): void {
    this.newUserForm = this.buildNewUserForm();
  }

  buildNewUserForm() {
    return this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      password: this.formBuilder.group({
        newPassword: [''],
        confirmPassword: [''],
      }),
      email: [''],
      //country: [''],
      city: [''],
      street: [''],
      houseNumber: [''],
      zipCode: ['']
    });
  }

  onSubmit() {
    this.authService.register(this.newUserForm.value).subscribe(data => {
        console.log(data);
        this.isSuccessful = true;
        this.isRegistrationFailed = false;
        /*this.router.navigate(['/cars']);*/
      },
      error => {
        this.errorMessage = error.error.message;
        this.isRegistrationFailed = true;
      }
    );
  }
}
