import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseService } from './course.service'
import { Collapse } from './collapse.component';
import { SearchPipe } from './search-pipe';

@Component({
	selector: 'my-course-description',
	pipes: [SearchPipe],
	templateUrl: 'app/html/course-description.component.html',
    providers: [CourseService],
    directives: [Collapse]
})
export class CourseDescriptionComponent implements OnInit {
	data;
	courses = [];
	@Input()
	tempCourses = [];
	collapseList: Map<boolean> = {};
	enrollButton = 'Enroll';

	ngOnInit() {
		this.cService.getCourses().then(data => {
			this.data = data;
			for (var x in data) {
				console.log(data[x].id);
				this.courses.push(data[x]);
				this.collapseList[data[x].id] = true;
			}
		});
	}

	constructor(private cService: CourseService) {
	}

	requestForEnrollment(course: Object) {
		console.log('enroll!!');
		// let index = this.tempCourses.indexOf(course);
		// if ( index != -1 ) {
		// 	this.tempCourses.splice(index, 1);
		// }
		if (this.tempCourses.indexOf(course) != -1) {
			alert('Can\'t enroll same course multiple times');
		} else {
			this.tempCourses.push(course)
		}
	}

	checkDisableEnrollButton(course: Object) : boolean {
		if ( this.tempCourses.indexOf(course) != -1 ) {
			this.enrollButton = 'Enrolled';
		} else {
			this.enrollButton = 'Enroll';
		}
		return this.tempCourses.indexOf(course) != -1
	}

}

interface Map<T> {
    [K: string]: T;
}