
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Blog } from '../../home/blog.model';
import { UserService } from '../../user.service';

const incLikeDislikeBy = 1;
const decLikeDislikeBy= -1;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {


  // @Input() blog:Blog;
  // @Output() blogToRead = new EventEmitter<Blog>();
  // @Output() likeBlog = new EventEmitter<{blog_id:string,incorDecLikeBy:Number,currentUsername:string}>();
  // @Output() dislikeBlog = new EventEmitter<{blog_id:string,incorDecDislikeBy:Number,currentUsername:string}>();
  // @Output() saveBlog = new EventEmitter<{blog_id:string,currentUsername:string}>();

  // userSub : Subscription;

  // isLiked = false;
  // isDisliked = false;
  // isSaved = false;
  // activeBlog = false;
  
  
  // constructor(private authService: AuthService, private route: Router,private userService: UserService) { 
  // }

  // currentUser; 
  // Store Current Username 
  // userDetails = this.userService.userDetails; 
  // Stores Current User Details


  /*
  ngOnInit(): void {

    console.log("Refresh Called");
    // console.log(this.blog);

    this.userSub = this.authService.user.subscribe(user=>{
      if(user)
      {
        this.currentUser = user.username;
        // this.userService.getUserDetails(this.currentUser);
        this.isLiked = this.userService.userDetails.likedBlogs.includes(this.blog._id);
        this.isDisliked = this.userService.userDetails.dislikedBlogs.includes(this.blog._id);
        this.isSaved = this.userService.userDetails.savedBlogs.includes(this.blog._id);
        console.log(this.blog._id+ " : " + this.isLiked+ ":" + this.isDisliked );
        return user;
      }
    });


  }

  getBlogsPage(){
      this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.route.navigate(['/blogs']); // navigate to same route
      });
  }

  onLike(blog_id:string){
    console.log("Printing the like status");
    console.log(blog_id);
    console.log(this.isLiked);
    console.log("Status Printed");
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
      this.getBlogsPage();
      this.isLiked = !this.isLiked;

      setTimeout(() => {
        this.userService.getUserDetails(this.currentUser);        
      }, 1000);


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
        this.getBlogsPage();
      }
    else{
      this.dislikeBlog.emit(         //Emit To Make Changes in DB
        {
          blog_id : blog_id,
          currentUsername : this.currentUser,
          incorDecDislikeBy:incLikeDislikeBy,
        });
        this.getBlogsPage();
    }
      this.isDisliked = !this.isDisliked;
      
      setTimeout(() => {
        this.userService.getUserDetails(this.currentUser);        
      }, 1000);

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

    setTimeout(() => {
      this.userService.getUserDetails(this.currentUser);        
    }, 1000);

  }

  onReadBlog(obj:Blog){
    console.log("Emitted Blog: " );
    console.log(obj);
    this.blogToRead.emit(obj);
    this.activeBlog = true;
  }



}

*/

@Input() blog:Blog;
@Output() likeBlog = new EventEmitter<{blog_id:string,incorDecLikeBy:Number,currentUsername:string}>();
@Output() dislikeBlog = new EventEmitter<{blog_id:string,incorDecDislikeBy:Number,currentUsername:string}>();
@Output() saveBlog = new EventEmitter<{blog_id:string,currentUsername:string}>();
@Output() addComment = new EventEmitter<{username: string,date: Date,comment: string}>();

userSub : Subscription;

isLiked = false;
isDisliked = false;
isSaved = false;

comments: [{}];
userComment: '';


constructor(private authService: AuthService, private route: Router,private userService: UserService) { 
}

currentUser; //Store Current Username 
userDetails = this.userService.userDetails; // Stores Current User Details

   ngOnInit() {

    // console.log(this.blog);

    this.userSub = this.authService.user.subscribe( user=>{
      if(user)
      {
        this.currentUser = user.username;

        //  this.userService.getUserDetails(this.currentUser); //Getting Refreshed user 
        
        setTimeout(() => {
  
          this.isLiked = this.userService.userDetails.likedBlogs.includes(this.blog._id);
          this.isDisliked = this.userService.userDetails.dislikedBlogs.includes(this.blog._id);
          this.isSaved = this.userService.userDetails.savedBlogs.includes(this.blog._id);
  
          console.log(this.blog)
          console.log(this.blog._id+ " : " + this.isLiked+ ":" + this.isDisliked + ":" + this.isSaved );
          
        }, 100);
        
        return user;
      }
    });   
  }


  getBlogsPage(){
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/blogs']); // navigate to same route
    });
}

onLike(blog_id:string){

  console.log("Emitting");

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

  // setTimeout(() => {
  //   this.getBlogsPage();
  //   this.isLiked = !this.isLiked;    
  // }, 1000);

    // setTimeout(() => {
    //   this.userService.getUserDetails(this.currentUser);        
    // }, 1000);


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
      this.getBlogsPage();
    }
  else{
    this.dislikeBlog.emit(         //Emit To Make Changes in DB
      {
        blog_id : blog_id,
        currentUsername : this.currentUser,
        incorDecDislikeBy:incLikeDislikeBy,
      });
      this.getBlogsPage();
  }
    this.isDisliked = !this.isDisliked;
    
    // setTimeout(() => {
    //   this.userService.getUserDetails(this.currentUser);        
    // }, 1000);

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

  // setTimeout(() => {
  //   this.userService.getUserDetails(this.currentUser);        
  // }, 1000);

  this.isSaved = !this.isSaved;

}

// onReadBlog(obj:Blog){
//   this.blogToRead.emit(obj);
//   this.activeBlog = true;
// }


onAddComment(){

  if(!this.currentUser) //To Make Sure if User is Logged In
  {
    window.alert("Login To Continue");
    this.route.navigate(['auth']);
  }

  this.addComment.emit({
     username: this.currentUser,
      date: new Date(),
       comment: this.userComment}
  );



  // this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //   this.route.navigate(['/blogs']); // navigate to same route
  // });


}


}