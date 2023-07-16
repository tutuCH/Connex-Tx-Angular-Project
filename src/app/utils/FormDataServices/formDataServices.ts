import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formData: any = {};

  constructor() { }

  // Method to save form data
  saveFormData(formId: string, data: any): void {
    if (!this.formData[formId]) {
      this.formData[formId] = {};
    }
    this.formData[formId] = { ...this.formData[formId], ...data };
  }

  // Method to retrieve form data for a specific form
  getFormData(formId: string): any {
    return this.formData[formId];
  }

  // Method to retrieve form data for all forms
  getAllFormData(): any[] {
    const allFormData: any[] = [];
    for (let formId in this.formData) {
      allFormData.push(this.formData[formId]);
    }
    return allFormData;
  }

  // Method to clear form data
  clearFormData(formId: string): void {
    this.formData[formId] = {};
  }

  // Method to clear all data
  clearAllFormData(): void {
    for (let formId in this.formData) {
      this.formData[formId] = {};
    }
  }

}