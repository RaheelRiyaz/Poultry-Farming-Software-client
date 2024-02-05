import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { ExpenditureResponse } from '../../../../models/hatch';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expenditures',
  templateUrl: './expenditures.component.html',
  styleUrl: './expenditures.component.scss',
})
export class ExpendituresComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute
  ) {}
  hatchId!: string;
  expenditures: ExpenditureResponse[] = [];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.hatchId = response['id'];
        this.getExpenditures();
      },
    });
  }

  getExpenditures(): void {
    this.service
      .Fetch<ExpenditureResponse[]>(`expenditures/${this.hatchId}`)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) this.expenditures = response.result;
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }
}
