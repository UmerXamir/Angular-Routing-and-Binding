import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  showInvalidMessage: boolean = false;
  userName = '';
  password = '';
  errorMsg = '';
  constructor(private auth: AuthService, private router: Router) {}
login() {
    if (this.userName.trim().length === 0) {
      this.errorMsg = 'Username is required.';
    } else if (this.password.trim().length === 0) {
      this.errorMsg = 'Password is required.';
    } 
    const res = this.auth.login(this.userName, this.password);
    if (res === 200) {
      this.router.navigate(['home']);
    } else if (res === 403) {
      this.errorMsg = 'Invalid Credentials';
      this.showInvalidMessage = true;
      setTimeout(() => {
        this.showInvalidMessage = false;
        this.errorMsg = '';
      }, 2000);
      this.userName = '';
      this.password = '';
    
    }
  }
}
