export interface ProfileDetails {
    _id :string;
    username: string;
    name:string;
    likedBlogs:string[];
    dislikedBlogs:string[];
    savedBlogs:string[];
    address:{
        street: string;
        city: string;
        state: string;
        country: string;
    } ; 
  }