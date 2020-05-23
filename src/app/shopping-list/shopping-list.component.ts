import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/shopping-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredient:Ingredient[];
  constructor(private shoppingListService:ShoppingListService){ 
  }

  private updateIngSub:Subscription;
  ngOnInit(): void {
      this.ingredient = this.shoppingListService.getIngs();
      this.updateIngSub = this.shoppingListService.updateIng.subscribe(()=>{
        this.ingredient = this.shoppingListService.getIngs();
      });
  }

  ngOnDestroy(): void {
    this.updateIngSub.unsubscribe();
  }

  onDelete(index:number){
    this.shoppingListService.deleteIng(index);
  }
  
  onEdit(index:number){
    this.shoppingListService.editIng.next(index);
  }

}
