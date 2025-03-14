import { Component } from '@angular/core';
import { NaviComponent } from '../navi/navi.component';
import { ProjectComponent } from '../project/project.component';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserAllInfo } from '../../models/userAllInfo';
import {  ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { ProjectDto } from '../../models/projectDto';
import { FormsModule } from '@angular/forms';
import { SocialLinkService } from '../../services/social-link.service';
import { SocialLinkDto } from '../../models/socialLinkDto';
import { SocialLink } from '../../models/socialLink';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ RouterModule,CommonModule, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  userinfo:UserAllInfo;
  id:number;
  isEditing: boolean = false;
  socialLinks:SocialLink[];

  dataLoaded=false;
    constructor(private userService:UserService,private projectService:ProjectService,
      private activatedRoute:ActivatedRoute,private toastrService:ToastrService,private router:Router,private blogService:BlogService,
      private authService:AuthService,private socialLinkService:SocialLinkService){
    }
  ngOnInit():void{
    this.getinfo();

  }
 
  
  saveLinks(github: string, website: string, linkedIn: string) {
    // socialLinks içindeki her platformu güncelle
    this.userinfo.socialLinks.forEach(link => {
      if (link.platform === 'Github') {
        link.url = github;  
      } else if (link.platform === 'LinkedIn') {
        link.url = linkedIn;  
      } else if (link.platform === 'Website') {
        link.url = website;  
      }
    });
  
    // API çağrısını gönder
    const socialLinkDto: SocialLinkDto = {
      userId: 0,
      socialLinks: this.userinfo.socialLinks
    };
  
    this.socialLinkService.UpdateSocialLink(socialLinkDto).subscribe(
      response => {
        this.toastrService.info(response.message);
        this.userinfo!.github = github;
        this.userinfo!.linkedIn = linkedIn;
        this.userinfo!.website = website;
        localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
      },
      responseError => {
        this.toastrService.error(responseError.error.Message, 'Hata');
      }
    );
  
    this.isEditing = false;
  }
  
  getinfo() {
    const storedUserInfo = localStorage.getItem('userinfo');

    if (storedUserInfo) {
      this.userinfo = JSON.parse(storedUserInfo);
      this.dataLoaded = true;
    } else {
      this.userService.getAllUserİnformartion().subscribe(
        (response) => {
          this.userinfo = response.data;
          this.dataLoaded = true;
          localStorage.setItem('userinfo', JSON.stringify(this.userinfo)); // Veriyi localStorage'a kaydet
        },
        (responseError) => {
          this.toastrService.error(responseError.error.Message, 'Hata', {});
        }
      );
    }
  }

  truncate(content: string, wordLimit: number = 10): string {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  }
  getProfileImage(photoUrl: string): string {
    return photoUrl ? photoUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  }
  goBlock(blogs:Blog[]){
    this.blogService.setBlogsData(blogs);
    this.router.navigate(["blogs"]);
  }
  goToBlog(blog:Blog){
  
    this.blogService.setBlogData(blog);
    this.router.navigate([`/blogs/${blog.blogId}`]);
  }
  goToProject(project:ProjectDto){
    this.projectService.setProjectData(project);
    this.router.navigate([`/projects/${project.projectId}`]);
  }
  goProject(projects:ProjectDto[]){
    this.projectService.setProjectsData(projects);
    this.router.navigate(["projects"]);
  }
  goToInfo(userinfo:UserAllInfo){
    this.userService.setUserAllInfoData(userinfo)
    this.router.navigate(["userinfo"]);
  }
  goToCv(userinfo:UserAllInfo){
    this.userService.setUserAllInfoData(userinfo)
    this.router.navigate([`/cvpage/${userinfo.userInfos.nickName}`]);
  }
}
