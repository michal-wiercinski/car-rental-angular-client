import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  isUpdate: boolean;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isUpdate = false;
    this.loadUser();
    this.userForm = this.buildUserForm();
  }

  loadUser() {
    this.userService.getUser().subscribe(data => {
      console.log(data);
      this.user = data;
      console.log(this.user);
    });
  }

  buildUserForm() {
    return this.formBuilder.group({
      firstName: [{value: this.user.firstName, disabled: true}],
      lastName: [{value: this.user.lastName, disabled: true}],
      email: [{value: this.user.email, disabled: true}],
//      country: [{value: this.user.firstName, disabled: true}],
      city: [{value: this.user.city, disabled: true}],
      street: [{value: this.user.street, disabled: true}],
      houseNumber: [{value: this.user.houseNumber, disabled: true}],
      zipCode: [{value: this.user.zipCode, disabled: true}]
    });
  }

  onSubmit() {
    this.userService.updateUser(this.userForm.value).subscribe(() => {
      this.router.navigate(['/user-profile']);
    });
  }

  onChangeToUpdate() {
    this.isUpdate = !this.isUpdate;
  }
}
