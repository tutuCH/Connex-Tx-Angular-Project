import { Component, EventEmitter, Output, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/ErrorMatcher/errorMatcher.component'
import { Observable, map, startWith } from 'rxjs';
import { FormDataKey, InsuranceForm, PremiumRequestBody, Vehicle } from '../../data/dataTypes'
import { FormDataService } from 'src/app/utils/FormDataServices/formDataServices';
import { ApiService } from 'src/app/utils/ApiServices/apiServices';
import { API_URL } from 'src/app/data/apiLists';
import axios from 'axios';
import { Router } from '@angular/router';
// import { environment } from 'environment';

@Component({
  selector: 'vehicleForm',
  templateUrl: './vehicleForm.component.html',
  styleUrls: ['./vehicleForm.component.sass']
})

export class VehicleFormComponent {
  @Output() vehicleFormChange = new EventEmitter<Vehicle>();

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
  constructor(private formDataService: FormDataService, private router: Router) { }

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;
  categoryFilteredOptions: Observable<string[]> | undefined;
  makeFilteredOptions: Observable<string[]> | undefined;
  modelFilteredOptions: Observable<string[]> | undefined;
  yearFilteredOptions: Observable<string[]> | undefined;

  async ngOnInit() {
    await this.getVehiclesFromUrl();
    const completedVehicleForm = this.formDataService.getFormData(FormDataKey.VEHICLE_FORM);
    if (completedVehicleForm) {
      this.vehicleForm.setValue(completedVehicleForm.value);
    }    
    this.setAllFilteredOption();
  }

  vehicleForm = new FormGroup({
    categoryFormControl: new FormControl('', [Validators.required]),
    makeFormControl: new FormControl('', [Validators.required]),
    modelFormControl: new FormControl('', [Validators.required]),
    yearFormControl: new FormControl('', [Validators.required]),
  });

  private _filter(value: string, options: Array<string | number>): string[] {
    const filterValue = value.toLowerCase();
    return options.filter((option: string | number) => {
      if (typeof option === 'number') {
        return option.toString().toLowerCase().includes(filterValue);
      }
      return option.toLowerCase().includes(filterValue);
    }).map(option => option.toString());
  }

  private getVehiclesCategory(vehicles: Vehicle[]) {
    const concattedCategories = [...new Set(vehicles.map((item: Vehicle) => item.Category))];
    return Array.from(new Set(concattedCategories.flatMap(str => str && str.split(',').map(s => s.trim()))));
  }

  private getMakeCategory(vehicles: Vehicle[]) {
    return [...new Set(vehicles.map(item => item.Make))];
  }  

  private getModelCategory(vehicles: Vehicle[]) {
    return [...new Set(vehicles.map(item => item.Model))];
  }  

  private setAllFilteredOption() {
    this.setCategoryFilteredOptions();
    this.setMakeFilteredOptions();
    this.setModelFilteredOptions();
  }

  private setCategoryFilteredOptions() {
    const options = this.getVehiclesCategory(this.vehicles);
    this.categoryFilteredOptions = this.vehicleForm.controls['categoryFormControl'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', options as string[])),
    );
  }
  
  private setMakeFilteredOptions() {
    const options = this.getMakeCategory(this.vehicles);
    this.makeFilteredOptions = this.vehicleForm.controls['makeFormControl'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', options as string[])),
    );
  }

  private setModelFilteredOptions() {
    const options = this.getModelCategory(this.vehicles);
    this.modelFilteredOptions = this.vehicleForm.controls['modelFormControl'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', options as string[])),
    );
  }  

  onMakeInput(event: any) {
    this.onMakeSelected(event.value)
  }

  onMakeSelected(option: string){
    if (this.makeFilteredOptions?.pipe(map(arr => arr.includes(option)))){
      const options = this.getModelsByMake(this.vehicles, option)
      this.modelFilteredOptions = this.vehicleForm.controls['modelFormControl'].valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || '', options)),
      );      
    }
  }

  onModelInput(event: any) {
    this.onModelSelected(event.value);
  }

  onModelSelected(option: string){
    if (this.modelFilteredOptions?.pipe(map(arr => arr.includes(option)))){
      const options = this.getYearByMakeAndModel(this.vehicles ,option)
      this.yearFilteredOptions = this.vehicleForm.controls['yearFormControl'].valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || '', options)),
      );      
    }
  }  

  getModelsByMake(cars: Vehicle[], make: string): string[] {
    return cars
      .filter(car => car.Make === make)
      .map(car => car.Model) as string[];
  }

  getYearByMakeAndModel(cars: Vehicle[], model: string): number[] {
    return cars
      .filter(car => car.Make === this.vehicleForm.controls['makeFormControl'].value && car.Model === model)
      .map(car => car.Year)
      .sort() as number[];
  }  

  handleInsuranceFormSubmit = () => {
    this.formDataService.saveFormData('vehicleForm', this.vehicleForm);
    const insuranceForm = this.formDataService.getFormData(FormDataKey.INSURANCE_FORM)
    this.apiService.postApiCall(
      API_URL.GET_PREMIUM_AND_QUOTE_REF, 
      this.getRequestBodyByFormData(insuranceForm)
    ) .subscribe(response => {
      try{
        if (response?.status !== 'fail') {
          this.router.navigate(['/quotation'], { queryParams: { monthlyQuote: response.premium, quoteReference: response.quote_reference } });
        } else {
          window.alert('Website is under maintainance, please try again later');
        }
      } catch (error) {
        console.warn(error)
      }
    });
  }  

  getCarAgeByManufacturingYear = (manufacturingYear: string | null) => {
    if (manufacturingYear) {
      const currentYear = new Date().getFullYear();
      const yearsSince = currentYear - Number(manufacturingYear);
      return yearsSince;
    } else {
      return 0
    }
  }

  getRequestBodyByFormData = (insuranceForm: any) => {
    const requestBody: PremiumRequestBody = {
      age: insuranceForm.controls.ageFormControl.value,
      drivingExperience: insuranceForm.controls.drivingExperienceFormControl.value,
      driverRecord: insuranceForm.controls.driverRecordFormControl.value,
      claims: insuranceForm.controls.claimsFormControl.value,
      carValue: insuranceForm.controls.carValueFormControl.value,
      annualMileage: insuranceForm.controls.annualMileageFormControl.value,
      insuranceHistory: insuranceForm.controls.insuranceHistoryFormControl.value,
      carAge: this.getCarAgeByManufacturingYear(this.vehicleForm.controls.yearFormControl.value),
    }
    return requestBody;
  }

  handleBack = () => {
    this.formDataService.saveFormData(FormDataKey.VEHICLE_FORM, this.vehicleForm);
    this.router.navigate(['/insurance-form']);
  }
}
