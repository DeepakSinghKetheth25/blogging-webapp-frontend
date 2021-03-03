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


constructor(config: NgbCarouselConfig,private getBlogsService : GetBlogsService) {    
  }  

  ngOnInit(): void {

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    


  }
}
