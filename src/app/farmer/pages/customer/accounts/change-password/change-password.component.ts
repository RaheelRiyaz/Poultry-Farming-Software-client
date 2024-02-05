import { Component } from '@angular/core';
import { BaseService } from '../../../../../services/base.service';
import { ChangePasswordRequest } from '../../../../../models/user';
import { environment } from '../../../../../../environments/environment.development';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  constructor(private service: BaseService) {}
  changePasswordRequest: ChangePasswordRequest = new ChangePasswordRequest();

  changePassword(): void {
    this.service
      .Post<ChangePasswordRequest, string>(
        this.changePasswordRequest,
        'users/change-password'
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            environment.fireSwal(response.message);
          } else environment.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          environment.fireSwal(err.message, false);
        },
      });
  }
}
