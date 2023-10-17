import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import jwt_decode from 'jwt-decode';
import { take } from 'rxjs';
import { RouterLink } from '@angular/router';

@Directive({
  selector: '[appUserHasRole]'
})
export class UserHasRoleDirective implements OnInit {

  @Input() appUserHasRole:string[]=[];

  constructor(private viewContainerRef:ViewContainerRef,
              private tempeleteRef:TemplateRef<any>,
              private accountService:AccountService) { }

  ngOnInit(): void {
   this.accountService.user$.pipe(take(1)).subscribe({
    next:user=>{
      if(user){
        const decodeToken:any=jwt_decode(user.jwt);
        if(decodeToken.role.some((role:any)=>this.appUserHasRole.includes(role))){
          this.viewContainerRef.createEmbeddedView(this.tempeleteRef);
        }
        else{
          this.viewContainerRef.clear();
        }
      }
      else{
        this.viewContainerRef.clear();
      }
    }
   })
  }

}
