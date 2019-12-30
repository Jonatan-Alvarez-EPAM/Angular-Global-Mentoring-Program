import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Course } from '@app/app-models';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Course>();

  title: string;
  description: string;
  date: Date;
  duration: number;
  courseInfo: Course;

  constructor() { }

  ngOnInit() {
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
  }

  onCancel() {
    this.cancel.emit();
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
