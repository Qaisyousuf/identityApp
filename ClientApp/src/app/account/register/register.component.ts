import { Component, OnInit, Renderer2 } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/account/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit {

  registerFormGroup:FormGroup=new FormGroup({});
  submited=false;
  errorMessages:string[]= [];

constructor(private accounSerivces:AccountService,private FormBuilder:FormBuilder, private sharedService:SharedService, private router:Router, private _renderer2: Renderer2,)
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
    this.initializeForm();
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

}
