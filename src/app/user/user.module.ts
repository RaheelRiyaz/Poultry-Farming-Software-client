import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';
import { BaseService } from '../services/base.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SignupComponent, LoginComponent, UserComponent],
  imports: [CommonModule, UserRoutingModule, RouterModule, FormsModule,HttpClientModule],
  providers: [BaseService],
})
export class UserModule {}
