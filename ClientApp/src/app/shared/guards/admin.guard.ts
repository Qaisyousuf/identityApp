import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { User } from '../models/account/user';
import { SharedService } from '../shared.service';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn:'root'
})
export class adminGuard{
constructor( private accountService:AccountService, private sharedService:SharedService, private router:Router){}

canActivate(): Observable<boolean>{
  return this.accountService.user$.pipe(
    map((user:User | null)=>{

      if(user){
        const decodeToken:any=jwt_decode(user.jwt);
        if(decodeToken.role.includes('Admin')){
          return true;
        }
      }
       this.sharedService.showNotification(false,'admin area','You dont have the role to access the admin area');
       this.router.navigateByUrl('/')
      return false;
    })
  )
}


}
