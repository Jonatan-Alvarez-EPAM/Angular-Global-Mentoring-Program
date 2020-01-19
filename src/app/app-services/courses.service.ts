import { Injectable, Inject } from '@angular/core';
import { Course } from '@app/app-models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject('BASE_URL') private readonly BASE_URL: string
  ) { }

  list(params: { start?: string, count?: string, textFragment?: string }): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.BASE_URL}/courses`, { params });
  }

  create(courseInfo: Course): Observable<Course> {
    return this.httpClient.post<Course>(`${this.BASE_URL}/courses`, courseInfo);
  }

  get(idCourse: string): Observable<Course> {
    return this.httpClient.get<Course>(`${this.BASE_URL}/courses`, { params: { id: idCourse } });
  }

  update(courseInfo: Course): Observable<Course> {
    // ToDo: Implement update course in BE
    return this.httpClient.put<Course>(`${this.BASE_URL}/courses`, courseInfo);
  }

  delete(idCourse: string): Observable<Course> {
    return this.httpClient.delete<Course>(`${this.BASE_URL}/courses`, { params: { id: idCourse } });
  }
}
