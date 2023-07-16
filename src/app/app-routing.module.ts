import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './views/Landing/landing.component';
import { InsuranceFormComponent } from './views/InsuranceForm/insuranceForm.component'; 
import { VehicleFormComponent } from './views/VehicleForm/vehicleForm.component';
import { QuotationComponent } from './views/Quotation/quotation.component';

const routes: Routes = [
  { path: '', component: LandingComponent,},
  { path: 'insurance-form', component: InsuranceFormComponent,},
  { path: 'vehicle-form', component: VehicleFormComponent,},
  { path: 'quotation', component: QuotationComponent,},
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 