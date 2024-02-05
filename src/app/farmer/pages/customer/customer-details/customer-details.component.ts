import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerResponse } from '../../../../models/customer';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss',
})
export class CustomerDetailsComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute
  ) {}
  customerId!: string;
  customerDetails!: CustomerResponse;
  basePath: string = environment.fileBaseUrl;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.customerId = response['id'];
        this.getCustomerDetails();
      },
    });
  }

  getCustomerDetails(): void {
    this.service
      .Find<CustomerResponse>(`customers/${this.customerId}`)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) this.customerDetails = response.result;
        },
        error: (err: Error) => {},
      });
  }
}
