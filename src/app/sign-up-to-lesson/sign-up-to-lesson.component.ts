import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../lesson.model';
import { StudentInLessonService } from '../services/student-in-lesson.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up-to-lesson',
  templateUrl: './sign-up-to-lesson.component.html',
  styleUrl: './sign-up-to-lesson.component.scss'
})
export class SignUpToLessonComponent implements OnInit {
  lesson: Lesson = new Lesson();
  userName: string = '';
  userData: any[] = [];
  userId: number = 0;

  constructor(private route: ActivatedRoute,
    private studentInLessonService: StudentInLessonService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.lesson = history.state.lesson;
  }
  getUserByName(userName: string) :number{
    this.userService.getUserIdByName(userName).subscribe(
      (data) => {
        const userId = data;
        return userId;
      },
      (error) => {
        console.error(error);
      }
    );
    return 0;
  }

  async submitSignUpForm() {
    console.log('Lesson:', this.lesson);
    console.log('User Name:', this.userName);
    this.userId = await this.getUserByName(this.userName);
    if(this.userId!=0){
    this.studentInLessonService.addStudentToLesson(this.lesson.idLesson, this.userId).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );;
  }
}
}
