import { Component } from '@angular/core';
import { CourseService } from './course.service';
import { CourseDescription } from './course-description.component';


@Component({
	selector: 'my-app',
	template: 
	`
		<h5>{{title}}</h5>
		<my-course-description></my-course-description>
    `,
    directives: [CourseDescription],
    providers: [CourseService]
})

export class AppComponent {
	title = 'SKE Registration';
	data;
	courses = [];

	constructor() {
	}
}