import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ExpenditureRequest,
  ExpenditureResponse,
} from '../../../../models/hatch';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-add-expenditure',
  templateUrl: './add-expenditure.component.html',
  styleUrl: './add-expenditure.component.scss',
})
export class AddExpenditureComponent {
  constructor(
    private service: BaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  hatchId!: string;
  addExpenditure: ExpenditureRequest = new ExpenditureRequest();

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.hatchId = response['id'];
        this.addExpenditure.hatchId = this.hatchId;
      },
    });
  }

  postExpenditure(): void {
    this.service
      .Post<ExpenditureRequest, ExpenditureResponse>(
        this.addExpenditure,
        'expenditures'
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            environment.fireSwal(response.message);
            this.router.navigate([
              `/farmer/hatches/expenditures/${this.hatchId}`,
            ]);
          } else environment.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          environment.fireSwal(err.message, false);
        },
      });
  }
}
