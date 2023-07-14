export interface Vehicle {
  Category?: string | null;
  Make?: string | null;
  Model?: string | null;
  Year?: number | null;
}

export interface InsuranceForm {
  age?: number | null;
  drivingExperience?: number | null;
  driverRecord?: number | null;
  claims?: number | null;
  carValue?: number | null;
  annualMileage?: number | null;
  insuranceHistory?: number | null;
}