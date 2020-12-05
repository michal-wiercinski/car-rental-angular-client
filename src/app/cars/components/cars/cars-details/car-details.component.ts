import {Component, Input, OnInit} from '@angular/core';
import {CarsService} from '../../../../services/cars.service';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {Car} from '../../../../models/car';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'cs-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  @Input() car: Car;
  closeResult = '';

  constructor(private carsService: CarsService,
              private route: ActivatedRoute,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
   /* this.loadCar();*/
    console.log(this.car);
  }

/*  loadCar() {
    this.route.data.subscribe((response) => {
      this.car = response['car'];
    });
    console.log(this.car);
  }*/

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
