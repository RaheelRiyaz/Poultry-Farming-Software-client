import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MotalityRequest } from '../../../../models/motality';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-add-motivality',
  templateUrl: './add-motivality.component.html',
  styleUrl: './add-motivality.component.scss',
})
export class AddMotivalityComponent {
  constructor(
    private service: BaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  hatchId!: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (res) => (this.hatchId = res['id']),
    });
  }
  motalityRequest: MotalityRequest = new MotalityRequest();

  addMotality(): void {
    this.motalityRequest.hatchId = this.hatchId;
    console.log(this.motalityRequest);
    this.service
      .Post<MotalityRequest, MotalityRequest>(
        this.motalityRequest,
        'motalities'
      )
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
