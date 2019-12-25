import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Course } from '@app/app-models';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '@app/app-services';

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
  title: string;
  description: string;
  date: Date;
  duration: number;
  courseInfo: Course;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly coursesService: CoursesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.savingMode = SavingModes.UPDATE;
      const courseInfo = this.coursesService.get(this.id);
      this.title = courseInfo.title;
      this.duration = courseInfo.duration;
      this.description = courseInfo.description;
      this.date = courseInfo.creationDate;
    }
  }

  onSave() {
    const today = new Date();
    const timestamp = today.getTime().toString();
    this.courseInfo = {
      id: timestamp,
      title: this.title,
      creationDate: new Date(),
      duration: this.duration,
      description: this.description,
      topRated: false,
    };
    this.save.emit(this.courseInfo);

    if (this.savingMode === SavingModes.CREATE) {
      this.coursesService.create(this.courseInfo);
    } else {
      this.coursesService.update(this.id, this.courseInfo);
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
    this.duration = duration;
  }

  enableSaveButton(): boolean {
    const saveButtonEnabled = !!this.title && !!this.description && !!this.date && !!this.duration;
    return saveButtonEnabled;
  }
}
