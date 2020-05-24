import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthSignUpData } from './auth.service';
import { Subscribable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService:AuthService,
              private router:Router,
              private route:ActivatedRoute) { }


  error:string = null;
  isLoginMode:boolean = true;
  isLoading = false;

  ngOnInit(): void {
  }

  private errorTimeout(){
    setTimeout(()=>{
      this.error = null;
    },7000)
  }

  clearError(){
    this.error = null;
  }
  onSubmit(f:NgForm){
    if(f.valid){
      const password = f.value.password;
      const email = f.value.email;
      this.isLoading = true;
      let authSub:Subscribable<AuthSignUpData>;
      if(this.isLoginMode){
        authSub = this.authService.signIn(email,password);
      }else{
        authSub = this.authService.signUp(email,password);
      }
      authSub.subscribe(respond=>{
        this.isLoading = false;
        this.router.navigate(['../recipe'],{relativeTo:this.route})
      },error=>{
        this.error = error;
        this.isLoading = false;
        this.errorTimeout();
      });
    }else{
      this.error = 'Please submit a valid form.'
      this.errorTimeout();
    }
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
}
