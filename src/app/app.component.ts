import { Component } from '@angular/core';
import { AuthService } from './components/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blogging-app';

  constructor(private authService:AuthService){}

  ngOnInit(): void{
    console.log("AutoLogin Called");
    this.authService.autoLogin();
  }




}
