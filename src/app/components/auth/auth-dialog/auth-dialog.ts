import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './auth-dialog.html',
})
export class AuthDialog implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<AuthDialog>);
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(MAT_DIALOG_DATA, { optional: true });

  protected selectedTabIndex = 0;

  ngOnInit() {
    if (this.data?.initialTab !== undefined) {
      this.selectedTabIndex = this.data.initialTab;
    }
  }

  protected signInForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  protected signUpForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  protected onSignIn() {
    if (this.signInForm.valid) {
      console.log('Sign In:', this.signInForm.value);
      // TODO: Add actual sign in logic here
      this.dialogRef.close();
    }
  }

  protected onSignUp() {
    if (this.signUpForm.valid) {
      console.log('Sign Up:', this.signUpForm.value);
      // TODO: Add actual sign up logic here
      this.dialogRef.close();
    }
  }

  protected close() {
    this.dialogRef.close();
  }
}

