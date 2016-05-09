import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CourseService {
	courseData;

	constructor(private http: Http) {
	}

	getAllCourses() {
		return this.http.get('https://whsatku.github.io/skecourses/combined.json').toPromise().then(res => res.json());
	}

	getCourseByID(studentID) {
		return this.http.get('http://52.37.98.127:3000/v1/5610546745/' + studentID + '?pin=6745').toPromise().then(res => res.json());
	}

	setCourseByID(body) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post('http://52.37.98.127:3000/v1/5610546745?pin=6745', body, options)
			.toPromise();
	}


}