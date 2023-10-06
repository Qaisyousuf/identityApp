import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NotificationComponent } from './components/models/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  bsModalRef?:BsModalRef;
  constructor(private modalServics:BsModalService ) {

  }

  showNotification(isSuccess:boolean, title:string, message:string)
  {
    const initialState:ModalOptions={
      initialState:{
        isSuccess,
        message,
        title
      }
    };

    this.bsModalRef=this.modalServics.show(NotificationComponent,initialState);

  }
}
