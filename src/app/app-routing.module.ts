import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common/components/login/login.component';
import { RegisterComponent } from './common/components/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { UploadComponent } from './dashboard/upload/upload.component';
import { TeacherGuard } from './common/guards/teacher.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [TeacherGuard]},
  { path: 'visualization', component: VisualizationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload', component: UploadComponent, canActivate: [TeacherGuard] },
  { path: '', redirectTo:'/visualization', pathMatch: 'full' },
  { path: '**', component: VisualizationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
