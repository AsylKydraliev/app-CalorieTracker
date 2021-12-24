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
  newDate = '';

  constructor(private mealService: MealService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getNewDate();
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
          date: this.newDate,
        })
      }
    })
  }

  getNewDate(){
    const newDate = (date: string | number) => {
      let date1 = new Date(date),
        month = '' + (date1.getMonth() + 1),
        day = '' + date1.getDate(),
        year = date1.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    }
    return this.newDate = newDate(new Date().toString());
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
