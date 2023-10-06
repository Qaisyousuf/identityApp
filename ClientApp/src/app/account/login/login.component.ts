import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginFormGroup:FormGroup=new FormGroup({});
  submited=false;
  errorMessages:string[]= [];


  constructor(private accounSerivces:AccountService,private formBuilder:FormBuilder, private router:Router)
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

        next:(Response:any)=>{
        this.router.navigateByUrl('/')

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
