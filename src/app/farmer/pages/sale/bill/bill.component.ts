import { Component, ViewEncapsulation } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { ActivatedRoute } from '@angular/router';
import { BillResponse } from '../../../../models/sale';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.scss',
})
export class BillComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  customerId!: string;
  hatchId!: string;
  bill!: BillResponse;
  billTemplate!: any;
  loading: boolean = true;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (res) => {
        this.customerId = res['customerid'];
        this.hatchId = res['hatchid'];
        this.viewBill();
      },
    });
  }

  viewBill(): void {
    this.service
      .Fetch<BillResponse>(
        `sales/generate-bill/${this.customerId}/${this.hatchId}`
      )
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.billTemplate = this.sanitizer.bypassSecurityTrustHtml(
            response.result.billTemplate
          );
          if (response.isSuccess) this.bill = response.result;
        },
        error: (err: Error) => {
          console.log(err);
          this.loading = false;
        },
      });
  }

  // downloadPdf(): void {
  //   const Htmlstring = new String(this.billTemplate);
  //   Htmlstring.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');

  //   // Now, you can use `escapedHtmlTable` in your JSON payload
  //   const payload = { htmlTable: btoa(Htmlstring.toString()) };
  //   this.service.Post<any, any>(Htmlstring, 'sales/generate-pdf').subscribe({
  //     next: (response) => {
  //       console.log(response);
  //     },
  //     error: (err: Error) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
