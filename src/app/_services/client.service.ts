import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, Observable, of, tap} from 'rxjs';
import {UserService} from '@services/user.service';
import {ConfigurationService} from '@services/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,
              private userService: UserService) {}

  login(): Observable<{ token: string, username: string }> {
    if (ConfigurationService.config.useHttp) {
      return this.http.get<{ token: string, username: string }>('https://mocki.io/v1/eb7c7907-2e15-4755-a76d-c6dbb2124199');
    } else {
      return of({
        token: 'MyTestToken',
        username: 'Teszt Béláné'
      }).pipe(
        delay(1000),
        tap((response) => {
          this.userService.saveSession(response);
        })
      )
    }
  }
}
