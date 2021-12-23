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
  constructor(private mealService: MealService) {}

  ngOnInit(){
    this.mealService.mealsChange.subscribe((meals: Meal[]) => {
      this.meals = meals;
      this.calories = 0;
      this.meals.forEach((item: Meal) => {
        this.calories += item.calories;
      })
    })
    this.mealService.getData();
  }
}
