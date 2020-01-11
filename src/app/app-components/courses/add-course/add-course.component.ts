import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Course } from '@app/app-models';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '@app/app-services';
import { map } from 'rxjs/operators';

enum SavingModes { CREATE, UPDATE }

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Course>();

  private savingMode = SavingModes.CREATE;
  id?: string;
  name: string;
  description: string;
  date: Date;
  length: number;
  courseInfo: Course;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly coursesService: CoursesService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.savingMode = SavingModes.UPDATE;
      this.coursesService.get(this.id)
        .pipe(map(courses => courses[0]))
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
    this.save.emit(this.courseInfo);

    if (this.savingMode === SavingModes.CREATE) {
      this.coursesService.create(this.courseInfo)
        .subscribe({
          error: (error) => { console.error('Something went wrong', error); }
        });
    } else {
      this.coursesService.update(this.courseInfo)
        .subscribe({
          error: (error) => { console.error('Something went wrong', error); }
        });
    }
    this.router.navigate(['/courses']);
  }

  onCancel() {
    this.cancel.emit();
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
