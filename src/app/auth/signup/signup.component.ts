import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class SignupComponent {
  showPassword = false;
  showConfirmPassword = false;
  formSubmitted = false;
  signupForm!: FormGroup;

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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      if (formData.password === formData.confirmPass) {
        let data = {
          userName: formData.userName,
          password: formData.password
        }
        this.authService.postUser(data).subscribe({
          next: (res) => {
            this.signupForm.reset();
            this.commonService.showSuccess('User created successfully');
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Error creating user:', err);
          }
        });

      } else {
        this.commonService.showError('Passwords do not match!');
      }
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched || this.formSubmitted));
  }

}
