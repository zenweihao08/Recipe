import { Injectable, Output, EventEmitter} from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { Ingredient } from './ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  @Output() recipeDetail = new EventEmitter<Recipe>();
  @Output() recipeSub = new Subject<Recipe[]>();

  constructor(private slService:ShoppingListService){};

  private recipes: Recipe[] = [];

  setRecipes(recipes){
    this.recipes = recipes;
    this.recipeSub.next(this.recipes.slice());
  }

  getRecipe(index:number){
    return this.recipes[index];
  }

  addNewIngredients(ing:Ingredient[]){
    this.slService.addIngs(ing);
  }

  getRecipes(){
    return this.recipes.slice();
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeSub.next(this.getRecipes())
  }

  updateRecipe(index:number,recipe:Recipe){
    this.recipes[index] = recipe;
    this.recipeSub.next(this.getRecipes())
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeSub.next(this.getRecipes())
  }
}
