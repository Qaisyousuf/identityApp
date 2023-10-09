import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { SharedService } from 'src/app/shared/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/account/user';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  emailForm:FormGroup=new FormGroup({});
  submited=false;
  mode:String|undefined;
  errorMessage:string[]=[];

  constructor(private accountService:AccountService, private sharedService:SharedService, private formBuilder:FormBuilder, private router:Router, private activateRouter:ActivatedRoute){}

  ngOnInit(): void {
     this.accountService.user$.pipe(take(1)).subscribe({
      next: (user:User | null)=>{
        if(user){
          this.router.navigateByUrl('/');
        }else{
          const mode=this.activateRouter.snapshot.paramMap.get('mode');
          if(mode){
            this.mode=mode;
            console.log(this.mode);
            this.intializeForm();
          }
        }

      }

     })
  }

  intializeForm(){
    this.emailForm=this.formBuilder.group({

      email:['', [Validators.required, Validators.email]],

    })
  }

  sendEmail(){
    this.submited=true;
    this.errorMessage=[];
    if(this.emailForm.value && this.mode){
      if(this.mode.includes('resend-email-confirmation-link')){
         this.accountService.resendEmailConfirmationLink(this.emailForm.get('email')?.value).subscribe({
            next:(response:any)=>{
              this.sharedService.showNotification(true,response.value.title,response.value.message);
              this.router.navigateByUrl('/account/login');
            },
            error: error=>{
              if(error.error.errors){
                this.errorMessage=error.error.errors;
              }
                else {
                  this.errorMessage.push(error.error);
                }
            }

         })
      } else if(this.mode.includes('forgot-username-or-password')){
        this.accountService.forgotUsernameorPassword(this.emailForm.get('email')?.value).subscribe({
        next:(respons:any)=>{
          this.sharedService.showNotification(true,respons.value.title,respons.value.message);
          this.router.navigateByUrl('/account/login');
        },   error: error=>{
          if(error.error.errors){
            this.errorMessage=error.error.errors;
          }
            else {
              this.errorMessage.push(error.error);
            }
        }

        })
      }
    }
  }

  cancel(){
    this.router.navigateByUrl('/account/login');
  }

}
