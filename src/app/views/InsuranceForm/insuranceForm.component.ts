// Import required modules and components
import { Component, EventEmitter, Output, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/ErrorMatcher/errorMatcher.component'
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/utils/FormDataServices/formDataServices';
import { FormDataKey } from 'src/app/data/dataTypes';

// Define the component
@Component({
  selector: 'insuranceForm',
  templateUrl: './insuranceForm.component.html',
  styleUrls: ['./insuranceForm.component.sass']
})
export class InsuranceFormComponent {
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
  constructor(private router: Router, private formDataService: FormDataService) { }
  ngOnInit() { 
    const completedInsuranceForm = this.formDataService.getFormData(FormDataKey.INSURANCE_FORM);
    if (completedInsuranceForm && completedInsuranceForm.status === "VALID") {
      this.insuranceForm.setValue(completedInsuranceForm.value);
    }
  }

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
  // Define a method that will be called when the form is submitted
  handleInsuranceFormSubmit() {
    this.formDataService.saveFormData(FormDataKey.INSURANCE_FORM, this.insuranceForm);
    this.router.navigate(['/vehicle-form']);
  }
}