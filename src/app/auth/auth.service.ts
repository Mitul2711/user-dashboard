import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = signal<boolean>(this.hasValidSession());
  readonly isLoggedIn = computed(() => this._isLoggedIn());

  constructor(private httpClient: HttpClient) {
    this.startSessionWatcher();
  }

  private hasValidSession(): boolean {
    const user = localStorage.getItem('user');
    const expiry = Number(localStorage.getItem('expiry'));
    return !!user && expiry > new Date().getTime();
  }

  private startSessionWatcher() {
    setInterval(() => {
      const isValid = this.hasValidSession();
      this._isLoggedIn.set(isValid);
      if (!isValid) this.logout();
    }, 60 * 1000);
  }

  login(userName: string) {
    const expiryTime = new Date().getTime() + 15 * 60 * 1000;
    localStorage.setItem('user', userName);
    localStorage.setItem('expiry', expiryTime.toString());
    this._isLoggedIn.set(true);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('expiry');
    this._isLoggedIn.set(false);
  }

  postUser(data: any) {
    return this.httpClient.post('http://localhost:3000/auth', data);
  }

  getUsers() {
    return this.httpClient.get('http://localhost:3000/auth');
  }
}
