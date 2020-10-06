import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RentalService} from '../../../services/rental.service';
import {Car} from '../../../models/car';

@Component({
  selector: 'app-new-rental-form',
  templateUrl: './new-rental-form.component.html',
  styleUrls: ['./new-rental-form.component.scss']
})
export class NewRentalFormComponent implements OnInit {
  car: Car;
  rentalForm: FormGroup;
  isNotLimitedTime: boolean;

  constructor(private rentalService: RentalService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.loadCar();
    this.rentalForm = this.buildRentForm();
  }

  buildRentForm() {
    return this.formBuilder.group({
      startDate: [''],
      endDate: [{value: '', disabled: false}],
      isIndefiniteTime: ['']
    });
  }

  loadCar() {
    this.activeRoute.data.subscribe((response) => {
      this.car = response['car'];
    });
  }

  onChangeLimitedTime() {
    if (this.rentalForm.controls.isIndefiniteTime.value) {
      this.rentalForm.controls.endDate.disable();
    } else {
      this.rentalForm.controls.endDate.enable();
    }
  }

  onSubmit() {
    this.rentalService.createRent(this.car.id, this.rentalForm.value).subscribe(() => {
      this.router.navigate(['/cars']);
    });
  }
}
