import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { GetBlogsService } from '../get-blogs.service';
import { Blog } from '../home/blog.model';
import { UserService } from '../user.service';
import { UserDetails } from './user-details.interface';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

allBlogs: Blog[]=[];
mainBlog:Blog;

userSub: Subscription;
isLoading=false;
username: string='';

isLiked=false;
isDisliked=false;
isSaved=false;
userDetails: UserDetails;

constructor(private getBlogsService : GetBlogsService,private userService : UserService, private route: Router, private authService:AuthService){}

ngOnInit() : void{

  this.allBlogs.length=0
  this.isLoading = true;
  this.getAllBlogs();
}


  getAllBlogs(){
      this.allBlogs.length=0;
      console.log(this.allBlogs);
      this.getBlogsService.getAllBlogs()
      .subscribe(blogs=>{
      this.allBlogs = blogs;
      this.mainBlog = this.allBlogs[0];
        console.log(this.allBlogs);
      this.getCurrentUserDetails();

      this.isLoading = false;
     });
  }

  getmainBlogDetails(){

    this.isLiked = this.userDetails.likedBlogs.includes(this.mainBlog._id);
    this.isDisliked=this.userDetails.dislikedBlogs.includes(this.mainBlog._id);
    this.isSaved = this.userDetails.savedBlogs.includes(this.mainBlog._id);
    console.log( this.isLiked+ ":" + this.isDisliked + ":" + this.isSaved );
  }

   getCurrentUserDetails(){
    this.isLoading=true;
    this.userSub =  this.authService.user.subscribe(user=>{
      this.username = user.username;
    });


      console.log("User DEtails printing")
       this.userService.getUserDetails(this.username).subscribe(
        userDetails=> {
        this.userDetails=userDetails;

        this.isLiked = this.userDetails.likedBlogs.includes(this.mainBlog._id);
        this.isDisliked=this.userDetails.dislikedBlogs.includes(this.mainBlog._id);
        this.isSaved = this.userDetails.savedBlogs.includes(this.mainBlog._id);
        console.log( this.isLiked+ ":" + this.isDisliked + ":" + this.isSaved );
        })
    
      this.isLoading=false;
  }



  onLike(obj: {blog_id:string, incorDecLikeBy: number,currentUsername :string}){
    
    console.log("onLike obj received");
    console.log(obj);

    this.getBlogsService.likeBlog({id:obj.blog_id, incorDecLikeBy: obj.incorDecLikeBy})
    .subscribe(responseData=>{
      console.log(responseData);
      console.log("REsponse After Inc/Dec Likes");


    },  
      error=>{
        console.log(error);
        window.alert("Error while Inc/Dec Likes");
      }
    );

    // Add liked blog_id in current user liked blogs
    this.userService.updateUserLikedBlogs({id: obj.blog_id, currentUsername: obj.currentUsername, incorDecLikeBy: obj.incorDecLikeBy})
    .subscribe(responseData=>{
      console.log("Response After Updating User Liked List");
      console.log(responseData);
      

    },
    error=>{
      console.log(error);
      window.alert("Error While Updating User Liked List");
    });

      this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.route.navigate(['/blogs']); 
        // navigate to same route
      });
  }

  onDislike(obj: {blog_id:string, incorDecDislikeBy: number,currentUsername :string}){

    this.getBlogsService.dislikeBlog({id:obj.blog_id, incDecDislikeBy: obj.incorDecDislikeBy})
    .subscribe(
      responseData=>{
        console.log("Response After Inc/Dec Dislikes");
        console.log(responseData);
      },
      error=>{
        console.log(error);
        window.alert("Error while Inc/Dec The Dislikes");
      }
    );

    // Add liked blog_id in current user liked blogs
    this.userService.updateUserDislikedBlogs({id: obj.blog_id, currentUsername: obj.currentUsername, incDecDislikeBy: obj.incorDecDislikeBy})
    .subscribe(responseData=>{
      console.log("Response After Updating User Disliked List");
      console.log(responseData);

    },
    error=>{
      window.alert("Error While Updating User Disliked List");
    })

      this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.route.navigate(['/blogs']); 
        // navigate to same route
      });


    console.log("Blogs Updated With Dislikes");
    console.log(this.allBlogs);

  }


  onReadBlog(blog: Blog){
    this.mainBlog=null;
    this.mainBlog = blog;
    this.getmainBlogDetails();
    document.body.scrollTop = 0; 
    // For Safari
    document.documentElement.scrollTop = 0;
  }


  onSaveBlog(obj:{blog_id:string, currentUsername: string}){

    this.isLoading=true;

    this.userService.saveBlog({id:obj.blog_id, currentUsername: obj.currentUsername})
    .subscribe(
      responseData=>{
        console.log(responseData);
        this.isLoading = false
      },
      error=>{
        console.log(error);
        window.alert("Error While saving Post ");
        } 
    );
    
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/blogs']); 
      // navigate to same route
    });

  }


  onAddComment(newComment: {username: string,date: Date,comment: string}){

    this.getBlogsService.addNewComment(this.mainBlog._id,newComment).subscribe(
      responseData=>{
        console.log(responseData);
      },
      error=>{
        console.log(error);
      }
    );
    
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/blogs']); 
      // navigate to same route
    });

  }

}