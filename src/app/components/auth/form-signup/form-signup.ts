import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <form [formGroup]="signUpForm">
      <mat-form-field class="w-full">
        <mat-label>Name</mat-label>
        <input matInput formControlName="name" type="text" required />
        @if (signUpForm.get('name')?.hasError('required') && signUpForm.get('name')?.touched) {
          <mat-error>Name is required</mat-error>
        }
      </mat-form-field>
      <mat-form-field class="w-full mt-2">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email" required />
        @if (signUpForm.get('email')?.hasError('required') && signUpForm.get('email')?.touched) {
          <mat-error>Email is required</mat-error>
        }
        @if (signUpForm.get('email')?.hasError('email') && signUpForm.get('email')?.touched) {
          <mat-error>Please enter a valid email</mat-error>
        }
      </mat-form-field>
      <mat-form-field class="w-full mt-2">
        <mat-label>Phone</mat-label>
        <input matInput formControlName="phone" type="tel" required />
        @if (signUpForm.get('phone')?.hasError('required') && signUpForm.get('phone')?.touched) {
          <mat-error>Phone is required</mat-error>
        }
        @if (signUpForm.get('phone')?.hasError('pattern') && signUpForm.get('phone')?.touched) {
          <mat-error>Phone must be 10-11 digits</mat-error>
        }
      </mat-form-field>
      <mat-form-field class="w-full mt-2">
        <mat-label>Password</mat-label>
        <input matInput formControlName="password" type="password" required />
        @if (signUpForm.get('password')?.hasError('required') && signUpForm.get('password')?.touched) {
          <mat-error>Password is required</mat-error>
        }
        @if (signUpForm.get('password')?.hasError('minlength') && signUpForm.get('password')?.touched) {
          <mat-error>Password must be at least 6 characters</mat-error>
        }
      </mat-form-field>
    </form>
  `,
})
export class FormSignup {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly submit = output<{ name: string; email: string; phone: string; password: string }>();

  readonly form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  protected get signUpForm(): FormGroup {
    return this.form;
  }

  submitForm(): void {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      this.submit.emit(formValue);
    }
  }
}
