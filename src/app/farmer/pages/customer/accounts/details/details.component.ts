import { Component } from '@angular/core';
import { BaseService } from '../../../../../services/base.service';
import { UserInfo } from '../../../../../models/user';
import { environment } from '../../../../../../environments/environment.development';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class FarmerDetailsComponent {
  constructor(private service: BaseService) {}
  details: UserInfo = new UserInfo();

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.service.Find<UserInfo>('users/details').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.details = response.result;
        }
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
  updateDetails(): void {
    console.log(this.details);
    this.service
      .Update<UserInfo, string>(this.details, 'users/info')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            environment.fireSwal(response.message);
            this.getUserDetails();
          } else environment.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          environment.fireSwal(err.message, false);
        },
      });
  }
}
