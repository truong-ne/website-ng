import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-signin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <form [formGroup]="signInForm">
      <mat-form-field class="w-full">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email" required />
        @if (signInForm.get('email')?.hasError('required') && signInForm.get('email')?.touched) {
          <mat-error>Email is required</mat-error>
        }
        @if (signInForm.get('email')?.hasError('email') && signInForm.get('email')?.touched) {
          <mat-error>Please enter a valid email</mat-error>
        }
      </mat-form-field>
      <mat-form-field class="w-full mt-2">
        <mat-label>Password</mat-label>
        <input matInput formControlName="password" type="password" required />
        @if (signInForm.get('password')?.hasError('required') && signInForm.get('password')?.touched) {
          <mat-error>Password is required</mat-error>
        }
        @if (signInForm.get('password')?.hasError('minlength') && signInForm.get('password')?.touched) {
          <mat-error>Password must be at least 6 characters</mat-error>
        }
      </mat-form-field>
    </form>
  `,
})
export class FormSignin {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly submit = output<{ email: string; password: string }>();

  readonly form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  protected get signInForm(): FormGroup {
    return this.form;
  }

  submitForm(): void {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      this.submit.emit(formValue);
    }
  }
}
