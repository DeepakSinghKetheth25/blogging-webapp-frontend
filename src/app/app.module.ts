import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SavedComponent } from './components/saved/saved.component';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BlogComponent } from './components/blogs/blog/blog.component';
import { CreateBlogComponent } from './components/post/create-blog/create-blog.component';
import { AuthInterceptorService } from './interceptor/request.interceptor';
import { SavedListComponent } from './components/saved/saved-list/saved-list.component';
import { SavedBlogComponent } from './components/saved/saved-blog/saved-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BlogsComponent,
    FooterComponent,
    AuthComponent,
    SavedComponent,
    LoadingSpinnerComponent,
    ProfileComponent,
    BlogComponent,
    CreateBlogComponent,
    SavedListComponent,
    SavedBlogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
