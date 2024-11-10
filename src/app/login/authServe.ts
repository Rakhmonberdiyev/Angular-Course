// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginStatus = new BehaviorSubject<boolean>(false);
  currentLoginStatus = this.loginStatus.asObservable();


  changeLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }
}
