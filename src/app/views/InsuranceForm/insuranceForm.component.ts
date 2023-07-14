// Import required modules and components
import { Component, EventEmitter, Output, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/ErrorMatcher/errorMatcher.component'
import { InsuranceForm } from 'src/app/data/dataTypes';

// Define the component
@Component({
  selector: 'insuranceForm',
  templateUrl: './insuranceForm.component.html',
  styleUrls: ['./insuranceForm.component.sass']
})
export class InsuranceFormComponent {
  // Define an output event that will emit the form data when it changes
  @Output() insuranceFormChange = new EventEmitter<InsuranceForm>();
  
  // Define the form group with its form controls and validators
  insuranceForm = new FormGroup({
    ageFormControl: new FormControl(null, [Validators.required, Validators.min(18)]),
    drivingExperienceFormControl: new FormControl(null, [Validators.required, Validators.min(0)]),
    driverRecordFormControl: new FormControl(null, [Validators.required, Validators.min(0)]),
    claimsFormControl: new FormControl(null, [Validators.required, Validators.min(0)]),
    carValueFormControl: new FormControl(null, [Validators.required, Validators.min(0)]),
    annualMileageFormControl: new FormControl(null, [Validators.required, Validators.min(0)]),
    insuranceHistoryFormControl: new FormControl(null, [Validators.required, Validators.min(0)]),
  });

  // Define an error matcher to use with the form controls
  errorMatcher = new MyErrorStateMatcher();

  // Define an array of objects that contains information about each form control (currently commented out)
  // insuranceFormQuestionList = [
  //   {
  //     formControlName: "ageFormControl",
  //     label: "What is your age?",
  //     placeholder: "age",
  //     validation: ["min-0", "required"]
  //   },
  //   {
  //     formControlName: "drivingExperienceFormControl",
  //     label: "What is your driving experience?",
  //     placeholder: "driving experience",
  //     validation: ["min-0", "required"]
  //   }    
  // ]

  // Define the component's constructor and lifecycle hooks (currently empty)
  constructor() { }
  ngOnInit() { }

  
  // Define a method that will be called when the form is submitted
  handleInsuranceFormSubmit() {
    // Extract the form data and create an object with it
    const insuranceInput: InsuranceForm = {
      age: this.insuranceForm.controls.ageFormControl.value,
      drivingExperience: this.insuranceForm.controls.drivingExperienceFormControl.value,
      driverRecord: this.insuranceForm.controls.driverRecordFormControl.value,
      claims: this.insuranceForm.controls.claimsFormControl.value,
      carValue: this.insuranceForm.controls.carValueFormControl.value,
      annualMileage: this.insuranceForm.controls.annualMileageFormControl.value,
      insuranceHistory: this.insuranceForm.controls.insuranceHistoryFormControl.value,
    }

    // Emit the form data using the output event
    this.insuranceFormChange.emit(insuranceInput);
  }
}