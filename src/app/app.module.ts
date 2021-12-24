import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { HomeComponent } from './home/home.component';
import { DishListComponent } from './dish-list/dish-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotFountComponent } from './not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEditComponent,
    HomeComponent,
    DishListComponent,
    NotFountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
