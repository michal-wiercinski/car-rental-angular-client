import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {CarModel} from '../../../models/car-model';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {CarModelService} from '../../../services/car-model-service';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Car} from '../../../models/car';


@Component({
  selector: 'cs-typeahead-cars-model',
  templateUrl: './typeahead-cars-model.component.html',
  styleUrls: ['./typeahead-cars-model.component.scss'],
  providers: [CarModelService]
})
export class TypeaheadCarsModelComponent implements OnInit {
  @Output()
  carModelFormEmitter = new EventEmitter<FormGroup>();
  @Input()
  carModelForm: FormGroup;
  @Input()
  car: Car;
  carModel: any;
  searching = false;
  searchFailed = false;
  carExist = false;

  constructor(private carModelService: CarModelService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildCarModelForm();
  }

  buildCarModelForm() {
    this.carModelForm = this.formBuilder.group({
      id: [''],
      carModelName: [''],
      brandName: ['']
    });
  }

  formatter = (carModel: CarModel) => carModel.brandName + ' ' + carModel.carModelName;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(param =>
        this.carModelService.searchByName(param).pipe(
          tap(() => {
            this.searchFailed = false;
          }),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    );

  selectCarModel(carModel) {
    console.log(carModel.item.id);
    this.carModelForm.setValue({
      id: carModel.item.id,
      carModelName: carModel.item.carModelName,
      brandName: carModel.item.brandName
    });
    this.carModelFormEmitter.emit(this.carModelForm);
  }

  checkIfCarExist(): boolean {
    return this.car != null;
  }
}

