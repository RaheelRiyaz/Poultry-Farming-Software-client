import { Component } from '@angular/core';
import { SaleRequest, SaleResponse } from '../../../../models/sale';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../../../services/base.service';
import { CustomerResponse } from '../../../../models/customer';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrl: './add-sale.component.scss',
})
export class AddSaleComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  hatchId!: string;
  saleRequest: SaleRequest = new SaleRequest();
  customers: CustomerResponse[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.hatchId = response['id'];
        this.saleRequest.hatchId = this.hatchId;
        this.getCustomers();
      },
    });
  }

  getCustomers(): void {
    this.service.Fetch<CustomerResponse[]>('customers').subscribe({
      next: (response) => {
        if (response.isSuccess) this.customers = response.result;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

  addSale(paymentStatus: boolean): void {
    paymentStatus ? (this.saleRequest.paymentStatus = 1) : 2;
    this.service
      .Post<SaleRequest, SaleResponse>(this.saleRequest, 'sales')
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
