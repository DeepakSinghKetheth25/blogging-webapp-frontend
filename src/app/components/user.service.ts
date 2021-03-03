import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

interface userDetails {
  _id :string;
  username: string;
  name:string;
  likedBlogs:string[];
  dislikedBlogs:string[];
  savedBlogs:string[];
  address:{
    street: string;
    city: string;
    state: string;
    country: string;
} ; 
}


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }
  uriUser='http://localhost:3000/auth';

  userDetails : userDetails ; // Stores All User Details

  updateUserDislikedBlogs(obj: {id: string, currentUsername: string, incDecDislikeBy: number}): Observable<any>{
    return this.http.put(`${this.uriUser}/updatedislikedblogs/${obj.id}`,{currentUsername: obj.currentUsername, incDecDislikeBy: obj.incDecDislikeBy});
  }

  updateUserLikedBlogs(obj: {id: string, currentUsername: string, incorDecLikeBy: number}): Observable<any>{
    return this.http.put(`${this.uriUser}/updatelikedblogs/${obj.id}`,{currentUsername: obj.currentUsername, incorDecLikeBy: obj.incorDecLikeBy});
  }

  saveBlog(obj: {id:string, currentUsername: string }): Observable<any>{
    return this.http.put(`${this.uriUser}/save/${obj.id}`,{currentUsername: obj.currentUsername})
  }


  getUserDetails(currentUsername: string){
    console.log("Get User DEtails Called")
    this.http.post(`${this.uriUser}/userdetails`,{currentUsername : currentUsername}).subscribe(
       responseData=>{ 
        this.userDetails = JSON.parse(JSON.stringify(responseData));
        console.log(this.userDetails);
        console.log(this.userDetails._id );
         }
        );
  }


  updateUserDetails(
    obj: { 
      username: string,
      name: string; 
      address: {  
        street: string; 
        city: string; 
        state: string; 
        country: string; 
      } 
    }) :Observable<any>
  {
    console.log(obj);
    console.log("Sending Req To backend");
    return  this.http.put(`${this.uriUser}/update/userDetails`,obj);
  }

}
