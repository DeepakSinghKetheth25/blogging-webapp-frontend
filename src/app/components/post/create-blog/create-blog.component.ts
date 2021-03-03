import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { GetBlogsService } from '../../get-blogs.service';
import { CreateBlogService } from './create-blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  constructor(private blogForm: FormBuilder,private getBlogsService: GetBlogsService, private authService: AuthService, private route : Router) { }

  blogPostForm: FormGroup;

  userSub: Subscription;
  username : string;

  ngOnInit(): void {

    this.blogPostForm = this.blogForm.group({
      'title' : new FormControl('',Validators.required),
      'category' : new FormControl('',Validators.required),
      'externalLink' : new FormControl('',Validators.required),
      'description' : new FormControl('',Validators.required)
      })

      this.userSub =  this.authService.user.subscribe(user=>{
        this.username = user.username;
      });

  }


  onPostBlog(){

    console.log(this.blogPostForm);

    this.getBlogsService.createBlog(
      {
        title: this.blogPostForm.get('title').value,
        description: this.blogPostForm.get('description').value,
        category:this.blogPostForm.get('category').value,
        externalLink: this.blogPostForm.get('externalLink').value,
        likes : 0,
        author: this.username,
        dislikes : 0,

      }
    ).subscribe(responseData=>{
      console.log(responseData);
    },
    error=>{
      console.log(error);
    });

      this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.route.navigate(['/blogs']); // navigate to same route
      });


  }

}
