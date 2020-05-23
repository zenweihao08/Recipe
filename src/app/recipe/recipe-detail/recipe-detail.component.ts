import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  constructor(private recipeService:RecipeService,private router:Router, private route:ActivatedRoute) {
    const id = +this.route.snapshot.params['id'];
    this.recipe = this.recipeService.getRecipe(id);
    this.route.params.subscribe((params:Params)=>{
      this.recipe = this.recipeService.getRecipe(+params['id']);
    })
  }
  ngOnInit(): void {
  }
}
