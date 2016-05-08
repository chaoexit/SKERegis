import { Component, OnInit } from '@angular/core';
import { CourseDescriptionComponent } from './course-description.component';
import { Collapse } from './collapse.component';
import { CourseService } from './course.service';
import { RouteParams, Router } from '@angular/router-deprecated';


@Component({
	selector: 'my-enrollment',
	templateUrl: 'app/html/enrollment.component.html',
	directives: [CourseDescriptionComponent, Collapse]
})
export class EnrollmentComponent implements OnInit{
	enrollList = [];
	collapseList: Map<boolean> = {};
	studentID = '';

	ngOnInit() {
		this.studentID = this.routeParams.get('id');
		if (this.studentID.length != 10) {
			alert('Please log in first');
			let link = ['Index'];
			this.router.navigate(link);
		}
	}

	constructor(private cService: CourseService, private router: Router, private routeParams: RouteParams) {
	}

	removeCourse(course: Object) {
		let index = this.enrollList.indexOf(course);
		if ( index != -1 ) {
			this.enrollList.splice(index, 1);
		}
	}

	discard() {
		if ( confirm('Are you sure?') ) {
			this.enrollList = [];
		}
	}

	enroll() {
		if (confirm('Are you sure?')) {
			let tempArray = [];
			for (var i = 0; i < this.enrollList.length; i++) {
				tempArray.push(this.enrollList[i]);
			}
			let tempObject: Map<Object> = { [this.studentID] : tempArray };
			this.cService.setCourseByID(JSON.stringify(tempObject)).then(res => {
				res.json();
				if(res.status == 200) {
					alert('Successfully enroll!!');
					let link = ['Report', { id: this.studentID }];
					this.router.navigate(link);
				} else {
					alert('Failed to enroll, try again later');
					let link = ['Enrollment', { id: this.studentID }];
					this.router.navigate(link);
				}
			});
		}
	}
}

interface Map<T> {
    [K: string]: T;
}