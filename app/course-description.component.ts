import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service'


@Component({
	selector: 'my-course-description',
	templateUrl: 'app/html/course-description.component.html',
    providers: [CourseService]
})
export class CourseDescription implements OnInit {
	data;
	courses = [];

	ngOnInit() {
		this.cService.getCourses().then(data => {
			this.data = data;
			for (var x in data) {
				this.courses.push(data[x]);
			}
			console.log(this.courses);
		});
	}

	constructor(private cService: CourseService) {
	}
}