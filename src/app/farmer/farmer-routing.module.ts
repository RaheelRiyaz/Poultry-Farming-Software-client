import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmerComponent } from './farmer.component';
import { HatchesComponent } from './pages/hatch/hatches/hatches.component';
import { ExpendituresComponent } from './pages/expenditure/expenditures/expenditures.component';
import { DetailsComponent } from './pages/hatch/details/details.component';
import { AddComponent } from './pages/hatch/add/add.component';
import { MotivalitiesComponent } from './pages/motivality/motalities/motivalities.component';
import { SalesComponent } from './pages/sale/sales/sales.component';
import { AddSaleComponent } from './pages/sale/add-sale/add-sale.component';
import { ListComponent } from './pages/customer/list/list.component';
import { AddCustomerComponent } from './pages/customer/add-customer/add-customer.component';
import { CustomerDetailsComponent } from './pages/customer/customer-details/customer-details.component';
import { AddExpenditureComponent } from './pages/expenditure/add-expenditure/add-expenditure.component';
import { FarmerDetailsComponent } from './pages/customer/accounts/details/details.component';
import { ChangePasswordComponent } from './pages/customer/accounts/change-password/change-password.component';
import { AccountComponent } from './pages/customer/accounts/account/account.component';
import { FarmerGuard } from '../auths/farmer.guard';
import { AddMotivalityComponent } from './pages/motivality/add-motality/add-motivality.component';
import { BillComponent } from './pages/sale/bill/bill.component';

const routes: Routes = [
  {
    path: '',
    component: FarmerComponent,
    children: [
      { path: '', redirectTo: 'hatches', pathMatch: 'full' },
      {
        path: 'hatches',
        children: [
          { path: '', component: HatchesComponent },
          { path: 'add-hatch', component: AddComponent },
          { path: ':id', component: DetailsComponent },
          { path: 'expenditures/:id', component: ExpendituresComponent },
          { path: 'motivalities/:id', component: MotivalitiesComponent },
          { path: 'sales/:id', component: SalesComponent },
          { path: 'add-sale/:id', component: AddSaleComponent },
          { path: 'generate-bill/:customerid/:hatchid', component: BillComponent },
          { path: 'add-motality/:id', component: AddMotivalityComponent },
          { path: 'expenditures/add/:id', component: AddExpenditureComponent },
        ],
      },
      {
        path: 'customers',
        children: [
          { path: '', component: ListComponent },
          { path: 'add', component: AddCustomerComponent },
          { path: 'details/:id', component: CustomerDetailsComponent },
        ],
      },

      {
        path: 'accounts',
        component: AccountComponent,
        children: [
          { path: '', redirectTo: 'details', pathMatch: 'full' },
          { path: 'details', component: FarmerDetailsComponent },
          { path: 'change-password', component: ChangePasswordComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerRoutingModule {}
