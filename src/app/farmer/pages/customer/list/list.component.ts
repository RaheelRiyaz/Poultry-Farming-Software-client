import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { CustomerResponse } from '../../../../models/customer';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  constructor(private service: BaseService) {}
  customers: CustomerResponse[] = [];
  fileBasePath: string = environment.fileBaseUrl;

  ngOnInit(): void {
    this.getCustomers();
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

  filterCustomers(name: string): void {
    if (name) {
      this.service
        .Fetch<CustomerResponse[]>(`customers/search/${name}`)
        .subscribe({
          next: (response) => {
            if (response.isSuccess) this.customers = response.result;
            else this.customers = [];
          },
          error: (err: Error) => {
            console.log(err);
          },
        });
    } else this.getCustomers();
  }
}
