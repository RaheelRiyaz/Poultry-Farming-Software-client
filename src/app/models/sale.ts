export class BaseSale {
  customerId: string = '';
  noOfKilograms!: number;
  rate!: number;
  paymentStatus: number = 2;
}
export class SaleResponse extends BaseSale {
  id!: string;
  hatchId!: string;
  customerName!: string;
  customerEmail!: string;
  saleDate!: Date;
  totalAmount!: number;
}

export class SaleRequest extends BaseSale {
  hatchId!: string;
}

export class UpdateSalePaymentStatus {
  constructor(private id: string, private paymentStatus: number) {}
}

export class Bill {
  customerContact!: string;
  customerId!: string;
  email!: string;
  name!: string;
  noOfKilograms!: number;
  rate!: number;
  saleId!: string;
  soldOn!: Date;
  totalAmount!: number;
}

export class BillResponse {
  subTotal!: number;
  bills: Bill[] = [];
  billTemplate!: string;
}
