import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { SharedService } from 'src/app/shared/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/account/user';
import { ResetPassword } from 'src/app/shared/models/account/resetPassword';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm:FormGroup=new FormGroup({});
  token:string |undefined;
  email:string |undefined;
  submited=false;
  errorMessage:string[]=[];

constructor(private accountService:AccountService, private sharedService:SharedService, private formBuilder:FormBuilder, private router:Router, private activateRouter:ActivatedRoute){}

  ngOnInit(): void {
    this.accountService.user$.pipe(take(1)).subscribe({
      next:(user:User | null)=>{
        if(user){
          this.router.navigateByUrl('/');
        }else{
          this.activateRouter.queryParamMap.subscribe({
            next:(parms: any)=>{
              this.token=parms.get('token');
              this.email=parms.get('email');

              if(this.token && this.email){
                this.initializeForm(this.email);
              }else{
                this.router.navigateByUrl('/account/login');
              }

            }
          })
        }
      }
    })
  }
  initializeForm(username:string){
    this.resetPasswordForm=this.formBuilder.group({

      email:[{value:username, disabled:true}],
      newPassword:['', [Validators.required, Validators.minLength(6),Validators.maxLength(15)]],

    })
  }

  resetPassword(){
    this.submited=true;
    this.errorMessage=[];

    if(this.resetPasswordForm.valid && this.email && this.token){
      const model:ResetPassword={
        token:this.token,
        email:this.email,
        newPassword:this.resetPasswordForm.get('newPassword')?.value
      };

      this.accountService.resetPassword(model).subscribe({
        next:(respons:any)=>{
           this.sharedService.showNotification(true,respons.value.title,respons.value.message);
           this.router.navigateByUrl('/account/login');
        }, error:error=>{
          if(error.error.errors){
            this.errorMessage=error.error.errors;

          }else{
            this.errorMessage.push(error.error);
          }
        }
      });
    }
  }

}
