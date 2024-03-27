import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { LessonComponent } from './lesson/lesson.component';
import { SignUpToLessonComponent } from './sign-up-to-lesson/sign-up-to-lesson.component';

const routes: Routes = [
 { path: 'lesson', component: LessonComponent},
 { path: 'category', component: CategoryComponent},
 { path: 'signup', component: SignUpToLessonComponent},
 {path: '', redirectTo: 'lesson', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
