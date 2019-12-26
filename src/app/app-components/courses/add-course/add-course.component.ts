import { Component, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { Course } from '@app/app-models';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '@app/app-services';
import { HttpClient } from '@angular/common/http';
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

  constructor(private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly coursesService: CoursesService,
    private readonly httpClient: HttpClient,
    @Inject('BASE_URL') private readonly BASE_URL: string) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.savingMode = SavingModes.UPDATE;
      this.httpClient.get<Course>(`${this.BASE_URL}/courses`, {
        params: { id: this.id }
      }).pipe(map(courses => courses[0])).subscribe((response: Course) => {
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
      // ToDo: Implement create course in BE
      this.httpClient.post(`${this.BASE_URL}/courses`, {
        id: this.courseInfo.id,
        name: this.courseInfo.name,
        date: this.courseInfo.date,
        length: this.courseInfo.length,
        description: this.courseInfo.description,
        isTopRated: this.courseInfo.isTopRated,
      }).subscribe();
    } else {
      // ToDo: Implement update course in BE
      this.httpClient.put(`${this.BASE_URL}/courses`, {
        id: this.courseInfo.id,
        name: this.courseInfo.name,
        date: this.courseInfo.date,
        length: this.courseInfo.length,
        description: this.courseInfo.description,
        isTopRated: this.courseInfo.isTopRated,
      }).subscribe();
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
