import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { ActivatedRoute } from '@angular/router';
import { HatchDetails } from '../../../../models/hatch';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute
  ) {}
  hatchId!: string;
  hatchinfo: HatchDetails = new HatchDetails();

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.hatchId = response['id'];
        this.hatchDetails();
      },
    });
  }

  hatchDetails(): void {
    this.service.Find<HatchDetails>(`hatches/${this.hatchId}`).subscribe({
      next: (response) => {
        if (response.isSuccess) this.hatchinfo = response.result;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
}
