import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CarsService} from '../../../../../services/cars.service';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cs-new-car-component',
  templateUrl: './new-car-form.component.html',
  styleUrls: ['./new-car-form.component.scss']
})
export class NewCarFormComponent implements OnInit {
  @Input() carForm: FormGroup;
  closeResult = '';

  constructor(private carsService: CarsService,
              private router: Router,
              private formBuilder: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.carForm = this.buildCarForm();
  }

  buildCarForm() {
    return this.formBuilder.group({
      registrationNumber: [''],
      carModel: [null],
      location: [null],
      carStatus: [''],
      carParameter: this.formBuilder.group({
        dailyRate: [''],
        bodyTypeName: [''],
        numberOfSeats: [''],
        numberOfDoors: [''],
        fuelTankVolume: [''],
        volumeOfLuggage: [''],
        engineCapacity: [''],
        enginePower: [''],
        currentMileage: [''],
        fuelType: [''],
        averageFuelConsumption: [''],
        wheelDrive: [''],
        gearboxType: [''],
        numberOfGears: [''],
        yearOfProd: [''],
        color: [''],
      }),
    });
  }

  setCarModel(model) {
    console.log(model);
    this.carForm.patchValue({carModel: model.value});
  }

  setLocation(model) {
    console.log(model);
    this.carForm.patchValue({location: model.value});
  }

  onSubmit() {
    this.carsService.createCar(this.carForm.value).subscribe(() => {
      this.router.navigate(['/admin']);
    });
    this.modalService.dismissAll();
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
}
