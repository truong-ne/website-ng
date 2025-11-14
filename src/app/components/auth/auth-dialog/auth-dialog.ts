import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HotToastService } from '@ngxpert/hot-toast';
import { AuthStore } from '../../../stores/auth';
import { IUser } from '../../../shared/interfaces/user.interface';
import { FormSignin } from '../form-signin/form-signin';
import { FormSignup } from '../form-signup/form-signup';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTabsModule, MatButtonModule, FormSignin, FormSignup],
  template: `
    <mat-dialog-content>
      <mat-tab-group [(selectedIndex)]="selectedTabIndex">
        <!-- Sign In Tab -->
        <mat-tab label="Sign In">
          <app-form-signin (submit)="onSignInSubmit($event)" #signInForm />
        </mat-tab>
        <!-- Sign Up Tab -->
        <mat-tab label="Sign Up">
          <app-form-signup (submit)="onSignUpSubmit($event)" #signUpForm />
        </mat-tab>
      </mat-tab-group>
    </mat-dialog-content>
    <mat-dialog-actions>
      @if (selectedTabIndex === 0) {
        <button mat-raised-button color="primary" (click)="onSignIn()" [disabled]="signInForm?.form?.invalid">
          Sign In
        </button>
      } @else {
        <button mat-raised-button color="primary" (click)="onSignUp()" [disabled]="signUpForm?.form?.invalid">
          Sign Up
        </button>
      }
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `,
})
export class AuthDialog implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<AuthDialog>);
  private readonly data = inject(MAT_DIALOG_DATA, { optional: true });
  private readonly authStore = inject(AuthStore);
  private readonly toast = inject(HotToastService);

  @ViewChild('signInForm') signInForm?: FormSignin;
  @ViewChild('signUpForm') signUpForm?: FormSignup;

  protected selectedTabIndex = 0;

  ngOnInit() {
    if (this.data?.initialTab !== undefined) {
      this.selectedTabIndex = this.data.initialTab;
    }
  }

  protected onSignIn(): void {
    this.signInForm?.submitForm();
  }

  protected onSignUp(): void {
    this.signUpForm?.submitForm();
  }

  protected onSignInSubmit(data: { email: string; password: string }): void {
    // TODO: Call API to sign in
    // For now, simulate success
    const user: IUser = {
      id: Date.now().toString(),
      name: data.email.split('@')[0],
      email: data.email,
    };
    this.authStore.signIn(user);
    this.toast.success('Sign in successfully!', {
      duration: 3000,
      position: 'top-right',
    });
    this.dialogRef.close(true);
  }

  protected onSignUpSubmit(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): void {
    // TODO: Call API to sign up
    // For now, simulate success
    const user: IUser = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
    };
    this.authStore.signUp(user);
    this.toast.success('Sign up successfully!', {
      duration: 3000,
      position: 'top-right',
    });
    this.dialogRef.close(true);
  }

  protected close() {
    this.dialogRef.close();
  }
}
