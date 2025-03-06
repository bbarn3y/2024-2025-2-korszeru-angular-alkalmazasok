import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn: boolean;
  sessionStorageKey = 'session';

  constructor() {
    this.isLoggedIn = !!localStorage.getItem(this.sessionStorageKey);
  }

  removeSession(): void {
    localStorage.removeItem(this.sessionStorageKey);
    this.isLoggedIn = false;
  }

  saveSession(loginResponse: { token: string, username: string }) {
    localStorage.setItem(this.sessionStorageKey, JSON.stringify(loginResponse));
    this.isLoggedIn = true;
  }

}
