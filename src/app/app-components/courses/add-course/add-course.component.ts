import { Component, OnInit } from '@angular/core';
import { Course } from '@app/app-models';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store';
import * as CoursesActions from '@app/store/actions/courses.actions';
import { getCurrentCourseStatus } from '@app/store/selectors/courses.selectors';
import { Observable } from 'rxjs';

enum SavingModes { CREATE, UPDATE }

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  private savingMode = SavingModes.CREATE;
  private readonly courseInfo$: Observable<Course> = this.store.select(getCurrentCourseStatus);
  id?: string;
  name: string;
  description: string;
  date: Date;
  length: number;
  courseInfo: Course;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.savingMode = SavingModes.UPDATE;
      this.store.dispatch(CoursesActions.getCourse({ courseId: this.id }));

      this.courseInfo$.pipe(filter(Boolean))
        .subscribe((response: Course) => {
          this.name = response.name;
          this.length = response.length;
          this.description = response.description;
          this.date = response.date;
        });
    }
  }

  onSave() {
    const today = new Date();
    const timestamp = today.getTime().toString();
    this.courseInfo = {
      id: timestamp,
      name: this.name,
      date: new Date(),
      length: this.length,
      description: this.description,
      isTopRated: false,
    };

    if (this.savingMode === SavingModes.CREATE) {
      this.store.dispatch(CoursesActions.addCourse({ courseInfo: this.courseInfo }));
    } else {
      this.store.dispatch(CoursesActions.editCourse({ courseInfo: this.courseInfo }));
    }
    this.router.navigate(['/courses']);
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }

  onDateChange(date: Date) {
    this.date = date;
  }

  onDurationChange(duration: number) {
    this.length = duration;
  }

  enableSaveButton(): boolean {
    const saveButtonEnabled = !!this.name && !!this.description && !!this.date && !!this.length;
    return saveButtonEnabled;
  }
}
