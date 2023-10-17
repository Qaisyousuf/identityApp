import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from './admin.service';
import { SharedService } from '../shared/shared.service';
import { MemberView } from '../shared/models/account/admin/memberView';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

members:MemberView[]=[];
memberToDelete:MemberView | undefined;
modelRef?:BsModalRef


  constructor(private adminService:AdminService, private sharedServices:SharedService, private modesService:BsModalService){}

  ngOnInit(): void {
    this.adminService.getMembers().subscribe({
      next:members=>this.members=members
    });
  }


  lockMember(id:string){
     this.adminService.lockMemeber(id).subscribe({
      next:_=>{
        this.hanleLockUnlockFilterandMessage(id,true);
      }
     })
  }

  unlockMember(id:string){
    this.adminService.unlockMemeber(id).subscribe({
     next:_=>{
       this.hanleLockUnlockFilterandMessage(id,false);
     }
    })
 }

 deleteMemeber(id:string, templete:TemplateRef<any>){
  let member=this.findMemeber(id);
  if(member){
    this.memberToDelete=member;
    this.modelRef=this.modesService.show(templete,{class:'modal-sm'});
  }
 }

 confirm()
 {
  if(this.memberToDelete){
    this.adminService.deleteMemeber(this.memberToDelete.id).subscribe({
      next:_=>{
        this.sharedServices.showNotification(true,'Deleted',`Member of ${this.memberToDelete?.userName} has been deleted!`);
        this.members=this.members.filter(x=>x.id !==this.memberToDelete?.id);
        this.memberToDelete=undefined;
        this.modelRef?.hide();
      }
    })
  }
 }

 decline()
 {
  this.memberToDelete=undefined;
  this.modelRef?.hide();
 }

  private hanleLockUnlockFilterandMessage(id:string, locking:boolean){

    let member=this.findMemeber(id);

    if(member){
      member.isLocked=!member.isLocked;

      if(locking){
        this.sharedServices.showNotification(true,'Locked',`${member.userName} member has been locked`);
      }
      else{
        this.sharedServices.showNotification(true,'Unlocked',`${member.userName} member has been Unlocked`);
      }
    }
  }

  private findMemeber(id:string) :MemberView | undefined{
     let member=this.members.find(x=>x.id===id);

     if(member){
      return member;
     }
     return undefined;
  }



}
