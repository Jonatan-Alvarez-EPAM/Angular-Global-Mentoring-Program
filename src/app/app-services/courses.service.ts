import { Injectable, Inject } from '@angular/core';
import { Course } from '@app/app-models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderByPipe } from '@app/app-pipes';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject('BASE_URL') private readonly BASE_URL: string
  ) { }

  list(params: { start?: string, count?: string, textFragment?: string }): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.BASE_URL}/courses`, { params })
      .pipe(map((courses: Course[]) => new OrderByPipe().transform(courses)));
  }

  create(courseInfo: Course): Observable<Course> {
    return this.httpClient.post<Course>(`${this.BASE_URL}/courses`, {
      id: courseInfo.id,
      name: courseInfo.name,
      date: courseInfo.date,
      length: courseInfo.length,
      description: courseInfo.description,
      isTopRated: courseInfo.isTopRated,
    });
  }

  get(idCourse: string): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.BASE_URL}/courses`, { params: { id: idCourse } });
  }

  update(courseInfo: Course): Observable<Course> {
    // ToDo: Implement update course in BE
    return this.httpClient.put<Course>(`${this.BASE_URL}/courses`, {
      id: courseInfo.id,
      name: courseInfo.name,
      date: courseInfo.date,
      length: courseInfo.length,
      description: courseInfo.description,
      isTopRated: courseInfo.isTopRated,
    });
  }

  delete(idCourse: string): Observable<Course> {
    // ToDo: Implement deleteById in BE.
    return this.httpClient.delete<Course>(`${this.BASE_URL}/courses`, { params: { id: idCourse } });
  }
}
