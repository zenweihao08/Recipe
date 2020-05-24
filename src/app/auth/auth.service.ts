import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';


export interface AuthSignUpData{
    kind:string,
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}


@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient,
                private router:Router) { }
    
    user = new BehaviorSubject<User>(null);
    private catchErr(error:HttpErrorResponse){
        let errorMessage:string;
        if(!error.error||!error.error.error.message){
            errorMessage = "An error occured."
            return throwError(errorMessage);
        }else{
            switch(error.error.error.message){ 
                case 'EMAIL_EXISTS':
                    errorMessage = 'The email address is already in use by another account.';
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    errorMessage = "Password sign-in is disabled for this project.";
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = "The password is invalid or the user does not have a password.";
                    break;
                case 'USER_DISABLED':
                    errorMessage = "The user account has been disabled by an administrator.";
                    break;
              }
        }
        return throwError(errorMessage);
    }

    private handleAuthentication(email:string,id:string,token:string,expiryDate:string){
        const expiresAfter = new Date(new Date().getTime() + +expiryDate*1000);
        const user = new User(email,id,token,expiresAfter);
        this.user.next(user);
    }

    signUp(email:string,password:string){
        return this.http.post<AuthSignUpData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAM3W0IRxe4EaWRJFuhNq3D3B3OfkGSnyQ",
        {
            'email':email,
            'password':password,
            'returnSecureToken':true
        }).pipe(catchError(this.catchErr),tap(resData=>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,resData.expiresIn);
        }));
    }

    signIn(email:string,password:string){
        return this.http.post<AuthSignUpData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAM3W0IRxe4EaWRJFuhNq3D3B3OfkGSnyQ"
            ,
        {
            'email':email,
            'password':password,
            'returnSecureToken':true
        }).pipe(catchError(this.catchErr),tap(resData=>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,resData.expiresIn);
        }));
    }

    signOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
    }
}