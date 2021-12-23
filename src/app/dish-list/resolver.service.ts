import { MealService } from '../shared/meal.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { Meal } from '../shared/meal.model';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ResolverService implements Resolve<Meal>{
  constructor(private mealService: MealService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Meal> | Observable<never> {
    const id = <string>route.params['id'];
    return this.mealService.getMeal(id).pipe(mergeMap(meal => {
      if(meal) {
        return of(meal);
      }else {
        return EMPTY;
      }
    }));
  }
}
