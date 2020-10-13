import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {LocationService} from '../../../../services/location-service';
import {CarLocation} from '../../../../models/car-location';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Car} from '../../../../models/car';

@Component({
  selector: 'cs-typeahead-location',
  templateUrl: './typeahead-location.component.html',
  styleUrls: ['./typeahead-location.component.scss'],
  providers: [LocationService]
})
export class TypeaheadLocationComponent implements OnInit {
  @Input()
  locationForm: FormGroup;
  @Input()
  car: Car;
  @Output()
  locationFormEmitter = new EventEmitter<FormGroup>();
  searching = false;
  searchFailed = false;
  carExist = false;

  constructor(private locationService: LocationService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildLocationForm();
  }

  buildLocationForm() {
    this.locationForm = this.formBuilder.group({
      id: [''],
      name: [''],
      addressId: [''],
      city: [''],
      street: [''],
      houseNumber: [''],
      zipCode: [''],
    });
  }

  formatter = (location: CarLocation) => location.name;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(param =>
        this.locationService.searchByParam(param).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    );

  selectLocation(location) {
    this.locationForm.setValue({
      id: location.item.id,
      name: location.item.name,
      addressId: location.item.addressId,
      city: location.item.city,
      street: location.item.street,
      houseNumber: location.item.houseNumber,
      zipCode: location.item.zipCode
    });
    this.locationFormEmitter.emit(this.locationForm);
  }

  checkIfCarExist(): boolean {
    return this.car != null;
  }
}
