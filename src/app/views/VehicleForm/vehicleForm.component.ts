import { Component, EventEmitter, Output, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/ErrorMatcher/errorMatcher.component'
import { Observable, map, startWith } from 'rxjs';
import { Vehicle } from '../../data/dataTypes'

import { ApiService } from 'src/app/utils/ApiServices/apiServices';
import { API_URL } from 'src/app/data/apiLists';
import axios from 'axios';

@Component({
  selector: 'vehicleForm',
  templateUrl: './vehicleForm.component.html',
  styleUrls: ['./vehicleForm.component.sass']
})

export class VehicleFormComponent {
  @Output() vehicleFormChange = new EventEmitter<Vehicle>();
  // vehiclesApiUrl = 'https://storage.googleapis.com/connex-th/insurance_assignment/car_model.json'
  vehicleForm = new FormGroup({
    categoryFormControl: new FormControl('', [Validators.required]),
    makeFormControl: new FormControl('', [Validators.required]),
    modelFormControl: new FormControl('', [Validators.required]),
    yearFormControl: new FormControl('', [Validators.required]),
  });
  vehicles = [] as Array<Vehicle>

  errorMatcher = new MyErrorStateMatcher();
  apiService = new ApiService();
  
  async getVehiclesFromUrl(){
    await axios.get(API_URL.GET_CAR_MODEL)
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

  private getVehiclesCategory(vehicles: Vehicle[]) {
    const concattedCategories = [...new Set(vehicles.map((item: Vehicle) => item.Category))];
    return Array.from(new Set(concattedCategories.flatMap(str => str && str.split(',').map(s => s.trim()))));
  }

  private getMakeCategory(vehicles: Vehicle[]) {
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
      map((value: any) => this._filter(value || '', options as string[])),
    );
  }
  
  private setMakeFilteredOptions() {
    const options = this.getMakeCategory(this.vehicles);
    this.makeFilteredOptions = this.vehicleForm.controls['makeFormControl'].valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '', options as string[])),
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

  getModelsByMake(cars: Vehicle[], make: string): string[] {
    return cars
      .filter(car => car.Make === make)
      .map(car => car.Model) as string[];
  }

  handleInsuranceFormSubmit = () => {
    const vehicleInput: Vehicle = {
      Category: this.vehicleForm.controls.categoryFormControl.value,
      Make: this.vehicleForm.controls.makeFormControl.value,
      Model: this.vehicleForm.controls.modelFormControl.value,
      Year: parseInt(this.vehicleForm.controls.yearFormControl.value as string),
    }
    this.vehicleFormChange.emit(vehicleInput);
  }
}
