import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/account/user';
import { SharedService } from 'src/app/shared/shared.service';
import { LoginWithExternal } from 'src/app/shared/models/account/loginWithExternal';
import { DOCUMENT } from '@angular/common';
import { CredentialResponse } from 'google-one-tap';
import jwt_decode from 'jwt-decode';

declare const FB:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('googleButton',{static:true}) googleButton:ElementRef=new ElementRef({});

  loginFormGroup:FormGroup=new FormGroup({});
  submited=false;
  errorMessages:string[]= [];
  returnUrl:string |null=null;


  constructor(private accounSerivces:AccountService,private formBuilder:FormBuilder, private router:Router, private activatedRout:ActivatedRoute,private sharedService:SharedService, private _renderer2: Renderer2, @Inject(DOCUMENT) private _document:Document)
{
  this.accounSerivces.user$.pipe(take(1)).subscribe({
     next:(user:User | null)=>{
      if(user){
        this.router.navigateByUrl('/');
      }
      else{
        this.activatedRout.queryParamMap.subscribe({
          next: (parms:any)=>{
            if(parms){
              this.returnUrl=parms.returnUrl.get('returnUrl');
            }
          }
        })
      }
     }
  })
}


  ngOnInit(): void {
    this.initializeGoogleButton();
    this.initializeForm();
  }
  ngAfterViewInit(){
    const script1=this._renderer2.createElement('script');
    script1.src='https://accounts.google.com/gsi/client';
    script1.async='true';
    script1.defer='true';
    this._renderer2.appendChild(this._document.body,script1);
  }

  initializeForm(){
    this.loginFormGroup=this.formBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required],
    })
  }


  login(){
    this.submited=true;
    this.errorMessages=[];

    if(this.loginFormGroup.valid){
      this.accounSerivces.login(this.loginFormGroup.value).subscribe({

        next:_=>{
        if(this.returnUrl){
          this.router.navigateByUrl(this.returnUrl);
        }
        else{
          this.router.navigateByUrl('/')
        }

        },

        error:error=>{
          console.log(error);
          if(error.error.errors){
            this.errorMessages=error.error.errors;
          }
          else{
            this.errorMessages.push(error.error);
          }

        }

      })
   }
  }

  LoginWithFacebook(){
    FB.login(async(fbresult:any)=>{
      if(fbresult.authResponse){

        console.log(fbresult);
        const accessToken=fbresult.authResponse.accessToken;
        const userId=fbresult.authResponse.userID;
       this.accounSerivces.loginWithThirdParty(new LoginWithExternal(accessToken,userId,"facebook")).subscribe({
        next:_=>{
          if(this.returnUrl){
            this.router.navigateByUrl(this.returnUrl);
          }else{
            this.router.navigateByUrl('/')
          }
        },error:error=>{
          this.sharedService.showNotification(false,"Failed",error.error);

        }

       })
      }
      else{
        this.sharedService.showNotification(false,"Failed","Unable to login with your facebook account")
      }
    })

  }
  resendEmailConfirmationLink(){
    this.router.navigateByUrl('/account/send-email/resend-email-confirmation-link');
  }

  private  initializeGoogleButton(){
    (window as any).onGoogleLibraryLoad=()=>{
      // @ts-ignore

      google.accounts.id.initialize({
        client_id:'227349503161-pdrcuj8lhp5br97ejfh8pbshbfhc5iuj.apps.googleusercontent.com',
        callback: this.googleCallBack.bind(this),
        auto_select:false,
        cancel_on_tap_outside:true,
      });

      //@ts-ignore
      google.accounts.id.renderButton(
        this.googleButton.nativeElement,
        {size:'medium', shape:'rectangular', text: 'signin_with',logo_alignment:'center'}
      );
    };
    }

     private async googleCallBack(Response:CredentialResponse){
      const decodedToken: any=jwt_decode(Response.credential);
     this.accounSerivces.loginWithThirdParty(new LoginWithExternal(Response.credential,decodedToken.sub,"google")).subscribe({
      next:_=>{
        if(this.returnUrl){
          this.router.navigateByUrl(this.returnUrl);
        }else{
          this.router.navigateByUrl('/')
        }
      }, error:error=>{
        this.sharedService.showNotification(false,"Failed",error.error);
      }
     })
     }


}
