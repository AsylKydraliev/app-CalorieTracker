import { Component, OnInit } from '@angular/core';
import { MealService } from '../shared/meal.service';
import { Meal } from '../shared/meal.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  calories = 0;
  meals: Meal[] = [];
  dateFormat!: string | number;
  constructor(private mealService: MealService) {}

  ngOnInit(){
    this.getDateFormat();
    this.mealService.mealsChange.subscribe((meals: Meal[]) => {
      this.meals = meals;
      this.calories = 0;
      this.meals.forEach((item: Meal) => {
        if(item.date === this.dateFormat){
          this.calories += item.calories;
        }else{
          this.calories += 0;
        }
      })
    })
    this.mealService.getData();
  }

  getDateFormat(){
    const formatDate = (date: string) => {
      let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    }

    return this.dateFormat = formatDate(new Date().toString());
  }
}
