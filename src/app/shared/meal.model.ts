export class Meal{
  constructor(
    public id: string,
    public mealTime: string,
    public description: string,
    public calories: number,
    public date: number,
  ) {}
}
