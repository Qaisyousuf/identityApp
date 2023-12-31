import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../shared/models/account/register';
import { environment } from 'src/environments/environment';
import { Login } from '../shared/models/account/login';
import { User } from '../shared/models/account/user';
import { ReplaySubject, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmEmail } from '../shared/models/account/confirmEmail';
import { ResetPassword } from '../shared/models/account/resetPassword';
import { RegisterWithExternal } from '../shared/models/account/registerWithExternal';
import { LoginWithExternal } from '../shared/models/account/loginWithExternal';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private usersource=new ReplaySubject<User | null>(1);
  user$=this.usersource.asObservable();
  constructor(private http:HttpClient, private router:Router) { }


  refreshUser(jwt:string | null){
    if(jwt===null)
    {
      this.usersource.next(null);
      return of(undefined);
    }

    let headers=new HttpHeaders();
    headers=headers.set('Authorization','Bearer ' + jwt);

    return this.http.get<User>(`${environment.appUrl}account/refresh-user-token`, {headers}).pipe(
      map((user:User)=>{
        this.setUser(user);
      })
    )
  }

Logout()
{
  localStorage.removeItem(environment.userKey);
  this.usersource.next(null);
  this.router.navigateByUrl('/');
}
  register(model:Register)
  {
    return this.http.post(`${environment.appUrl}account/register`,model)
  }

  registerWithThirdParty(mode:RegisterWithExternal){
    return this.http.post<User>(`${environment.appUrl}account/register-with-third-party`,mode).pipe(
      map((user:User)=>{
        if(user){
          this.setUser(user);
        }
      })
    );
  }

  login(model:Login){
    return this.http.post<User>(`${environment.appUrl}account/login`,model).pipe(
      map((user:User)=>{
        if(user){
          this.setUser(user);
        }
      })
    );
  }

  loginWithThirdParty(model:LoginWithExternal){
     return this.http.post<User>(`${environment.appUrl}account/login-with-third-party`,model).pipe(
      map((user:User)=>{
        if(user){
          this.setUser(user);
        }
      })
     )
  }

  confirmEmail(model:ConfirmEmail){
    return this.http.put(`${environment.appUrl}account/confirm-email`,model);
  }

  resendEmailConfirmationLink(email:string){
    return this.http.post(`${environment.appUrl}account/resend-email-confirmation-link/${email}`,{});
  }

  forgotUsernameorPassword(email:string)
  {
    return this.http.post(`${environment.appUrl}account/forgot-username-or-password/${email}`,{});
  }

  resetPassword(mode:ResetPassword){
    return this.http.put(`${environment.appUrl}account/reset-password`,mode);
  }

  getJWT(){
    const key=localStorage.getItem(environment.userKey);
    if(key){
      const user:User=JSON.parse(key);
      return user.jwt;
    }
    return null;
  }

  private setUser(user:User)
  {
    localStorage.setItem(environment.userKey,JSON.stringify(user));
    this.usersource.next(user);


  }

}
