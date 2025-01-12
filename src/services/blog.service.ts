import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responsModel';
import { ListResponseModel } from '../models/listResponseModel';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blog: Blog | null = null;
  constructor(private httpClient:HttpClient) { }

  add(blog:Blog):Observable<ResponseModel>{
    var result=this.httpClient.post<ResponseModel>("http://localhost:46772/api/blogs/add",blog)
    return result
  }

  getAllBlogById(id:number){
    let path="http://localhost:46772/api/Blogs/getAllByUserId?id="+id;

    return this.httpClient.get<ListResponseModel<Blog>>(path)
  }


  setBlogData(blog: Blog): void {
    this.blog = blog;
  }

  getBlogData(): Blog | null {
    return this.blog;
  }
}
