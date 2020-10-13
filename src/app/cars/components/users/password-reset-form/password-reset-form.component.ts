import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'cs-password-change-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.scss']
})
export class PasswordResetFormComponent implements OnInit {
  changePasswordForm: FormGroup;
  tokenFromUrl: string;

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


  buildChangePasswordForm() {
    return this.formBuilder.group({
      newPassword: [''],
      confirmPassword: [''],
      token: [this.tokenFromUrl],
    });
  }

  onSubmit() {
    console.log(this.changePasswordForm.value);
    this.userService.changePasswordByToken(this.tokenFromUrl, this.changePasswordForm.value).subscribe(() => {
      this.router.navigate(['/sign-in']);
    });
  }
}

