import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CarsService} from '../../../services/cars.service';
import {Router} from '@angular/router';

@Component({
  selector: 'cs-cars-filter',
  templateUrl: './cars-filter.component.html',
  styleUrls: ['./cars-filter.component.scss']
})
export class CarsFilterComponent implements OnInit {
  filterForm: FormGroup;
  @Output()
  urlParam = new EventEmitter<string>();
  isCollapsed: boolean;

  constructor(private carsService: CarsService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.isCollapsed = false;
    this.filterForm = this.buildFilterForm();
  }

  collapsing() {
    this.isCollapsed = !this.isCollapsed;
  }

  buildFilterForm() {
    return this.formBuilder.group({
      ['registrationNumber']: [''],
      ['carModel.id']: [''],
      ['location.name']: [''],
      ['carStatus.carStatusName']: [''],
      ['carParameter.dailyRate']: [''],
      ['carParameter.yearOfProd']: [''],
      ['carParameter.color']: [''],
      ['carParameter.currentMileage']: [''],
      ['carParameter.bodyType.bodyTypeName']: [''],
      ['carParameter.bodyType.numberOfSeats']: [''],
      ['carParameter.bodyType.numberOfDoors']: [''],
      ['carParameter.bodyType.fuelTankVolume']: [''],
      ['carParameter.bodyType.volumeOfLuggage']: [''],
      ['carParameter.engine.engineCapacity']: [''],
      ['carParameter.engine.enginePower']: [''],
      ['carParameter.engine.fuelType']: [''],
      ['carParameter.engine.averageFuelConsumption']: [''],
      ['carParameter.driveTrain.wheelDrive']: [''],
      ['carParameter.driveTrain.gearboxType']: [''],
      ['carParameter.driveTrain.numberOfGears']: ['']
    });
  }

  decode(): void {
    const formValue = {...this.filterForm.value};

    for (let prop in formValue) {
      if (!formValue[prop]) {
        delete formValue[prop];
      }

      if (Array.isArray(formValue[prop])) {
        const resultArray = formValue[prop].filter(item => item);
        if (resultArray.length > 0) {
          formValue[prop] = resultArray;
        } else {
          delete formValue[prop];
        }
      }
    }
    const decodedForm = JSON.stringify(formValue)
      .replace(/{/g, '')
      .replace(/}/g, '')
      .replace(/\\/g, '')
      .replace(/"/g, '')
      .replace(/:/g, '\=')
      .replace(/,/g, '\&');

    this.urlParam.emit(decodedForm);
  }


  setCarModel(model) {
    console.log(model);
    this.filterForm.patchValue({
      ['carModel.id']: model.value.id
    });
  }

  setLocation(model) {
    console.log(model);
    this.filterForm.patchValue({['location.name']: model.value.name});
  }


  onSubmit() {
    this.decode();
  }
}

