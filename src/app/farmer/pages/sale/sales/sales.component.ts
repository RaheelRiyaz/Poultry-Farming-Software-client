import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { ActivatedRoute } from '@angular/router';
import { SaleResponse, UpdateSalePaymentStatus } from '../../../../models/sale';
import { environment } from '../../../../../environments/environment.development';
import { CustomerResponse } from '../../../../models/customer';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute
  ) {}
  hatchId!: string;
  sales: SaleResponse[] = [];
  customers: CustomerResponse[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.hatchId = response['id'];
        this.viewSale();
      },
    });
    this.getCustomers();
  }

  viewSale(): void {
    this.service
      .Fetch<SaleResponse[]>(`sales/hatch/${this.hatchId}`)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) this.sales = response.result;
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }

  changePaymentStatus(id: string, checked: boolean): void {
    environment
      .fireConfirmSwal('Are you sure you want change payment status?')
      .then((res) => {
        if (res.isConfirmed) {
          const updateSalePaymentStatus = new UpdateSalePaymentStatus(
            id,
            checked ? 1 : 2
          );
          this.service
            .Update<UpdateSalePaymentStatus, number>(
              updateSalePaymentStatus,
              'sales/change-payment-status'
            )
            .subscribe({
              next: (response) => {
                if (response.isSuccess) {
                  this.viewSale();
                  environment.fireSwal(response.message);
                } else {
                  environment.fireSwal(response.message, false);
                }
              },
              error: (err: Error) => {
                environment.fireSwal(err.message, false);
                throw new Error(err.message);
              },
            });
        }
      });
  }

  viewPendingPaymentSales(): void {
    this.service
      .Fetch<SaleResponse[]>(`sales/pending-payment-sales/${this.hatchId}`)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.sales = response.result;
          } else {
            this.sales = [];
          }
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }
  newlyAdded(): void {
    this.service
      .Fetch<SaleResponse[]>(`sales/newly-added/${this.hatchId}`)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.sales = response.result;
          } else {
            this.sales = [];
          }
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }

  filterSale(val: string): void {
    switch (val) {
      case '1':
        this.newlyAdded();
        break;
      case '2':
        this.viewPendingPaymentSales();
        break;
      default:
        this.viewSale();
    }
  }

  getCustomers(): void {
    this.service.Fetch<CustomerResponse[]>('customers').subscribe({
      next: (response) => {
        if (response.isSuccess) this.customers = response.result;
      },
      error: (err: Error) => {},
    });
  }

  filterSaleByCustomer(customerId: string): void {
    this.service
      .Fetch<SaleResponse[]>(`sales/filter-by-customer/${customerId}`)
      .subscribe({
        next: (response) => {          
          if (response.isSuccess) this.sales = response.result;
          else this.sales = [];
        },
        error: (err: Error) => {},
      });
  }
}
