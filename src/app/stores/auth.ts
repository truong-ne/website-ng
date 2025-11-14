import { Injectable, signal, computed } from '@angular/core';
import { IUser } from '../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  // Private state signals
  private readonly _isAuthenticated = signal<boolean>(false);
  private readonly _user = signal<IUser | null>(null);

  // Public readonly getters
  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly user = this._user.asReadonly();

  // Computed getters
  readonly userName = computed(() => this._user()?.name ?? null);
  readonly userEmail = computed(() => this._user()?.email ?? null);

  constructor() {
    this.init();
  }

  /**
   * Initialize auth store - load from localStorage
   */
  private init(): void {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        if (authData.isAuthenticated && authData.user) {
          this._isAuthenticated.set(authData.isAuthenticated);
          this._user.set(authData.user);
        }
      } catch (error) {
        console.error('Error loading auth from localStorage:', error);
        this.clear();
      }
    }
  }

  /**
   * Sign in user
   */
  signIn(user: IUser): void {
    this._isAuthenticated.set(true);
    this._user.set(user);
    this.saveToLocalStorage();
  }

  /**
   * Sign up new user
   */
  signUp(user: IUser): void {
    this._isAuthenticated.set(true);
    this._user.set(user);
    this.saveToLocalStorage();
  }

  /**
   * Sign out user
   */
  signOut(): void {
    this.clear();
    localStorage.removeItem('auth');
  }

  /**
   * Clear auth state
   */
  private clear(): void {
    this._isAuthenticated.set(false);
    this._user.set(null);
  }

  /**
   * Save auth state to localStorage
   */
  private saveToLocalStorage(): void {
    const authData = {
      isAuthenticated: this._isAuthenticated(),
      user: this._user()
    };
    localStorage.setItem('auth', JSON.stringify(authData));
  }
}

