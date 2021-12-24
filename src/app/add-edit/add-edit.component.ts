import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Meal } from '../shared/meal.model';
import { MealService } from '../shared/meal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  @ViewChild('formMeal') form!: NgForm;
  isEdit = false;
  editId = '';
  meal : Meal | null = null;

  constructor(private mealService: MealService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.meal = <Meal | null>data.meal;
      if(this.meal){
        this.isEdit = true;
        this.editId = this.meal.id;
        this.setFormValue({
          mealTime: this.meal.mealTime,
          description: this.meal.description,
          calories: this.meal.calories,
          date: this.meal.date,
        })
      }else {
        this.isEdit = false;
        this.editId = '';
        this.setFormValue({
          mealTime: '',
          description: '',
          calories: '',
          date: '',
        })
      }
    })
  }

  setFormValue(value: {[key: string]: string | number}) {
    setTimeout(() => {
      this.form.form.setValue(value);
    })
  }

  saveMeal() {
    const id = this.editId || Math.random().toString();
    const newMeal = new Meal(
       id,
       this.form.value.mealTime,
       this.form.value.description,
       this.form.value.calories,
       this.form.value.date,
    );

    if(this.editId) {
      this.mealService.editData(newMeal).subscribe();
      this.mealService.getData();
    }else {
      this.mealService.postData(newMeal);
      this.mealService.getData();
      void this.router.navigate(['/']);
    }
  }
}
