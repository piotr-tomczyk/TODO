import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css'],
})
export class LoginViewComponent {
  constructor(public auth: AuthService, private router: Router) {}
  NavigateTODO() {
    return this.router.navigate(['/TODO']);
  }
}
