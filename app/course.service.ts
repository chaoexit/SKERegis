import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CourseService {
	courseData;

	constructor(private http: Http) {
	}

	getCourses() {
		return this.http.get('https://whsatku.github.io/skecourses/combined.json').toPromise().then(res => res.json());
	}
}