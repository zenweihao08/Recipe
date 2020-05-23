import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  @ViewChild('f',{ static: false }) ingredientForm:NgForm;
  editMode:boolean = false;
  editedItem:Ingredient;
  subscription:Subscription;
  index:number;
  constructor(private shoppingListService:ShoppingListService) { }
  ngOnInit(){
    this.subscription = this.shoppingListService.editIng.subscribe(
      (index)=>{
        this.index = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIng(index);
        this.ingredientForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    )
  }

  onSubmit(){
    const name = this.ingredientForm.value['name'];
    const amount = this.ingredientForm.value['amount'];
    const newIngredient = new Ingredient(name,amount);
    if(this.editMode){
      this.shoppingListService.editIngredient(this.index,newIngredient);
    }else{
      this.shoppingListService.addIng(newIngredient);
    }
    this.editMode = false;
    this.ingredientForm.reset();
  }

  onClear(){
    this.shoppingListService.clearAll();
  }

}
