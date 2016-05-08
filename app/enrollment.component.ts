import { Component } from '@angular/core';
import { CourseDescriptionComponent } from './course-description.component';
import { Collapse } from './collapse.component';


@Component({
	selector: 'my-enrollment',
	templateUrl: 'app/html/enrollment.component.html',
	directives: [CourseDescriptionComponent, Collapse]
})
export class EnrollmentComponent {
	enrollList = [];
	collapseList: Map<boolean> = {};

	constructor() {
	}

	removeCourse(course: Object) {
		let index = this.enrollList.indexOf(course);
		if ( index != -1 ) {
			this.enrollList.splice(index, 1);
		}
	}
}

interface Map<T> {
    [K: string]: T;
}