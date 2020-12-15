import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {User} from '../../../../models/user';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'us-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  isUpdate: boolean;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isUpdate = false;
    this.loadUser();
    this.userForm = this.buildUserForm();
  }

  loadUser() {
    this.user = this.route.snapshot.data['user'];
    console.log(this.user);
  }

  buildUserForm() {
    return this.formBuilder.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email],
      addressId: [this.user.addressId],
//      country: [{value: this.user.firstName, disabled: true}],
      city: [this.user.city],
      street: [this.user.street],
      houseNumber: [this.user.houseNumber],
      zipCode: [this.user.zipCode]
    });
  }

  onSubmit() {
    console.log(this.userForm.value);
    this.userService.updateUser(this.user.id, this.userForm.value).subscribe(() => {
      this.router.navigate(['/user-profile']);
    });
  }

  onChangeToUpdate() {
    this.isUpdate = !this.isUpdate;
  }
}
