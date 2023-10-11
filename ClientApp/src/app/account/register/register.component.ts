import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/account/user';
import { CredentialResponse } from 'google-one-tap';
import jwt_decode from 'jwt-decode';
import { DOCUMENT } from '@angular/common';


declare const FB:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit {

  @ViewChild('googleButton',{static:true}) googleButton:ElementRef=new ElementRef({});

  registerFormGroup:FormGroup=new FormGroup({});
  submited=false;
  errorMessages:string[]= [];

constructor(private accounSerivces:AccountService,private FormBuilder:FormBuilder, private sharedService:SharedService, private router:Router, private _renderer2: Renderer2, @Inject(DOCUMENT) private _document:Document)
{
  this.accounSerivces.user$.pipe(take(1)).subscribe({
    next:(user:User | null)=>{
      if(user){
        this.router.navigateByUrl('/');
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
    this.registerFormGroup=this.FormBuilder.group({
      firstname:['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      lastname:['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6),Validators.maxLength(15)]],
    })
  }

  Register(){

    this.submited=true;
    this.errorMessages=[];

    if(this.registerFormGroup.valid){
      this.accounSerivces.register(this.registerFormGroup.value).subscribe({

        next:(Response:any)=>{
          this.sharedService.showNotification(true,Response.value.title,Response.value.message);
          this.router.navigateByUrl('/account/login');

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

  RegisterWithFacebook(){
    FB.login(async(fbresult:any)=>{
      if(fbresult.authResponse){

        console.log(fbresult)
        const accessToken=fbresult.authResponse.accessToken;
        const userId=fbresult.authResponse.userID;
        this.router.navigateByUrl(`/account/register/third-party/facebook?access_token=${accessToken}&userId=${userId}`);
      }
      else{
        this.sharedService.showNotification(false,"Failed","Unable to register with your facebook account")
      }
    })
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
      {size:'medium', shape:'rectangular', text: 'signup_with',logo_alignment:'center'}
    );
  };
  }

   private async googleCallBack(Response:CredentialResponse){
    const decodedToken: any=jwt_decode(Response.credential);
    this.router.navigateByUrl(`/account/register/third-party/google?access_token=${Response.credential}&userId=${decodedToken.sub}`);
   }

}
