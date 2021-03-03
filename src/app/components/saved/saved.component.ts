import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { GetBlogsService } from '../get-blogs.service';
import { Blog } from '../home/blog.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {

  constructor(private getBlogsService: GetBlogsService,private authService: AuthService,
    private userService: UserService, private route: Router) { }

  savedBlogsIds=[];
  savedBlogs : Blog[]=[];
  allBlogs: Blog[]=[];
  mainBlog: Blog;

  username='';
  userSub: Subscription;
  isLoading=false;

  isLiked=false;
  isDisliked=false;
  message = '';

  comments=[{}];
  userComment='';


  ngOnInit(): void {

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    
    this.isLoading=true;
    this.savedBlogs.length=0;
    this.allBlogs.length=0;
    this.savedBlogsIds.length=0;
    this.mainBlog=null;



    console.log("USer: ");
    // console.log(this.userService.userDetails._id);

    // this.getSavedBlogs();
     setTimeout(() => {
      this.getSavedBlogs();  
      this.isLoading=!!this.mainBlog;

      console.log(this.savedBlogsIds);
        console.log(this.allBlogs);
        console.log(this.savedBlogs);
    }, 1000);
  }

  async getSavedBlogs(){

    if(this.userService.userDetails)
      {
        this.savedBlogsIds = this.userService.userDetails.savedBlogs;
        if(this.savedBlogsIds.length == 0){
          this.message = 'No Saved Blogs';
          return ;
        }
        this.username = this.userService.userDetails.username;
      }
    else{
      console.log("Doesn't exist")
      this.userSub = this.authService.user.subscribe(user=>{
        if(user)
        {
          this.username = user.username;
        }
      });

      this.userService.getUserDetails(this.username);
      this.savedBlogsIds = this.userService.userDetails.savedBlogs;
    }


    await this.getBlogsService.getAllBlogs().
    subscribe(
      blogs=>{
        this.allBlogs=blogs;

        this.savedBlogsIds.forEach(id=>{
          this.savedBlogs.push(this.allBlogs.find(element=> element._id==id));
        });

        this.mainBlog = this.savedBlogs[0];
        this.comments = this.mainBlog.comments;
        
        this.isLiked = this.userService.userDetails.likedBlogs.includes(this.mainBlog._id);
        this.isDisliked = this.userService.userDetails.dislikedBlogs.includes(this.mainBlog._id);

        console.log(this.isDisliked +":"+this.isLiked);
        console.log(this.mainBlog);  
        console.log(this.comments);
    });
  }


  onLike(id: string){

    console.log("Liked Blogs: " + id);

    let incorDecLikeBy:number;
    if(this.isLiked==true)
      incorDecLikeBy=-1;
    else
      incorDecLikeBy = 1;

      console.log(incorDecLikeBy);

    const obj= {blog_id: id, incorDecLikeBy: incorDecLikeBy, currentUsername: this.username };

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

    //Add liked blog_id in current user liked blogs
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
        this.route.navigate(['/saved']); // navigate to same route
      });
    console.log("Blogs Updated With Likes");
    console.log(this.allBlogs);

    console.log("Printing The Username")
    console.log(this.username);

    this.userService.getUserDetails(this.username);
  }


  onDislike(id: string){

    let incorDecDislikeBy:number;
    if(this.isDisliked==true)
      incorDecDislikeBy=-1;
    else
      incorDecDislikeBy = 1;

    const obj= {blog_id: id, incorDecDislikeBy: incorDecDislikeBy, currentUsername: this.username };

    this.getBlogsService.dislikeBlog({id:obj.blog_id, incDecDislikeBy: obj.incorDecDislikeBy})
    .subscribe(responseData=>{
      console.log(responseData);
      console.log("REsponse After Inc/Dec Likes");
    },  
      error=>{
        console.log(error);
        window.alert("Error while Inc/Dec Likes");
      }
    );

    //Add liked blog_id in current user liked blogs
    this.userService.updateUserDislikedBlogs({id: obj.blog_id, currentUsername: obj.currentUsername, incDecDislikeBy: obj.incorDecDislikeBy})
    .subscribe(responseData=>{
      console.log("Response After Updating User Liked List");
      console.log(responseData);
    },
    error=>{
      console.log(error);
      window.alert("Error While Updating User Liked List");
    });

      this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.route.navigate(['/saved']); // navigate to same route
      });
    console.log("Blogs Updated With disliked");
    console.log(this.allBlogs);

    this.userService.getUserDetails(this.username);
  }

  onReadBlog(blog: Blog){
    this.mainBlog = blog;
    this.comments = this.mainBlog.comments;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }


  async onUnsaveBlog(id: string){

    console.log("Saved Clicked");

    const obj={blog_id: id, currentUsername: this.username} ;

    this.isLoading=true;
    await this.userService.saveBlog({id:obj.blog_id, currentUsername: obj.currentUsername})
    .subscribe(
      responseData=>{
        console.log(responseData);
        this.userService.getUserDetails(this.username);
        this.isLoading=false
      },
      error=>{
        console.log(error);
        window.alert("Error While saving Post ");
        } 
    );

    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/saved']); // navigate to same route
    });

    // setTimeout(() => {
    //   this.isLoading=false

      
    // }, 2000);


  }




  onAddComment(){
  const newComment={ username: this.username, date: new Date(), comment: this.userComment};
  this.getBlogsService.addNewComment(this.mainBlog._id,newComment).subscribe(
    responseData=>{
      console.log(responseData);
    }
  );

  this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.route.navigate(['/saved']); // navigate to same route
  });

  }


}