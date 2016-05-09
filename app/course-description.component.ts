import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseService } from './course.service'
import { Collapse } from './collapse.component';
import { SearchPipe } from './search-pipe';
import { SingletonService } from './singleton.service';

@Component({
	selector: 'my-course-description',
	pipes: [SearchPipe],
	templateUrl: 'app/html/course-description.component.html',
    directives: [Collapse]
})
export class CourseDescriptionComponent implements OnInit {
	data;
	courses = [];
	enrolledCourses = [];
	@Input()
	tempCourses = [];
	collapseList: Map<boolean> = {};
	enrollButton = 'Enroll';

	ngOnInit() {
		this.courses = SingletonService.getInstance().getCourseList();
		this.enrolledCourses = SingletonService.getInstance().getEnrolledList();
	}

	constructor(private cService: CourseService) {
	}

	requestForEnrollment(course) {
		if (this.tempCourses.indexOf(course) != -1) {
			alert('Can\'t enroll same course multiple times');
		} else {
			course.collapse = true;
			course.collapse2 = true;
			this.tempCourses.push(course)
		}
	}

	checkDisableEnrollButton(course) : boolean {
		// console.log(this.enrolledCourses);
		if ( this.tempCourses.indexOf(course) != -1) {
			this.enrollButton = 'Enrolled';
			return true;
		} else {
			for (var i = 0; i < this.enrolledCourses.length; i++) {
				if ( this.enrolledCourses[i].id == course.id) {
					this.enrollButton = 'Enrolled';
					return true;
				}
			}
			this.enrollButton = 'Enroll';
			return false;
		}
	}

}

interface Map<T> {
    [K: string]: T;
}