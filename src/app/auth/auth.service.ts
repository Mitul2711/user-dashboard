import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  postUser(data: any) {
    return this.httpClient.post('http://localhost:3000/auth', data);
  }

  getUsers() {
    return this.httpClient.get('http://localhost:3000/auth');
  }

}
