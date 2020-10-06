import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CarsService} from '../../../../services/cars.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Car} from '../../../../models/car';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cs-edit-car-component',
  templateUrl: './edit-car-form.component.html',
  styleUrls: ['./edit-car-form.component.scss']
})
export class EditCarFormComponent implements OnInit {
  closeResult = '';
  carForm: FormGroup;
  car: Car;

  constructor(private carsService: CarsService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loadCar();
    this.carForm = this.buildCarForm();
  }

  loadCar() {
    this.route.data.subscribe((response) => {
      this.car = response['car'];
    });
  }


  buildCarForm() {
    return this.formBuilder.group({
      registrationNumber: this.car.registrationNumber,
      carModel: [this.car.carModel],
      location: [this.car.location],
      carStatus: [this.car.carStatus],
      carParameter: this.formBuilder.group({
        dailyRate: [this.car.carParameter.dailyRate],
        bodyTypeName: [this.car.carParameter.bodyTypeName],
        numberOfSeats: [this.car.carParameter.numberOfSeats],
        numberOfDoors: [this.car.carParameter.numberOfDoors],
        fuelTankVolume: [this.car.carParameter.fuelTankVolume],
        volumeOfLuggage: [this.car.carParameter.volumeOfLuggage],
        engineCapacity: [this.car.carParameter.engineCapacity],
        enginePower: [this.car.carParameter.enginePower],
        currentMileage: [this.car.carParameter.currentMileage],
        fuelType: [this.car.carParameter.fuelType],
        averageFuelConsumption: [this.car.carParameter.averageFuelConsumption],
        wheelDrive: [this.car.carParameter.wheelDrive],
        gearboxType: [this.car.carParameter.gearboxType],
        numberOfGears: [this.car.carParameter.numberOfGears],
        yearOfProd: [this.car.carParameter.yearOfProd],
        color: [this.car.carParameter.color],
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
    this.carsService.updateCar(this.car.id, this.carForm.value).subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }
}

