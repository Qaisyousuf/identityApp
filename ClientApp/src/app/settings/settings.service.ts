import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private httpclient:HttpClient) { }

  getSettings(){
    return this.httpclient.get(`${environment.appUrl}Settings/get-settings`);
  }
}
