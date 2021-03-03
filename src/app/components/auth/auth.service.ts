import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { UserService } from '../user.service';
import { User } from './user.model';

interface SignupResponse{
  username:string;
}

interface LoginResponse{
  username:string;
  token:string;
  tokenExpiry:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri='http://localhost:3000/auth';
  tokenExpirationTimer: any;
  user = new BehaviorSubject<User>(null);


  constructor(private http: HttpClient,private userService: UserService,private route : Router) { }

  signup(username: any, password: any): Observable<any> {
    return this.http.post<SignupResponse>(`${this.uri}/signup`,
      {
        username : username,
        password : password,
      });
    }


  login(username: any, password: any): Observable<any> {
    return this.http.post<LoginResponse>(`${this.uri}/login`,
    {
      username : username,
      password : password,
    })
    .pipe(
      tap(responseData=>{
        const tokenExpiryDate : Date = new Date(new Date().getTime() + (+responseData.tokenExpiry));
        const user = new User(responseData.username,responseData.token,responseData.tokenExpiry,tokenExpiryDate);
        this.user.next(user);
        this.autoLogout(+responseData.tokenExpiry);
        localStorage.setItem('userData', JSON.stringify(user));
      }));


  }

  autoLogin(){
    const userData:{
      username: string;
      token:string;
      tokenExpiry: string;
      tokenExpirationDate: Date; 
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData)
      return ;

      console.log("AutoLogin User Exists");

    const loadedUser = new User(userData.username,userData.token,userData.tokenExpiry,userData.tokenExpirationDate);

    if(loadedUser.getToken()){
      this.user.next(loadedUser);
      //Updating Token Expiration Time
      
      
      this.userService.getUserDetails(userData.username);//To get User Details From DB
      
      const expirationDateinMilliSec = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDateinMilliSec); 
    }
  }



  autoLogout(tokenExpiration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, tokenExpiration);
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.route.navigate(['/auth']);
  }

}
