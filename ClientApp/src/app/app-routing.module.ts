import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';


const routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'account',loadChildren:()=> import('./account/account.module').then(module=>module.AccountModule)},
  {path:'not-found',component:NotFoundComponent},
  {path:'**',component:NotFoundComponent,pathMatch:'full'},

]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
