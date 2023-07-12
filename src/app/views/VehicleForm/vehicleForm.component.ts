import { Component, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/ErrorMatcher/errorMatcher.component'
import { Observable, map, startWith } from 'rxjs';
import { Car } from '../../types/dataTypes'
import axios from 'axios';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'vehicleForm',
  templateUrl: './vehicleForm.component.html',
  styleUrls: ['./vehicleForm.component.sass']
})

export class VehicleFormComponent {
  vehiclesApiUrl = 'https://storage.googleapis.com/connex-th/insurance_assignment/car_model.json'
  vehicleForm = new FormGroup({
    categoryFormControl: new FormControl('', [Validators.required]),
    makeFormControl: new FormControl('', [Validators.required]),
    modelFormControl: new FormControl('', [Validators.required]),
    yearFormControl: new FormControl('', [Validators.required]),
  });
  vehicles = [] as Array<Car>
  errorMatcher = new MyErrorStateMatcher();
  async getVehiclesFromUrl(){
    await axios.get(this.vehiclesApiUrl)
    .then(response => {
    // handle success, data is in response.data
    this.vehicles = response.data.data.car_Model_Lists.results  
  })
  .catch(error => {
      console.error(error);
      // handleApiFailError()
    });
  }
  constructor() { }
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;
  categoryFilteredOptions: Observable<string[]> | undefined;
  makeFilteredOptions: Observable<string[]> | undefined;
  modelFilteredOptions: Observable<string[]> | undefined;

  async ngOnInit() {
    await this.getVehiclesFromUrl();
    this.setAllFilteredOption()
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private getVehiclesCategory(vehicles: Car[]) {
    const concattedCategories = [...new Set(vehicles.map((item: Car) => item.Category))];
    return Array.from(new Set(concattedCategories.flatMap(str => str.split(',').map(s => s.trim()))));
  }

  private getMakeCategory(vehicles: Car[]) {
    return [...new Set(vehicles.map(item => item.Make))];
  }  

  private setAllFilteredOption() {
    this.setCategoryFilteredOptions();
    this.setMakeFilteredOptions();
  }

  private setCategoryFilteredOptions() {
    const options = this.getVehiclesCategory(this.vehicles);
    this.categoryFilteredOptions = this.vehicleForm.controls['categoryFormControl'].valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '', options)),
    );
  }
  
  private setMakeFilteredOptions() {
    const options = this.getMakeCategory(this.vehicles);
    this.makeFilteredOptions = this.vehicleForm.controls['makeFormControl'].valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '', options)),
    );
  }

  onMakeInput(event: any) {
    this.onOptionSelected(event.value)
  }

  onOptionSelected(option: string){
    if (this.makeFilteredOptions?.pipe(map(arr => arr.includes(option)))){
      const options = this.getModelsByMake(this.vehicles, option)
      this.modelFilteredOptions = this.vehicleForm.controls['modelFormControl'].valueChanges.pipe(
        startWith(''),
        map((value: any) => this._filter(value || '', options)),
      );      
    }
  }

  getModelsByMake(cars: Car[], make: string): string[] {
    return cars
      .filter(car => car.Make === make)
      .map(car => car.Model);
  }
}
