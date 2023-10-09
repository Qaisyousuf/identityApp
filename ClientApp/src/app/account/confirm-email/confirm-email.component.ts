import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/account/user';
import { ConfirmEmail } from 'src/app/shared/models/account/confirmEmail';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  success=true;

constructor(private accountServics:AccountService, private sharedService:SharedService, private router:Router, private activeateRouter:ActivatedRoute ){}

  ngOnInit(): void {
    this.accountServics.user$.pipe(take(1)).subscribe({
      next:(user:User |null)=>{
        if(user){
          this.router.navigateByUrl("/");
        }
        else{
          this.activeateRouter.queryParamMap.subscribe({
            next:(params: any)=>{
              const confirmEmail:ConfirmEmail={
                token:params.get('token'),
                email:params.get('email')
              }
              this.accountServics.confirmEmail(confirmEmail).subscribe({
                next:(respons:any)=>{
                  this.sharedService.showNotification(true,respons.value.title,respons.value.message);
                },
                error:error=>{
                  this.success=false;
                  this.sharedService.showNotification(false,"Failed",error.error);
                }
              })
            }
          })
        }
      }

    })
  }
  resendEmailConfirmationLink(){
    this.router.navigateByUrl('/account/send-email/resend-email-confirmation-link');
  }

}
