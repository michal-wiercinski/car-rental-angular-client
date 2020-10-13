import {Component, OnInit} from '@angular/core';
import {CarsService} from '../../../../services/cars.service';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {Car} from '../../../../models/car';

@Component({
  selector: 'cs-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
   car: Car;

  constructor(private carsService: CarsService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadCar();
  }

  loadCar() {
    this.route.data.subscribe((response) => {
      this.car = response['car'];
    });
    console.log(this.car);
  }
}
