import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetBlogsService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:3000/blogs';

  

   blogs=[];


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

  getAllBlogs(): Observable<any>{

    this.blogs.length=0;
  return this.http.get(`${this.uri}`)
  .pipe(
    map(responseData=>{
      for(const key in responseData){
        if(responseData.hasOwnProperty(key))
          this.blogs.push({...responseData[key]});
      }
      return this.blogs;
    }));

  }

  likeBlog(obj: {id:string, incorDecLikeBy: number}): Observable<any>{
    //Update in Backend
    console.log("Printing Id : ");
    console.log(obj.id);
    return this.http.put(`${this.uri}/like/${obj.id}`,{incorDecLikeBy: obj.incorDecLikeBy});
  }

  dislikeBlog(obj: {id:string,incDecDislikeBy:number}): Observable<any>{
    //Update In the Backend
    return this.http.put(`${this.uri}/dislike/${obj.id}`,{incorDecDislikeBy: obj.incDecDislikeBy});
  }

  addNewComment(id: string,newComment:{username: string, date: Date, comment: string}): Observable<any>{

    return this.http.put(`${this.uri}/comment/${id}`,newComment);

  }

  


}
