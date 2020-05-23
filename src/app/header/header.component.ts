import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataService:DataStorageService, private recipeService:RecipeService) { }

  ngOnInit(): void {
  }
  onSaveRecipe(){
    this.dataService.saveRecipe();
  }

  onFetchRecipe(){
    this.dataService.retreiveRecipes().subscribe();
  }
}
