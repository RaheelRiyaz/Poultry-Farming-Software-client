import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { LoginRequest, LoginResponse } from '../../../models/user';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private service: BaseService, private router: Router) {}

  loginRequst: LoginRequest = new LoginRequest();

  login(): void {
    this.service
      .Post<LoginRequest, LoginResponse>(this.loginRequst, 'users/login')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            sessionStorage.setItem(
              'KashmirPoultryCredentials',
              JSON.stringify(response.result)
            );
            this.router.navigate(['/farmer']);
          } else environment.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          environment.fireSwal(err.message, false);
        },
      });
  }
}
