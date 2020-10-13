import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'cs-password-update-form',
  templateUrl: './password-update-form.component.html',
  styleUrls: ['./password-update-form.component.scss']
})
export class PasswordUpdateFormComponent implements OnInit {
  updatePasswordForm: FormGroup;
  isCollapsed: boolean;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.updatePasswordForm = this.buildUpdatePasswordForm();
  }

  buildUpdatePasswordForm() {
    return this.formBuilder.group({
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
  }

  onSubmit() {
    console.log(this.updatePasswordForm.value);
    this.userService.updatePassword(this.updatePasswordForm.value).subscribe(() => {
      this.router.navigate(['/user-profile']);
    });
  }

  collapsing() {
    this.isCollapsed = !this.isCollapsed;
  }
}

