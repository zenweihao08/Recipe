import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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
    private tokenExpirationTimer; 
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
        this.autoLogOut(+expiryDate*1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }

    signUp(email:string,password:string){
        return this.http.post<AuthSignUpData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.firebaseAPIKEY,
        {
            'email':email,
            'password':password,
            'returnSecureToken':true
        }).pipe(catchError(this.catchErr),tap(resData=>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,resData.expiresIn);
        }));
    }

    signIn(email:string,password:string){
        return this.http.post<AuthSignUpData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.firebaseAPIKEY
            ,
        {
            'email':email,
            'password':password,
            'returnSecureToken':true
        }).pipe(catchError(this.catchErr),tap(resData=>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,resData.expiresIn);
        }));
    }

    autoLogin(){
        const userData:{email:string,userLocalId:string,_token:string,_tokenExpiryDate:string} = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return null;
        }
        const loadedUser = new User(userData.email,userData.userLocalId,userData._token,new Date(userData._tokenExpiryDate));
        if(loadedUser.token){
            this.user.next(loadedUser);
            this.autoLogOut(new Date(userData._tokenExpiryDate).getTime()-new Date().getTime());
        }
    }

    autoLogOut(expirationTime:number){
        console.log(expirationTime);
        this.tokenExpirationTimer = setTimeout(()=>{
            this.signOut();
        },expirationTime);
    }

    signOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}