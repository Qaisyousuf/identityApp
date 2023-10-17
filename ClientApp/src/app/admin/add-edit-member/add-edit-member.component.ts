import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberAddEdit } from 'src/app/shared/models/account/admin/memeberAddEdit';

@Component({
  selector: 'app-add-edit-member',
  templateUrl: './add-edit-member.component.html',
  styleUrls: ['./add-edit-member.component.css']
})
export class AddEditMemberComponent implements OnInit {
  memberForm:FormGroup=new FormGroup({});
formInitializer=false;
addNew=true;
submitted=false;
errerMessage:string[]=[];
applicationRoles:string[]=[];
existingMemberRoles:string[]=[];


constructor(private adminService:AdminService,
            private sharedService:SharedService,
            private formBuilder:FormBuilder,
            private router:Router,
            private activateRoute:ActivatedRoute){}


  ngOnInit(): void {
    const id=this.activateRoute.snapshot.paramMap.get('id');
    if(id){
      this.addNew=false;
      this.getMember(id);
    }else{
      this.initializeForm(undefined);
    }

    this.getRoles();
  }

  getMember(id:string){
    this.adminService.getMember(id).subscribe({
      next: member=>{
        this.initializeForm(member);
      }
    })
  }

  getRoles(){
    this.adminService.getApplicationRoles().subscribe({
      next:roles=>this.applicationRoles=roles
    });
  }

  initializeForm(member: MemberAddEdit | undefined){
    if(member){
      this.memberForm=this.formBuilder.group({
        id:[member.id],
        firstName:[member.firstName,Validators.required],
        lastName:[member.lastName,Validators.required],
        userName:[member.userName,Validators.required],
        password:[''],
        roles:[member.roles,Validators.required]
      });
      this.existingMemberRoles=member.roles.split(',');

    }
    else{
      this.memberForm=this.formBuilder.group({
        id:[''],
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        userName:['',Validators.required],
        password:['', [Validators.required, Validators.minLength(6),Validators.maxLength(15)]],
        roles:['',Validators.required]
      });
    }

    this.formInitializer=true;
  }

  passwordOnChaged(){

     if(this.addNew===false){
      if(this.memberForm.get('password')?.value){
        this.memberForm.controls['password'].setValidators([Validators.required,Validators.minLength(6), Validators.maxLength(16)])
      }
      else{
        this.memberForm.get('password')?.clearValidators();
      }
      this.memberForm.controls['password'].updateValueAndValidity();
     }
  }

  roleOnChange(selectRoles:string){
    let roles=this.memberForm.get('roles')?.value.split(',');

    const index=roles.indexOf(selectRoles);

    index !==-1 ? roles.splice(index,1): roles.push(selectRoles);

    if(roles[0]===""){
      roles.splice(0,1);
    }
    this.memberForm.controls['roles'].setValue(roles.join(','))



  }


  submit(){
  this.submitted=true;
  this.errerMessage=[];


  if(this.memberForm.valid)
  {
    this.adminService.addEditMemeber(this.memberForm.value).subscribe({
      next:(response:any)=>{
        this.sharedService.showNotification(true,response.value.title,response.value.message);

        this.router.navigateByUrl('/admin');

      },
      error:error=>{
        if(error.error.errors){
          this.errerMessage=error.error.errors;
        }
        else{
          this.errerMessage.push(error.error);
        }
      }
    })
  }
  }
}
