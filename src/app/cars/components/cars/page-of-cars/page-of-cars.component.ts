import {Component, OnInit} from '@angular/core';
import {Car} from '../../../../models/car';
import {CarsService} from '../../../../services/cars.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CarDetailsComponent} from "../cars-details/car-details.component";


@Component({
  selector: 'cs-page-of-cars',
  templateUrl: './page-of-cars.component.html',
  styleUrls: ['./page-of-cars.component.scss']
})
export class PageOfCarsComponent implements OnInit {
  cars: Car [];
  thePageNumber = 1;
  thePageSize = 5;
  totalElements: number;
  statusCar: string;
  bodyTypeName: string;
  gearboxType: string;
  fuelType: string;
  isEmpty = false;
  isFiltered = false;
  paramForFiltering: string;

  constructor(private carsService: CarsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.loadAllCarsWithPage();
    });
  }

  loadAllCarsWithPage() {
    if (this.isFiltered) {
      this.carsService.findCars(this.paramForFiltering).subscribe(this.processResult());
    } else {
      this.carsService.getAllCars(this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());
    }
  }

  setFilterParam(urlParam) {
    this.paramForFiltering = urlParam;
    this.isFiltered = true;
    this.loadAllCarsWithPage();
  }

  goToCarDetail(car: Car) {
    return this.router.navigate(['/cars', car.id]);
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.loadAllCarsWithPage();
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

  openCarDetailsModal(car: Car) {
    const modal = this.modalService.open(CarDetailsComponent, {size: 'md'});
    modal.componentInstance.car = car;
  }
}
