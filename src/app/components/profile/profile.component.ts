import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ProfileDetails } from './profile.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  profileDetails: ProfileDetails

  profileEdit=false;
  name='';
  username='';
  street='';
  city='';
  state='';
  country='';
  isLoading=false;
  message='';

  ngOnInit(): void {
    this.isLoading=true;
    setTimeout(() => {
      this.profileDetails = this.userService.userDetails;
      this.name = this.profileDetails.name?this.profileDetails.name:'';
      this.username = this.profileDetails.username;
      this.street = this.profileDetails.address?this.profileDetails.address.street:'';
      this.city = this.profileDetails.address?this.profileDetails.address.city:'';
      this.state = this.profileDetails.address?this.profileDetails.address.state:'';
      this.country = this.profileDetails.address?this.profileDetails.address.country:'';
  
      console.log("Profile Details");
      console.log(this.userService.userDetails); 
      this.isLoading=false;
    }, 500);

  }

  onEdit(){
    this.profileEdit=!this.profileEdit;
  }

  onSaveChanges(){

console.log(this.name);

    this.userService.updateUserDetails(
      {
        username: this.username,
        name: this.name,
        address: {
          street: this.street,
          city: this.city,
          state: this.state,
          country: this.country,
        }
      }
    ).subscribe(responseData=>{
      console.log("After Updating");
      console.log(responseData);
    });

    this.profileEdit=!this.profileEdit;
    this.message='Profile Updated !'

    setTimeout(() => {
      this.message='';      
    }, 2000);

    

  }





}
