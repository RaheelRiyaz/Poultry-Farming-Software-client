import { Component } from '@angular/core';
import { SignupRequest, SignupResponse } from '../../../models/user';
import { BaseService } from '../../../services/base.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  constructor(private service: BaseService, private router: Router) {}
  signupRequest: SignupRequest = new SignupRequest();

  signup(): void {
    this.service
      .Post<SignupRequest, SignupResponse>(this.signupRequest, 'users')
      .subscribe({
        next: (response) => {
          console.log(response);
          
          if (response.isSuccess) {
            this.router.navigate(['/login']);
            environment.fireSwal(response.message);
          } else environment.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          environment.fireSwal(err.message, false);
        },
      });
  }
}
