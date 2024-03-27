import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LessonService } from '../services/lesson.service';
import { SubCategoryService } from '../services/sub-category.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Lesson } from '../lesson.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  dataNow: Lesson[] = [];
  lessonsData: any[] = [];
  subCategoryData: any[] = [];
  userData: any[] = [];
  savedOriginalData:any={};
  displayedColumns: string[] = ['lessonName', 'lectureName', 'time'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  filterForm: FormGroup = this.formBuilder.group({
    lessonName: new FormControl(''),
    time: new FormControl(''),
    lectureName: new FormControl('')
  });

  constructor(private lessonService: LessonService, 
    private formBuilder: FormBuilder, 
    private subCategoryService: SubCategoryService, 
    private userService: UserService,
    private router:Router) { }

  async ngOnInit(): Promise<void> {
    await this.getLesson();
    await this.getSubCategory();
    await this.getLectur();
    await this.margeData();

  }
  margeData() {
    this.lessonsData.forEach(lesson => {
      const mergedLesson = new Lesson();
      mergedLesson.time = lesson.time;
      this.subCategoryData.forEach(subCategory => {
        if (lesson.idSubCategory === subCategory.idSubCategory) {
          mergedLesson.lessonName = subCategory.subCategoryName;
          mergedLesson.idLesson=subCategory.idSubCategory;
         this.savedOriginalData={idLesson:lesson.idSubCategory};
        }
      });
      this.userData.forEach(user => {
        if (lesson.idLecturer === user.idUser) {
          mergedLesson.lectureName = user.name;
          this.savedOriginalData['idUser'] = lesson.idLecturer;        }
      });
      this.dataNow.push(mergedLesson);
    });
    this.lessonsData = this.dataNow;
    this.dataSource.data = this.lessonsData;
  }

  getLesson() {
    this.lessonService.getData().subscribe(
      (data) => {
        this.lessonsData = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getSubCategory() {
    this.subCategoryService.getData().subscribe(
      (data) => {
        this.subCategoryData = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getLectur() {
    this.userService.getData().subscribe(
      (data) => {
        this.userData = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  applyFilters() {
    const filterValue = this.filterForm.value;

    this.dataSource.filterPredicate = (lesson: Lesson) => {
      const nameMatch = filterValue.lessonName ? lesson.lessonName.toLowerCase().includes(filterValue.lessonName.toLowerCase()) : true;
      const timeMatch = filterValue.time ? this.isTimeWithinRange(lesson.time, filterValue.time) : true;
      const lectureNameMatch = filterValue.lectureName ? lesson.lectureName.toLowerCase().includes(filterValue.lectureName.toLowerCase()) : true;

      return nameMatch && timeMatch && lectureNameMatch;
    };

    this.dataSource.filter = Math.random().toString();

    if (this.dataSource.filteredData) {
      this.lessonsData = this.dataSource.filteredData;
    }
  }

  isTimeWithinRange(lessonTime: string, filterTime: string): boolean {
    const lessonDate = new Date();
    const filterDate = new Date();

    const [lessonHours, lessonMinutes] = lessonTime.split(':').map(Number);
    const [filterHours, filterMinutes] = filterTime.split(':').map(Number);

    lessonDate.setHours(lessonHours, lessonMinutes);
    filterDate.setHours(filterHours, filterMinutes);

    const rangeStart = new Date(filterDate.getTime() - 30 * 60000);
    const rangeEnd = new Date(filterDate.getTime() + 30 * 60000);
    return lessonDate >= rangeStart && lessonDate <= rangeEnd;
  }
  signUpForLesson(lesson: Lesson) {
    console.log(lesson);
      this.router.navigate(['/signup'], { state: { lesson } });
    } 


}