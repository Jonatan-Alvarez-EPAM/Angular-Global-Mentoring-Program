import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '@app/app-models';

@Injectable({
    providedIn: 'root'
})
export class AuthorsService {

    constructor(
        private readonly httpClient: HttpClient,
        @Inject('BASE_URL') private readonly BASE_URL: string
    ) { }

    getAuthors(): Observable<Author[]> {
        return this.httpClient.get<Author[]>(`${this.BASE_URL}/authors`);
    }

}