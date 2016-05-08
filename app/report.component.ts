import { Component, Input, OnInit } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';
import { CourseService } from './course.service';

@Component({
	selector: 'my-report',
	templateUrl: 'app/html/report.component.html'
})
export class ReportComponent implements OnInit{
	enrolledList = [];
	allCredit: number = 0;
	@Input()
	studentID;

	ngOnInit() {
		this.studentID = this.routeParams.get('id');
		if ( this.studentID.length != 10 ) {
			alert('Please log in first');
			let link = ['Index'];
			this.router.navigate(link);
		} else {
			this.cService.getCourseByID(this.studentID).then(data => {
				this.enrolledList = data;
				for ( var i = 0; i < this.enrolledList.length; i++ ) {
					this.allCredit += this.enrolledList[i].credit.total;
				}
			});
		}

	}

	constructor(private routeParams: RouteParams, private router: Router, private cService: CourseService) {
	}
}