import { Component, OnDestroy, OnInit } from '@angular/core';
import { MealService } from '../shared/meal.service';
import { Subscription } from 'rxjs';
import { Meal } from '../shared/meal.model';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit, OnDestroy {
  meals!: Meal[];
  mealsChangeSubscription!: Subscription;
  mealsRemoveSubscription!: Subscription;
  mealsLoadingSubscription!: Subscription;
  removeLoading = false;
  loading = false;
  clickId = '';

  constructor(private mealsService: MealService) { }

  ngOnInit(){
    this.mealsChangeSubscription = this.mealsService.mealsChange.subscribe((meals: Meal[]) => {
      this.meals = meals;
    });
    this.mealsLoadingSubscription = this.mealsService.mealLoading.subscribe((isFetching: boolean) => {
      this.loading = isFetching;
    });
    this.mealsRemoveSubscription = this.mealsService.removing.subscribe((isRemoving: boolean) => {
        this.removeLoading = isRemoving;
    })
    this.mealsService.getData();
  }

  onRemove(id: string) {
    this.clickId = id;
    this.mealsService.onRemove(id);
  }

  ngOnDestroy(){
    this.mealsChangeSubscription.unsubscribe();
    this.mealsLoadingSubscription.unsubscribe();
  }
}
