import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './views/Landing/landing.component';
import { InsuranceFormComponent } from './views/InsuranceForm/insuranceForm.component'; 
import { VehicleFormComponent } from './views/VehicleForm/vehicleForm.component';

const routes: Routes = [
  { path: '', component: LandingComponent, data: { animation: 'slideInAnimation' }},
  { 
    path: 'insurance-form', 
    component: InsuranceFormComponent,  
    data: { animation: 'slideInAnimation' }
  },
  { path: 'vehicle-form', component: VehicleFormComponent, data: { animation: 'slideInAnimation' }},
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 