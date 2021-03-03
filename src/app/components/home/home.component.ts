import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { GetBlogsService } from '../get-blogs.service';
import { UserService } from '../user.service';
import { Blog } from './blog.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  allBlogs:Blog[]=[];

  userSub: Subscription;

  @Output() readBlog = new EventEmitter<Blog>();


constructor(config: NgbCarouselConfig, private route: Router,
  private getBlogsService: GetBlogsService,private authService: AuthService,
  private userService: UserService
  ) {  
    config.interval = 2000;  
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = false;  
  }  

  ngOnInit(): void {

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;

    let username='';
    this.userSub = this.authService.user.subscribe(user=>{
      username = user.username;
    });
    this.userService.getUserDetails(username);

    // this.getAllBlogs();
  }

  // getAllBlogs(){
  //   if(this.getBlogsService.blogs.length==0){
  //   this.getBlogsService.getAllBlogs()
  //   .subscribe(
  //     blogs =>{
  //       this.allBlogs = blogs;
  //       console.log(blogs);
  //     }
  //   );
  //   }
  //   else
  //     this.allBlogs = this.getBlogsService.blogs;
  // }

  // getUser(){
  //   this.userSub = this.authService.user.subscribe(user=>{
  //       if(user)
  //       {
  //         return user;
  //       }
  //       else{
  //         window.alert("Login First");
  //         this.route.navigate(['auth']);
  //       }
  //   });
  // }

  // onSaveBlog(event){
  //   this.getUser();
  //   //Save Blog To User Saved Items
  // }

  // onReadBlog(obj:Blog){
  //   console.log(obj);
  //   this.readBlog.emit(obj);
  // }

  // onLike(obj: {id:string, incorDecLikeBy: Number}){

  //   console.log("Object : ");
  //   console.log(obj);
  //   console.log(obj.id);
  //   console.log(obj.incorDecLikeBy);
    
    
  //   this.allBlogs = this.getBlogsService.likeBlog(obj.id,+obj.incorDecLikeBy);
    
  //   console.log("Blogs Updated With Likes");
  //   console.log(this.allBlogs);

  // }

  // onDislike(obj: {id:string, incorDecDislikeBy: Number}){

  //   console.log("Object : ");
  //   console.log(obj);
  //   console.log(obj.id);
  //   console.log(obj.incorDecDislikeBy);
  //   this.allBlogs = this.getBlogsService.dislikeBlog(obj.id,+obj.incorDecDislikeBy);
   
  //   console.log(this.allBlogs);

  // }

}
