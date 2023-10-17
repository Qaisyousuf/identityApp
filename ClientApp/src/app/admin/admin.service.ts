import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberView } from '../shared/models/account/admin/memberView';
import { environment } from 'src/environments/environment';
import { MemberAddEdit } from '../shared/models/account/admin/memeberAddEdit';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getMembers(){

    return this.http.get<MemberView[]>(`${environment.appUrl}admin/get-members`);

  }

  getMember(id:string){

    return this.http.get<MemberAddEdit>(`${environment.appUrl}admin/get-member/${id}`);

  }

  getApplicationRoles(){
    return this.http.get<string[]>(`${environment.appUrl}admin/get-application-roles`);
  }

  addEditMemeber(mode:MemberAddEdit)
  {
    return this.http.post(`${environment.appUrl}admin/add-edit-member`,mode);
  }

  lockMemeber(id:string){
    return this.http.put(`${environment.appUrl}admin/lock-member/${id}`,{});
  }

  unlockMemeber(id:string){
    return this.http.put(`${environment.appUrl}admin/unlock-member/${id}`,{});
  }

  deleteMemeber(id:string){
    return this.http.delete(`${environment.appUrl}admin/delete-member/${id}`,{});
  }
}
