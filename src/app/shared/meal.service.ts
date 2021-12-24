import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meal } from './meal.model';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class MealService{
  meals: Meal[] | null = null;
  mealsChange = new Subject<Meal[]>();
  removing = new Subject<boolean>();
  mealLoading = new Subject<boolean>();

  constructor(private http: HttpClient){}

  postData(meal: Meal){
    const body = new Meal(meal.id, meal.mealTime, meal.description, meal.calories, meal.date);
    this.http.post('https://app-blog-f76a2-default-rtdb.firebaseio.com/meal.json', body).subscribe();
  }

  getData(){
    this.mealLoading.next(true);
    this.http.get<{[id: string]: Meal}>('https://app-blog-f76a2-default-rtdb.firebaseio.com/meal.json')
      .pipe(map(result => {
        if(result === null){
          return [];
        }
         return Object.keys(result).map(id => {
           const data = result[id];
           return new Meal(id, data.mealTime, data.description, data.calories, data.date);
         })
      }))
      .subscribe(result => {
        this.meals = [];
        this.meals = result;
        this.mealsChange.next(this.meals.slice());
        this.mealLoading.next(false);
      }, () => {
        this.mealLoading.next(false);
      })
  }

  getMeal(id: string){
    return this.http.get<Meal | null>(`https://app-blog-f76a2-default-rtdb.firebaseio.com/meal/${id}.json`)
      .pipe(map(result => {
        if(!result) return  null;
        return new Meal(id, result.mealTime, result.description, result.calories, result.date);
      }))
  }

  editData(meal: Meal) {
    this.mealLoading.next(true);
    const body = {
      mealTime: meal.mealTime,
      description: meal.description,
      calories: meal.calories,
    }
    return this.http.put(`https://app-blog-f76a2-default-rtdb.firebaseio.com/meal/${meal.id}.json`, body).pipe(
      tap(() => {
        this.mealLoading.next(false);
      }, () => {
        this.mealLoading.next(false);
      })
    )
  }

  onRemove(id: string){
   this.removing.next(true);
    return this.http.delete(`https://app-blog-f76a2-default-rtdb.firebaseio.com/meal/${id}.json`).pipe(
      tap(() => {
        this.removing.next(false);
      }, () => {
        this.removing.next(false);
      }))
      .subscribe(() => {
        this.getData();
      });
  }
}
