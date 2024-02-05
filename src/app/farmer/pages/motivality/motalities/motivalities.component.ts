import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { ActivatedRoute } from '@angular/router';
import { Motality } from '../../../../models/motality';

@Component({
  selector: 'app-motivalities',
  templateUrl: './motivalities.component.html',
  styleUrl: './motivalities.component.scss',
})
export class MotivalitiesComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute
  ) {}
  motivalities: Motality[] = [];
  hatchId!: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.hatchId = response['id'];
        this.getMotivalities();
      },
    });
  }

  getMotivalities(): void {
    this.service.Fetch<Motality[]>(`motalities/${this.hatchId}`).subscribe({
      next: (response) => {
        if (response.isSuccess) this.motivalities = response.result;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
}
