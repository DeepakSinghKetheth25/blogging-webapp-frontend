import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:3000/blogs'

  likeBlog(id:Number){
    this.http.put(`${this.uri}`,id);
  
  }

  dislikeBlog(id:Number){

  }


}
