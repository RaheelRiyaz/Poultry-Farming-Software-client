import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dynamic-bill',
  templateUrl: './dynamic-bill.component.html',
  styleUrl: './dynamic-bill.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class DynamicBillComponent {
  @Input() billTemplate!: string;
}
