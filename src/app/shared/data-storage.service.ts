import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from './recipe.service';
import { map,tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class DataStorageService {
    constructor(private http:HttpClient, private recipeService:RecipeService) { }
    
    saveRecipe() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://recipev2.firebaseio.com/recipes.json',recipes).subscribe(response => {
            console.log(response);
        });
    }

    retreiveRecipes(){
        return this.http.get<Recipe[]>('https://recipev2.firebaseio.com/recipes.json').pipe(
            map(recipes => {
                return recipes.map(recipe =>{
                    return {...recipe,ingredient: recipe.ingredient?recipe.ingredient:[]}
                })
            }),tap(recipes=>{
                this.recipeService.setRecipes(recipes);
            })
        )
    };
}