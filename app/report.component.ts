import { Component, Input, OnInit, NgZone } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';
import { CourseService } from './course.service';
import { SingletonService } from './singleton.service';

@Component({
	selector: 'my-report',
	templateUrl: 'app/html/report.component.html'
})
export class ReportComponent implements OnInit{
	enrolledList = [];
	subscriber;
	allCredit: number = 0;
	@Input()
	studentID;
	isDropping = false;
	showJSON = false;
	textJSON = '';

	ngOnInit() {
		this.showJSON = false;
		this.isDropping = false;
		this.studentID = SingletonService.getInstance().getStudentID();
		if ( this.studentID.length != 10 ) {
			alert('Please log in first');
			let link = ['Index'];
			this.router.navigate(link);
		}
		this.enrolledList = SingletonService.getInstance().getEnrolledList();
		for (var i = 0; i < this.enrolledList.length; i++) {
			this.allCredit += this.enrolledList[i].credit.total;
		}
	}

	constructor(private routeParams: RouteParams, private router: Router, private zone: NgZone) {
		this.subscriber = SingletonService.getInstance().emitter.subscribe(data => {
			if (data == 10) {
				this.zone.run(() => {
					this.enrolledList = SingletonService.getInstance().getEnrolledList();
					this.allCredit = 0;
					for (var i = 0; i < this.enrolledList.length; i++) {
						this.allCredit += this.enrolledList[i].credit.total;
					}
				});
			} else if ( data == -10 ) {
				alert('Something went wrong, try again later');
			}
			this.isDropping = false;
		})
	}

	dropCourse(course) {
		if (confirm("Are you sure ?")) {
			this.isDropping = true;
			let index = this.enrolledList.indexOf(course);
			if (index != -1) {
				this.enrolledList.splice(index, 1);
				let tempObject: Map<Object> = { [this.studentID]: this.enrolledList };;
				SingletonService.getInstance().setEnrolledList(JSON.stringify(tempObject), 10);
			}
		}
	}

	viewJSON() {
		this.textJSON = JSON.stringify(this.enrolledList);
		this.showJSON = !this.showJSON;
	}
}

interface Map<T> {
    [K: string]: T;
}