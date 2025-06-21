import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule ,RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
 showPassword = false;

 loginForm!: FormGroup;
 userDetails: any[] = [];

 constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  this.loginForm = this.fb.group({
    userName: [''],
    password: [''],
    confirmPass: ['']
  })
 }

 ngOnInit(): void {
   this.getUserDetails();
 }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getUserDetails() {
    this.authService.getUsers().subscribe((res: any) => {
      this.userDetails = res;
    })
  }

  onSubmit() {
    if(this.loginForm.valid) {
      const formData = this.loginForm.value;
      const matchedUser = this.userDetails.find((user: any) => 
      user.email === formData.email && user.password === formData.password
    );

    if (matchedUser) {
      console.log('Login successful:', matchedUser);
      // You can store user info in localStorage or navigate
      // localStorage.setItem('user', JSON.stringify(matchedUser));
      this.router.navigate(['/']);
      this.loginForm.reset();
    } else {
      console.error('Invalid email or password');
    }

    } else {
      console.error('Form is invalid');
    }
  }
}
