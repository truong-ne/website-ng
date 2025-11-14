import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialog } from '../../auth/auth-dialog/auth-dialog';

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

  protected readonly wishlistCount = signal(0);
  protected readonly cartCount = signal(2);
  protected readonly isAuthenticated = signal(false);

  protected openSignInDialog() {
    const dialogRef = this.dialog.open(AuthDialog, {
      width: '500px',
      data: { initialTab: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isAuthenticated.set(true);
      }
    });
  }

  protected openSignUpDialog() {
    const dialogRef = this.dialog.open(AuthDialog, {
      width: '500px',
      data: { initialTab: 1 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isAuthenticated.set(true);
      }
    });
  }

  protected signOut() {
    this.isAuthenticated.set(false);
    // TODO: Add actual sign out logic here
  }
}
