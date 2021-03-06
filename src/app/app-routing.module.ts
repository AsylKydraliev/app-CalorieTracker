import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ResolverService } from './dish-list/resolver.service';
import { NotFountComponent } from './not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add', component: AddEditComponent},
  {path: ':id/edit', component: AddEditComponent, resolve: {meal: ResolverService}},
  {path: '**', component: NotFountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
