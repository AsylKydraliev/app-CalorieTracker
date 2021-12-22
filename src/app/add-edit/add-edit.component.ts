import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Meal } from '../shared/meal.model';
import { MealService } from '../shared/meal.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  constructor(private mealService: MealService) { }

  ngOnInit() {
  }

  createMeal() {
    const newMeal = new Meal(
      this.form.value.mealTime,
      this.form.value.description,
      this.form.value.calories
    );
    this.mealService.postData(newMeal);
  }
}
