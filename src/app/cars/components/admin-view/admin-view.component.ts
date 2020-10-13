import {Component, OnInit} from '@angular/core';
import {CarsService} from '../../../services/cars.service';
import {Router} from '@angular/router';
import {Car} from '../../../models/car';
import {NewCarFormComponent} from '../cars/forms-components/new-car-form/new-car-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditCarFormComponent} from '../cars/forms-components/edit-car-form/edit-car-form.component';

@Component({
  selector: 'cs-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  cars: Car[];
  thePageNumber = 1;
  thePageSize = 5;
  totalElements: number;
  isEmpty = false;
  isFiltered = false;
  paramForFiltering: string;

  constructor(private carsService: CarsService,
              private router: Router,
              private modalService: NgbModal) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.loadAllCarsWithPage();
  }

  loadAllCarsWithPage(): void {
    if (this.isFiltered) {
      this.carsService.findCars(this.paramForFiltering).subscribe(this.processResult());
    } else {
      this.carsService.getAllCars(this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());
    }
  }

  goToCarDetail(car: Car) {
    return this.router.navigate(['/cars', car.id]);
  }

  goToUpdateCar(car: Car, event) {
    event.stopPropagation();
    return this.router.navigate(['/edit-car', car.id]);
  }

  removeCar(car: Car, event) {
    event.stopPropagation();
    this.carsService.deleteCar(car.id).subscribe(() => {
      this.loadAllCarsWithPage();
    });
  }

  changeAvailability(carStatus: string, car: Car, event) {
    event.stopPropagation();
    this.carsService.changeAvailability(car.id, carStatus, car).subscribe((newData) => {
      console.log(this.loadAllCarsWithPage());
    });
  }

  setFilterParam(urlParam) {
    this.paramForFiltering = urlParam;
    this.isFiltered = true;
    this.loadAllCarsWithPage();
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.loadAllCarsWithPage();
  }

  openNewCarFormModal() {
    this.modalService.open(NewCarFormComponent, {size: 'lg'});
  }

  processResult() {
    return data => {
      if (data._embedded.cars === '') {
        this.isEmpty = true;
      }
      this.cars = data._embedded.cars;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }
}
