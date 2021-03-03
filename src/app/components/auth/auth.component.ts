import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading=false;
  error: string = '';
  message: string= '';
  userSub: Subscription;
  currentUser='';

  constructor(
    private authService:AuthService, 
    private userService: UserService,
    private route : Router
    ) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid)
      return;


    this.isLoading = true;
    if(this.isLoginMode){

      this.authService.login(form.value.username, form.value.password)
      .subscribe(
        (responseData)=>{
          this.isLoading= false;
          this.route.navigate(['/']);

          console.log("Get User Subscription");
          this.userSub =  this.authService.user.subscribe(user=>{this.currentUser = user.username}); //Getting The Current User Details
        
        //Calling UserDetails
        // this.userService.getUserDetails(this.currentUser);
        // .subscribe(
        //   responseData=>{
        //     console.log("Current User Details");
        //   console.log(responseData);
        //   },
        //   error=>{
        //     console.log(error);
        //   }
        // );

        // this.userSub.unsubscribe();

        },
        error=>{
          this.isLoading = false;
          this.error = 'Login Error Occurred !';
          setTimeout(() => {
            this.error='';
          }, 2000);
        });

        

    }
    else{
      this.authService.signup(form.value.username,form.value.password)
      .subscribe(
        (responseData)=>{
          this.isLoading=false;
          this.message='Signup Successful. Login to Continue !';
          setTimeout(() => {
            this.message='';
          }, 2000);
        },
        error=>{

          console.log(error);

          this.isLoading=false;
          this.error='Signup Error Occurred !';

          setTimeout(() => {
            this.error='';
          }, 2000);
        });

        form.reset();
    }

  }


}
