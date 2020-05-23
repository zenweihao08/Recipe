import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from './recipe.service';
import { map,tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})

export class DataStorageService {
    constructor(private http:HttpClient, private recipeService:RecipeService,private authService:AuthService) { }
    
    saveRecipe() {
        const recipes = this.recipeService.getRecipes();
        return this.authService.user.pipe(take(1),exhaustMap(user=>{
            return this.http.put('https://recipev2.firebaseio.com/recipes.json',recipes,{
                params: new HttpParams().set('auth',user.token)
            })
        }))
    };

    retreiveRecipes(){ 
        return this.authService.user.pipe(take(1),exhaustMap(user=>{
            return this.http.get<Recipe[]>('https://recipev2.firebaseio.com/recipes.json',
            {
             params: new HttpParams().set('auth',user.token)   
            });
        }),map(recipes => {
            return recipes.map(recipe =>{
                return {...recipe,ingredient: recipe.ingredient?recipe.ingredient:[]}
            })
        }),tap(recipes=>{
            this.recipeService.setRecipes(recipes);
        }));
        
    };
}