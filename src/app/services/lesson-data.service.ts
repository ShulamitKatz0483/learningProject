import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lesson } from '../lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonDataService {

  private lessonDataSubject = new BehaviorSubject<Lesson>(new Lesson());
  private savedOriginalDataSubject = new BehaviorSubject<any>(null);

  constructor() { }

  setLessonData(lesson: Lesson) {
    this.lessonDataSubject.next(lesson);
  }

  getLessonData() {
    return this.lessonDataSubject.asObservable();
  }

  setSavedOriginalData(data: any) {
    this.savedOriginalDataSubject.next(data);
  }

  getSavedOriginalData() {
    return this.savedOriginalDataSubject.asObservable();
  }
}
