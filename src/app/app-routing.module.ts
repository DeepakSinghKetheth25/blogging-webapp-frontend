import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { BlogsComponent } from "./components/blogs/blogs.component";
import { HomeComponent } from "./components/home/home.component";
import { CreateBlogComponent } from "./components/post/create-blog/create-blog.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SavedComponent } from "./components/saved/saved.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes=[
    {path: '', component: HomeComponent, pathMatch: 'full' },
    {path: 'auth', component: AuthComponent},
    {path: 'post/blog', component: CreateBlogComponent},
    {path: 'blogs', component: BlogsComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'saved', component: SavedComponent, canActivate: [AuthGuard]}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}