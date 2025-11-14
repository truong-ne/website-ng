import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialog } from '../../auth/auth-dialog/auth-dialog';
import { AuthStore } from '../../../stores/auth';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule
  ],
  templateUrl: './header.html',
})
export class Header {
  private readonly dialog = inject(MatDialog);
  protected readonly authStore: AuthStore = inject(AuthStore);

  protected readonly wishlistCount = signal(0);
  protected readonly cartCount = signal(2);
  protected readonly isAuthenticated = this.authStore.isAuthenticated;

  protected openSignInDialog(): void {
    this.dialog.open(AuthDialog, {
      width: '500px',
      data: { initialTab: 0 }
    });
  }

  protected openSignUpDialog(): void {
    this.dialog.open(AuthDialog, {
      width: '500px',
      data: { initialTab: 1 }
    });
  }

  protected signOut(): void {
    this.authStore.signOut();
  }
}
