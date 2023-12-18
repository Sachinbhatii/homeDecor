import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {CartType} from "../../../types/cart.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {UserInfoType} from "../../../types/user-info.type";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  count = 0;
  count$: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) {
  }



  updateUserInfo(params: UserInfoType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'user', params);
  }

  getUserInfo(): Observable<UserInfoType | DefaultResponseType> {
    return this.http.get<UserInfoType | DefaultResponseType>(environment.api + 'user');
  }

}
