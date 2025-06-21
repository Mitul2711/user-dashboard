import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule ,RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 showPassword = false;

 loginForm!: FormGroup;

 constructor(private fb: FormBuilder) {
  this.loginForm = this.fb.group({
    userName: [''],
    password: [''],
    confirmPass: ['']
  })
 }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
