import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  async doLogin() {
    this.error = '';
    const user = await this.auth.login(this.email.trim(), this.password);
    if (!user) {
      this.error = 'Invalid email or password.';
      return;
    }
    this.router.navigate(['/profile']);
  }
}
