import { Component, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/ErrorMatcher/errorMatcher.component'
@Component({
  selector: 'insuranceForm',
  templateUrl: './insuranceForm.component.html',
  styleUrls: ['./insuranceForm.component.sass']
})

export class InsuranceFormComponent {
  title = 'connexTelecommunica';
  insuranceForm = new FormGroup({
    ageFormControl: new FormControl(null, [Validators.required, Validators.min(18)]),
    drivingExperienceFormControl: new FormControl(null, [Validators.required, Validators.min(0)]),
    driverRecordFormControl: new FormControl(null, [Validators.required, Validators.min(0)]),
    claimsFormControl: new FormControl(null, [Validators.required, Validators.min(0)]),
    carValueFormControl: new FormControl(null, [Validators.required, Validators.min(0)]),
    annualMileageFormControl: new FormControl(null, [Validators.required, Validators.min(0)]),
    insuranceHistoryFormControl: new FormControl(null, [Validators.required, Validators.min(0)]),
  });

  errorMatcher = new MyErrorStateMatcher();

  insuranceFormQuestionList = [
    {
      formControlName: "ageFormControl",
      label: "What is your age?",
      placeholder: "age",
      validation: ["min-0", "required"]
    },
    {
      formControlName: "drivingExperienceFormControl",
      label: "What is your driving experience?",
      placeholder: "driving experience",
      validation: ["min-0", "required"]
    }    
  ]
  constructor() { }
  ngOnInit() { }
}
