
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Blog } from '../../home/blog.model';
import { UserService } from '../../user.service';
import { UserDetails } from '../user-details.interface';

const incLikeDislikeBy = 1;
const decLikeDislikeBy= -1;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

@Input() blog:Blog;
@Input() isLiked;
@Input() isDisliked;
@Input() isSaved;
@Output() likeBlog = new EventEmitter<{blog_id:string,incorDecLikeBy:Number,currentUsername:string}>();
@Output() dislikeBlog = new EventEmitter<{blog_id:string,incorDecDislikeBy:Number,currentUsername:string}>();
@Output() saveBlog = new EventEmitter<{blog_id:string,currentUsername:string}>();
@Output() addComment = new EventEmitter<{username: string,date: Date,comment: string}>();

userSub : Subscription;

comments: [{}];
userComment: '';


constructor(private authService: AuthService, private route: Router,private userService: UserService) { 
}

currentUser; //Store Current Username 

  ngOnInit() {
    this.userSub = this.authService.user.subscribe( user=>{
      if(user)
      {
        this.currentUser = user.username;
        return user;
      }});   
  }

  ngDestroy(){
    this.userSub.unsubscribe();
  }


  getBlogsPage(){
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/blogs']); // navigate to same route
    });
  }

  onLike(blog_id:string){

    if(!this.currentUser) //To Make Sure if User is Logged In
      {
        window.alert("Login To Continue");
        this.route.navigate(['auth']);
      } 
    else{

      if(this.isLiked){
        this.likeBlog.emit(    //Emit To Make Changes in DB
          {
            blog_id : blog_id,
            incorDecLikeBy: decLikeDislikeBy,
            currentUsername : this.currentUser,
          });
      }
      else{
        this.likeBlog.emit(    //Emit To Make Changes in DB
        {
          blog_id : blog_id,
          incorDecLikeBy:incLikeDislikeBy,
          currentUsername : this.currentUser,
        });
      }

      this.isLiked=!this.isLiked;
      this.getBlogsPage();
    }
  }

onDislike(blog_id:string){

  if(!this.currentUser) //To Make Sure if User is Logged In
    {
      window.alert("Login To Continue");
      this.route.navigate(['auth']);
    } 
  else{
    if(this.isDisliked){
      this.dislikeBlog.emit(      //Emit To Make Changes in DB
        {
          blog_id : blog_id,
          incorDecDislikeBy: decLikeDislikeBy,
          currentUsername : this.currentUser,
        });

  }
  else{
    this.dislikeBlog.emit(         //Emit To Make Changes in DB
      {
        blog_id : blog_id,
        currentUsername : this.currentUser,
        incorDecDislikeBy:incLikeDislikeBy,
      });

  }
  this.getBlogsPage();
  this.isDisliked = !this.isDisliked;
  }
}



onSaveBlog(blog_id:string){
   
  if(!this.currentUser) //To Make Sure if User is Logged In
   {
     window.alert("Login To Continue");
     this.route.navigate(['auth']);
   }
  
  this.saveBlog.emit({  //Emit To Make Changes in DB
    blog_id : blog_id,
    currentUsername: this.currentUser,
  })
  this.getBlogsPage();
  this.isSaved = !this.isSaved;
}

onAddComment(){

  if(!this.currentUser) //To Make Sure if User is Logged In
  {
    window.alert("Login To Continue");
    this.route.navigate(['auth']);
  }

  this.addComment.emit({
     username: this.currentUser,
      date: new Date(),
       comment: this.userComment
      });
      this.getBlogsPage();
    }

}