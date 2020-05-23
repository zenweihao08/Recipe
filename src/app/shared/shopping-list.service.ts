import { Injectable, Output } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  @Output() updateIng = new Subject <Ingredient[]>();
  @Output() editIng = new Subject <number>();
  private ingredient: Ingredient[] = [
  ];
  
  getIngs(){
    return this.ingredient.slice();
  }

  addIng(ing:Ingredient){
    this.ingredient.push(ing);
    this.updateIng.next(this.ingredient.slice());
  }

  addIngs(ing:Ingredient[]){
    this.ingredient.push(...ing)
    this.updateIng.next(this.ingredient.slice());
  }
  clearAll(){
    this.ingredient = [];
    this.updateIng.next(this.ingredient.slice());
  }

  deleteIng(index:number){
    this.ingredient.splice(index,1);
    this.updateIng.next(this.ingredient.slice());
  }

  editIngredient(index,ing:Ingredient){
    this.ingredient[index] = ing;
    this.updateIng.next(this.ingredient.slice());
  }

  getIng(index:number){
    return this.ingredient[index];
  }
}
