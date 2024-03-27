import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpToLessonComponent } from './sign-up-to-lesson.component';

describe('SignUpToLessonComponent', () => {
  let component: SignUpToLessonComponent;
  let fixture: ComponentFixture<SignUpToLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpToLessonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpToLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
