import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateBlogService {
  

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:3000/blogs'


  createBlog(obj: {
     title: string; 
     description: string; 
     category: string; 
     externalLink: string;
     author:string;
     likes: number;
     dislikes:number;
    }) : Observable<any> {
    console.log("Sending req");
    return this.http.post(`${this.uri}`,obj);
  }


}
