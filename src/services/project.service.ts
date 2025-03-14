import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ProjectWithPhotoDto } from '../models/ProjectWithPhotoDto';
import { ProjectDto } from '../models/projectDto';
import { ResponseModel } from '../models/responsModel';
import { ProjectWithPastPhotoDto } from '../models/projectWithPastPhotoDto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private project: ProjectDto | null = null;
  private projects:  ProjectDto[] | null = null;
 apiUrl="http://localhost:46772/api/Projects/";
  constructor(private httpClient:HttpClient) { }

  getProjects():Observable<ListResponseModel<Project>>{
    return this.httpClient.
      get<ListResponseModel<Project>>(this.apiUrl+"getAll");
  }
   addblog(projectWithPhoto:ProjectWithPhotoDto): Observable<ResponseModel>{
      var result=this.httpClient.post<ResponseModel>("http://localhost:46772/api/Projects/addprojectwithphoto",projectWithPhoto); 
      return result;
    }
    updateproject(projectWithPhoto:ProjectWithPastPhotoDto): Observable<ResponseModel>{
      var result=this.httpClient.post<ResponseModel>(this.apiUrl+"updateprojectwithphoto",projectWithPhoto);
      return result;
    }
    deleteproject(projectWithPhoto:ProjectWithPastPhotoDto): Observable<ResponseModel>{
      var result=this.httpClient.post<ResponseModel>(this.apiUrl+"deleteprojectwithphoto",projectWithPhoto);
      return result;
    }
    getProjectByUserId():Observable<ListResponseModel<ProjectDto>>{
      var result=this.httpClient.get<ListResponseModel<ProjectDto>>(this.apiUrl+"getallprojectdetailbyid");
      return result;
    }
  getProjectWithDetail():Observable<ListResponseModel<ProjectWithPhotoDto>>{
    return this.httpClient.
    get<ListResponseModel<ProjectWithPhotoDto>>(this.apiUrl+"getallprojectdetailbyid");
  }
    setProjectData(project: ProjectDto): void {
      this.project = project;
    }
    setProjectsData(project:ProjectDto[]):void{
      this.projects=project;
    }
  
    getProjectData(): ProjectDto | null {
      return this.project;
    }
    getProjectsData(): ProjectDto[] | null {
      return this.projects;
    }
}
