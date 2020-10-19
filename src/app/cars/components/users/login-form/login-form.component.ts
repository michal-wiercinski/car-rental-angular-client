import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../../services/token-storage.service';
import {AuthService} from '../../../../services/auth.service';
import {NewCarFormComponent} from '../../cars/forms-components/new-car-form/new-car-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PasswordReminderFormComponent} from '../password-reminder-form/password-reminder-form.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  submitted = false;
  errorMessage = '';
  roles: string[] = [];


  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorageService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.loginForm = this.buildLoginForm();
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  buildLoginForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.submitted = true;
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        this.router.navigateByUrl('/');
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  private reloadPage(): void {
    window.location.reload();
  }

  openPasswordReminderFormModal() {
    this.modalService.open(PasswordReminderFormComponent, {size: 'md'});
  }
}
