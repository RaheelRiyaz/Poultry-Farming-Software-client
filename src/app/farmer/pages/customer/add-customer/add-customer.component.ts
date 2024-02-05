import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { Router } from '@angular/router';
import { Form } from '@angular/forms';
import { environment } from '../../../../../environments/environment.development';
import { CustomerResponse } from '../../../../models/customer';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss',
})
export class AddCustomerComponent {
  constructor(private service: BaseService, private router: Router) {}

  addCustomer(form: HTMLFormElement): void {
    const formData = new FormData(form);
    this.service.Post<FormData, CustomerResponse>(formData, 'customers').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          environment.fireSwal(response.message);
          this.router.navigate(['/farmer/customers']);
        } else environment.fireSwal(response.message, false);
      },
      error: (err: Error) => {
        environment.fireSwal(err.message, false);
      },
    });
  }
}
