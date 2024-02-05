import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { Router } from '@angular/router';
import { HatchRequest, HatchResponse } from '../../../../models/hatch';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  constructor(private service: BaseService, private router: Router) {}
  hatchRequest: HatchRequest = new HatchRequest();

  ngOnInit(): void {}

  addNewHatch(): void {
    this.service
      .Post<HatchRequest, HatchResponse>(this.hatchRequest, 'hatches')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            environment.fireSwal(response.message);
            this.router.navigate(['/farmer/hatches']);
          } else environment.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          environment.fireSwal(err.message, false);
        },
      });
  }
}
