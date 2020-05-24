import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  constructor(private dataService:DataStorageService,
              private authService:AuthService) { }

  

  public isAuthenticated:boolean = false;
  userSub:Subscription;
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
    })
  }

  onSaveRecipe(){
    this.dataService.saveRecipe();
  }

  onFetchRecipe(){
    this.dataService.retreiveRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  signOut(){
    this.authService.signOut();
  }
}
