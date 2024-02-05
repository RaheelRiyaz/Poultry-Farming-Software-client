import { Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { FarmerModule } from './farmer/farmer.module';
import { FarmerGuard } from './auths/farmer.guard';

export const routes: Routes = [
    {path:'',loadChildren:()=>UserModule},
    {path:'farmer',loadChildren:()=>FarmerModule,canActivate:[FarmerGuard]},
];
