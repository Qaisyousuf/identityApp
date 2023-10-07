import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  message:string |undefined;
constructor(private settingsService:SettingsService){ }


  ngOnInit(): void {
   this.settingsService.getSettings().subscribe({
    next:(response:any)=>this.message=response.value.message,
    error: error=>console.log(error)
   });
  }

}
