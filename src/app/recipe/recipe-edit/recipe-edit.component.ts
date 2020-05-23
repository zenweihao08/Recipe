import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  constructor(private route:ActivatedRoute,
              private recipeService:RecipeService,
              private router:Router) { }
  newRecipe:Recipe;
  recipe_form:FormGroup;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = + params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }
  onSubmit(){
      let name = this.recipe_form.get('recipe_name').value;
      let description = this.recipe_form.get('recipe_description').value;
      let imgPath = this.recipe_form.get('recipe_image').value;
      let ing = this.recipe_form.get('recipe_ing').value;
    if(this.editMode){
      this.newRecipe = new Recipe(name,description,imgPath,ing);
      this.recipeService.updateRecipe(this.id,this.newRecipe)
    }else{
      this.newRecipe = new Recipe(name,description,imgPath,ing);
      this.recipeService.addRecipe(this.newRecipe);
    }
    this.router.navigate(['../'],{relativeTo:this.route})
  };

  onNavigate(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  onAddIng(){
    const controlGroup = new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (<FormArray>this.recipe_form.get('recipe_ing')).push(controlGroup);
  };

  onDeleteIng(i:number){
    (<FormArray>this.recipe_form.get('recipe_ing')).removeAt(i);
  }

  getControls(){
    return (<FormArray>this.recipe_form.get('recipe_ing')).controls;
  }

  private initForm(){
      let name = '';
      let description = '';
      let imageUrl = '';
      let ingredients = new FormArray([]);
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      description = recipe.description;
      imageUrl = recipe.imagePath;
      if(recipe['ingredient']){
        for(let ingredient of recipe.ingredient){
          ingredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,Validators.required),
              'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    this.recipe_form = new FormGroup({
      'recipe_name': new FormControl(name,[Validators.required]),
      'recipe_description': new FormControl(description,Validators.required),
      'recipe_image': new FormControl(imageUrl,Validators.required),
      'recipe_ing': ingredients
    })
  }
}
