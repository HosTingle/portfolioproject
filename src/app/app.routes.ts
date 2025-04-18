import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { loginGuard } from '../guards/login.guard';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { FirstpageComponent } from '../components/firstpage/firstpage.component';
import { NavinComponent } from '../components/navin/navin.component';
import { BlogsComponent } from '../components/blogs/blogs.component';
import { BlogComponent } from '../components/blog/blog.component';
import { RegisterComponent } from '../components/register/register.component';
import { NaviComponent } from '../components/navi/navi.component';
import { UserinfoComponent } from '../components/userinfo/userinfo.component';
import { AddblogpageComponent } from '../components/addblogpage/addblogpage.component';
import { UpdateblogComponent } from '../components/updateblog/updateblog.component';
import { CvpageComponent } from '../components/cvpage/cvpage.component';
import { loguGuard } from '../guards/logu.guard';

export const routes: Routes = [
    {path: "login", component: LoginComponent, canActivate: [loguGuard]},
    {path: "register", component: RegisterComponent, canActivate: [loguGuard]},
    
    {
      path: '',
      component: NaviComponent, 
      children: [
        {path: "", component: FirstpageComponent, canActivate: [loguGuard]},  // Kök yol için varsayılan rota
      ]
    },
    {
      path: '',
      component: NavinComponent, 
      children: [
        {path: 'blogs/add', component: AddblogpageComponent , canActivate: [loginGuard]},
        {path: 'projects/add', component: AddblogpageComponent , canActivate: [loginGuard]},
        {path: 'homepage', component: HomepageComponent, canActivate: [loginGuard]},
        {path: 'blogs/:username', component: BlogsComponent, canActivate: [loginGuard]},
        { path: 'blogs/:username/:id', component: BlogComponent, canActivate: [loginGuard] },
        {path: 'projects/:username', component: BlogsComponent, canActivate: [loginGuard]},
        {path: 'projects/:username/:id', component: BlogComponent, canActivate: [loginGuard]},
        {path: 'userinfo/:username', component: UserinfoComponent, canActivate: [loginGuard]},
        {path: 'editblog/:id', component: UpdateblogComponent, canActivate: [loginGuard]},
        {path: 'editproject/:id', component: UpdateblogComponent, canActivate: [loginGuard]},
        {path: 'cvpage/:username', component: CvpageComponent, canActivate: [loginGuard]},
      ]
    },
    {path: '**', redirectTo: 'login'}
];
