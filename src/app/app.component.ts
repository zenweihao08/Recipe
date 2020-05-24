import { Component, OnInit } from '@angular/core';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ShoppingListComponent]
})
export class AppComponent implements OnInit {
 
  constructor(private authService:AuthService){
  }

  ngOnInit(){
    this.authService.autoLogin();
  }
  
}
