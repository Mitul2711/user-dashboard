import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  showPassword = false;
  showConfirmPassword = false;
  formSubmitted = false;
  signupForm!: FormGroup;
  userDetails: any[] = [];

  constructor(private fb: FormBuilder, private authService: AuthService, private commonService: CommonService, private router: Router) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.minLength(5), Validators.required]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]],
      confirmPass: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getUserDetails() {
    this.authService.getUsers().subscribe((res: any) => {
      this.userDetails = res;
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    const formData = this.signupForm.value;
    if (this.signupForm.valid) {
      if (this.userDetails.length == 0) {
        this.postUser();
      } else {
        const userExists = this.userDetails.some(
          (user: any) => user.userName === formData.userName
        );

        if (userExists) {
          this.commonService.showError('Username already taken. Please choose another.');
          return;
        } else {
          this.postUser();
        }

      }
    }
  }

  postUser() {
    const formData = this.signupForm.value;
    if (formData.password === formData.confirmPass) {
      let data = {
        userName: formData.userName,
        password: formData.password
      }
      this.authService.postUser(data).subscribe({
        next: (res) => {
          this.commonService.showSuccess('User created successfully');
          this.router.navigate(['/login']);
          this.signupForm.reset();
        },
        error: (err) => {
          console.error('Error creating user:', err);
        }
      });

    } else {
      this.commonService.showError('Passwords do not match!');
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched || this.formSubmitted));
  }

}
