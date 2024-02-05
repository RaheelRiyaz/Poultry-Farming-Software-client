export class HatchResponse {
  id!: string;
  entityId!: string;
  name!: string;
  noOfChicks!: number;
  totalMotality!: number;
  chickPerPrice!: number;
  hatchStatus!: number;
  daysPassed!: number;
  createdOn!: Date;
  updatedOn!: Date;
}

export class ExpenditureResponse {
  hatchId!: string;
  name!: string;
  description!: string;
  totalAmount!: number;
  id!: string;
}

export class HatchDetails extends HatchResponse {
  totalExpenditure!: number;
  totalSale!: number;
  profitOrLoss: string = '';
}

export class ExpenditureRequest {
  hatchId!: string;
  name!: string;
  description!: string;
  totalAmount!: number;
}

export class HatchRequest {
  name!: string;
  noOfChicks!: number;
  chickPerPrice!: number;
  createdOn!: Date;
}

export class HatchStatusRequest {
  constructor(
    private hatchStatus: 1 | 2,
    private hatchId: string,
    public hatchFinishDate: Date
  ) {}
}
