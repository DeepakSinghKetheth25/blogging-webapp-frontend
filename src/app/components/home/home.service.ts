import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:3000/blogs';

  // getAllBlogs(): Observable<any>{

  // return this.http.get(`${this.uri}`)
  // .pipe(
  //   map(responseData=>{
  //     const blogs=[];
      
  //     for(const key in responseData){
  //       if(responseData.hasOwnProperty(key))
  //         blogs.push({...responseData[key]});
  //     }
  //     return blogs;
  //   }));

  // }


}
