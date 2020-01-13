import { Component, OnInit } from '@angular/core';
import { Course, Author } from '@app/app-models';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store';
import * as CoursesActions from '@app/store/actions/courses.actions';
import { getCurrentCourseStatus } from '@app/store/selectors/courses.selectors';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { computeControlValidity } from '@app/app-utils';
import { LengthValidator, DateValidator, AtLeastItemsValidator } from '@app/app-form-validators/validators';
import { AuthorsService } from '@app/app-services/authors.service';

enum SavingModes { CREATE, UPDATE }

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  private savingMode = SavingModes.CREATE;
  private readonly courseInfo$: Observable<Course> = this.store.select(getCurrentCourseStatus);
  readonly authors$: Observable<Author[]>;
  readonly computeControlValidity = computeControlValidity;
  readonly nameControl = new FormControl({ value: null, disabled: false }, [Validators.required, Validators.maxLength(50)]);
  readonly descriptionControl = new FormControl({ value: null, disabled: false }, [Validators.required, Validators.maxLength(500)]);
  readonly lengthControl = new FormControl({ value: null, disabled: false }, [Validators.required, LengthValidator]);
  readonly dateControl = new FormControl({ value: null, disabled: false }, [Validators.required, DateValidator]);
  readonly authorsControl = new FormControl({ value: null, disabled: false }, [Validators.required, AtLeastItemsValidator(1)]);
  readonly formGroup = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
    length: this.lengthControl,
    date: this.dateControl,
    authors: this.authorsControl,
  });

  id?: string;
  courseInfo: Course;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store<AppState>,
    private readonly authorService: AuthorsService,
  ) {
    this.authors$ = this.authorService.getAuthors();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.savingMode = SavingModes.UPDATE;
      this.store.dispatch(CoursesActions.getCourse({ courseId: this.id }));

      this.courseInfo$.pipe(filter(Boolean))
        .subscribe((response: Course) => {
          this.nameControl.setValue(response.name);
          this.lengthControl.setValue(response.length);
          this.descriptionControl.setValue(response.description);
          this.dateControl.setValue(this.parseDateString(response.date.toString()));
          this.authorsControl.setValue(response.authors || []);
        });
    }
  }

  onSave() {
    const today = new Date();
    const timestamp = today.getTime().toString();
    this.courseInfo = {
      id: timestamp,
      name: this.nameControl.value,
      date: new Date(this.parseDate(this.dateControl.value)),
      length: this.lengthControl.value,
      description: this.descriptionControl.value,
      isTopRated: false,
      authors: this.authorsControl.value,
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

  private parseDateString(dateString: string): string {
    const date = new Date(dateString);
    return date.getDate() + '/' + (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getFullYear();
  }

  private parseDate(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return month + '/' + day + '/' + year;
  }
}
