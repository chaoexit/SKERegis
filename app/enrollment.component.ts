import { Component, OnInit } from '@angular/core';
import { CourseDescriptionComponent } from './course-description.component';
import { Collapse } from './collapse.component';
import { CourseService } from './course.service';
import { RouteParams, Router } from '@angular/router-deprecated';
import { SingletonService } from './singleton.service';

@Component({
	selector: 'my-enrollment',
	templateUrl: 'app/html/enrollment.component.html',
	directives: [CourseDescriptionComponent, Collapse]
})
export class EnrollmentComponent implements OnInit{
	enrollList = [];
	showJSON = false;
	jsonText = '';
	subscriber;
	enrolledList = [];
	isEnrolling = false;
	collapseList: Map<boolean> = {};
	studentID = '';

	ngOnInit() {
		this.showJSON = false;
		this.isEnrolling = false;
		this.studentID = SingletonService.getInstance().getStudentID();
		this.enrolledList = SingletonService.getInstance().getEnrolledList();
		if (this.studentID.length != 10) {
			alert('Please log in first');
			let link = ['Index'];
			this.router.navigate(link);
		}
	}

	constructor(private cService: CourseService, private router: Router, private routeParams: RouteParams) {
		this.subscriber = SingletonService.getInstance().emitter.subscribe(data => {
			if (data == 9) {
				console.log("success");
				SingletonService.getInstance().sync(10);
				this.subscriber.unsubscribe();
				let link = ['Report'];
				this.router.navigate(link);
			} else if ( data == -9 ) {
				alert('Failed to enroll, try again later');
				let link = ['Enrollment'];
				this.router.navigate(link);
			}
			this.isEnrolling = false;
		})
	}

	removeCourse(course: Object) {
		let index = this.enrollList.indexOf(course);
		if ( index != -1 ) {
			this.enrollList.splice(index, 1);
			this.jsonText = JSON.stringify(this.enrollList);
		}
	}

	discard() {
		if ( confirm('Are you sure?') ) {
			this.enrollList = [];
			this.jsonText = JSON.stringify(this.enrollList);
		}
	}

	enroll() {
		if (confirm('Are you sure?')) {
			this.isEnrolling = true;
			let tempArray = this.enrolledList.slice();
			for (var i = 0; i < this.enrollList.length; i++) {
				tempArray.push(this.enrollList[i]);
			}
			let tempObject: Map<Object> = { [this.studentID] : tempArray };
			SingletonService.getInstance().setEnrolledList(JSON.stringify(tempObject), 9);
		}
	}

	viewJSON() {
		this.jsonText = JSON.stringify(this.enrollList);
		this.showJSON = !this.showJSON;
	}
}

interface Map<T> {
    [K: string]: T;
}