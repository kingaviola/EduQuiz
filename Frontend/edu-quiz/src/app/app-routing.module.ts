import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { FillingComponent } from './pages/filling/filling.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { CheckingComponent } from './pages/checking/checking.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'filling', component: FillingComponent},
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
  { path: 'checking', component: CheckingComponent, canActivate: [AuthGuard]},

  { path: 'groups', loadChildren: () => import('./modules/groups/groups.module').then(m => m.GroupsModule)},
  { path: 'quiz', loadChildren: () => import('./modules/quiz/quiz.module').then(m => m.QuizModule), canActivate: [AuthGuard]},

  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
