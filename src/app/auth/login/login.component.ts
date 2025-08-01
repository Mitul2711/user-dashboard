import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  showPassword = false;
  formSubmitted = false;
  loginForm!: FormGroup;
  userDetails: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private commonService: CommonService
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
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
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const matchedUser = this.userDetails.find(
        (user: any) => user.userName === formData.userName && user.password === formData.password
      );

      if (matchedUser) {
        this.authService.login(matchedUser.userName);
        this.router.navigate(['/']);
        this.commonService.showSuccess('Login successful');
        this.loginForm.reset();
      } else {
        this.commonService.showError('Wrong Username or Password!');
      }
    } else {
      console.error('Form is invalid');
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched || this.formSubmitted));
  }
}
