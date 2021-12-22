import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddEditComponent } from './add-edit/add-edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add', component: AddEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
