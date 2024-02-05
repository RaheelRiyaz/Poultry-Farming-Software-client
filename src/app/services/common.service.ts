import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiresponse';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private router: Router) {}

  getToken(): string {
    return sessionStorage.getItem('KashmirPoultryCredentials')
      ? JSON.parse(sessionStorage['KashmirPoultryCredentials']).token
      : '';
  }

  getUserCredentials(): any | null {
    return sessionStorage.getItem('KashmirPoultryCredentials')
      ? JSON.parse(sessionStorage['KashmirPoultryCredentials'])
      : null;
  }

  isUserAuthenticated(): boolean {
    if (this.getUserCredentials() && this.getUserCredentials()?.token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  logOut() {
    environment
      .fireConfirmSwal('Are you sure you want to Logout?')
      .then((res) => {
        if (res.isConfirmed) {
          sessionStorage.removeItem('KashmirPoultryCredentials');
          this.router.navigate(['/login']);
        }
      });
  }

  // deleteItem<T>(url: string, id: string): Observable<ApiResponse<T>> {
  //   return this.httpClient.delete<ApiResponse<T>>(
  //     environment.baseUrl + url + '/' + id
  //   );
  // }

  // isExists(url: string): Observable<any> {
  //   return this.httpClient.get<any>(`${environment.baseUrl}${url}`);
  // }
}
