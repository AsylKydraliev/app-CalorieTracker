import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meal } from './meal.model';

@Injectable({
  providedIn: 'root',
})

export class MealService{
  meals: Meal[] = [];
  constructor(private http: HttpClient){}

  postData(meal: Meal){
    const body = new Meal(meal.mealTime, meal.description, meal.calories);
    this.http.post('https://app-blog-f76a2-default-rtdb.firebaseio.com/meal.json', body).subscribe();
  }

  getData(){
    this.http.get<Meal[]>('https://app-blog-f76a2-default-rtdb.firebaseio.com/meal.json').pipe();
  }
}
