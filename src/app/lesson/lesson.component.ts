import { Component, OnInit, ViewChild } from '@angular/core';
import { LessonService } from '../services/lesson.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  lessonsData: any[] = [];
  displayedColumns: string[] = ['name', 'lecture', 'time'];
  dataSource: MatTableDataSource<any> =new MatTableDataSource<any>() ;
  @ViewChild(MatSort) sort: MatSort=new MatSort();

  constructor(private lessonService: LessonService) {}

  ngOnInit(): void {
    this.getLesson();
  }

  getLesson() {
    this.lessonService.getData().subscribe(
      (data) => {
        this.lessonsData = data;
      this.dataSource.data=data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
