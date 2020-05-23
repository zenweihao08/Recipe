import { Component, OnInit } from '@angular/core';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ShoppingListComponent]
})
export class AppComponent implements OnInit {
  title = 'Pro';
  recipe:boolean = true;
  shopping:boolean = false;

  constructor(){
  }

  ngOnInit(){
  }
  
}
