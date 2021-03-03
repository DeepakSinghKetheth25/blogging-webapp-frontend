export interface Blog{
    _id: string;
    title: string;
    description: string;
    author: string;
    date: Date;
    category: string;
    externalLink: string;
    likes: number;
    dislikes: number;
    comments:[
        {
        username : string;
        date :Date;
        comment: string;
        }
    ]
    
}