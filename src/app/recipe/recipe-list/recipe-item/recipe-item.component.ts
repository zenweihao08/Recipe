import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/shared/recipe.service';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit,OnDestroy {
  recipes:Recipe[];
  recipeSub:Subscription;
  constructor(private recipeService:RecipeService,
     private slService:ShoppingListService,
     private router:Router,
     private route:ActivatedRoute, private dataService:DataStorageService
     ) {
   }
  ngOnInit(): void {
    this.dataService.retreiveRecipes().subscribe();
    this.recipes = this.recipeService.getRecipes();
    this.recipeSub = this.recipeService.recipeSub.subscribe(
      (recipe:Recipe[])=>{
        this.recipes = recipe;
      }
    )
  }
  ngOnDestroy(){
    this.recipeSub.unsubscribe();
  }
  addIngs(id:number){
    this.slService.addIngs(this.recipes[id].ingredient)
  }

  onDelete(index:number){
    this.recipeService.deleteRecipe(index);
    this.router.navigate(['../'],{relativeTo:this.route})
  }

}
