import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-password-reminder-form-component',
  templateUrl: './password-reminder-form.component.html',
  styleUrls: ['./password-reminder-form.component.scss']
})
export class PasswordReminderFormComponent implements OnInit {

  @Input() emailForm: FormGroup;
  submitted = false;
  errorMessage = '';
  apiResponse = {message: '', error: false};
  errorFieldSubmitted = {};
  closeResult = '';

  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.emailForm = this.buildEmailForm();
  }

  get emailControl() {
    return this.emailForm.controls.email;
  }

  buildEmailForm() {
    return this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.emailForm.value.email);
    this.userService.sendPasswordResetToken(this.emailForm.value.email).subscribe(() => {
        this.router.navigate(['/sign-in']);
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
