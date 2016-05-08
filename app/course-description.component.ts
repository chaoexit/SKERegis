import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseService } from './course.service'
import { Collapse } from './collapse.component';
import { SearchPipe } from './search-pipe';

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
	@Input()
	studentID = '';
	collapseList: Map<boolean> = {};
	enrollButton = 'Enroll';

	ngOnInit() {
		this.cService.getAllCourses().then(data => {
			this.data = data;
			for (var x in data) {
				data[x].collapse = true;
				data[x].collapse2 = true;
				this.courses.push(data[x]);
			}
		});
		this.cService.getCourseByID(this.studentID).then(data => {
			this.enrolledCourses = data;
		});
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

	checkDisableEnrollButton(course: Object) : boolean {
		console.log(this.enrolledCourses);
		if ( this.tempCourses.indexOf(course) != -1 || this.enrolledCourses.indexOf(course) != -1 ) {
			this.enrollButton = 'Enrolled';
			return true;
		} else {
			this.enrollButton = 'Enroll';
			return false;
		}
	}

}

interface Map<T> {
    [K: string]: T;
}