import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.userService.getUserIdByEmail(email).subscribe(data => {
        if (data && data.password === password) {
          localStorage.setItem('user', JSON.stringify(data));
          alert('Welcome!'); // You might want to replace this with a toast or snackbar
          this.router.navigate(['/lesson']);
        } else {
          alert('Incorrect email or password.');
        }
      });
    } else {
      alert('Please fill in all the required fields correctly.');
    }
  }
  navigateToSignUp()
  {
    this.router.navigate(['/signup']);
  }
}
