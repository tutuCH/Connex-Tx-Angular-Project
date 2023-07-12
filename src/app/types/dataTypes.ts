export interface Car {
  Category: string;
  Make: string;
  Model: string;
  Year: number;
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