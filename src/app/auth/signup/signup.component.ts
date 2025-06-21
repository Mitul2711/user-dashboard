import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule ,RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
 showPassword = false;
 showConfirmPassword = false;

 signupForm!: FormGroup;

 constructor(private fb: FormBuilder, private authService: AuthService) {
  this.signupForm = this.fb.group({
    userName: [''],
    password: [''],
    confirmPass: ['']
  })
 }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

   toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if(this.signupForm.valid) {
      const formData = this.signupForm.value;
      if(formData.password === formData.confirmPass) {
        let data = {
          userName: formData.userName,
          password: formData.password
        }
        this.authService.postUser(data).subscribe(() => {
          this.signupForm.reset();
        });
      } else {
        console.error('Passwords do not match');
      }
    }
  }
}
