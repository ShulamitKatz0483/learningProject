import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { LessonComponent } from './lesson/lesson.component';

const routes: Routes = [
 { path: 'lesson', component: LessonComponent},
 { path: 'category', component: CategoryComponent},
 {path: '', redirectTo: 'lesson', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
