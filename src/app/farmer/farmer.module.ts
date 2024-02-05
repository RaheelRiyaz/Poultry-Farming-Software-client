import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmerRoutingModule } from './farmer-routing.module';
import { HatchesComponent } from './pages/hatch/hatches/hatches.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FarmerComponent } from './farmer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from '../services/interceptor.service';
import { BaseService } from '../services/base.service';
import { CommonService } from '../services/common.service';
import { ExpendituresComponent } from './pages/expenditure/expenditures/expenditures.component';
import { DetailsComponent } from './pages/hatch/details/details.component';
import { AddComponent } from './pages/hatch/add/add.component';
import { AddExpenditureComponent } from './pages/expenditure/add-expenditure/add-expenditure.component';
import { AddMotivalityComponent } from './pages/motivality/add-motality/add-motivality.component';
import { MotivalitiesComponent } from './pages/motivality/motalities/motivalities.component';
import { SalesComponent } from './pages/sale/sales/sales.component';
import { AddSaleComponent } from './pages/sale/add-sale/add-sale.component';
import { ListComponent } from './pages/customer/list/list.component';
import { AddCustomerComponent } from './pages/customer/add-customer/add-customer.component';
import { CustomerDetailsComponent } from './pages/customer/customer-details/customer-details.component';
import { ChangePasswordComponent } from './pages/customer/accounts/change-password/change-password.component';
import { FarmerDetailsComponent } from './pages/customer/accounts/details/details.component';
import { AccountComponent } from './pages/customer/accounts/account/account.component';
import { GlobalErrorHandler } from '../services/global-exeception.service';
import { BillComponent } from './pages/sale/bill/bill.component';
import { DynamicBillComponent } from './pages/sale/dynamic-bill/dynamic-bill.component';

@NgModule({
  declarations: [
    HatchesComponent,
    FarmerComponent,
    ExpendituresComponent,
    DetailsComponent,
    AddComponent,
    AddExpenditureComponent,
    AddMotivalityComponent,
    MotivalitiesComponent,
    SalesComponent,
    AddSaleComponent,
    ListComponent,
    AddCustomerComponent,
    CustomerDetailsComponent,
    ChangePasswordComponent,
    FarmerDetailsComponent,
    AccountComponent,
    BillComponent,
    DynamicBillComponent,
  ],
  imports: [
    CommonModule,
    FarmerRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [
    BaseService,
    HttpClientModule,
    CommonService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
})
export class FarmerModule {}
