import { Component } from '@angular/core';
import { EnrollmentComponent } from './enrollment.component';
import { ReportComponent } from './report.component';
import { CourseService } from './course.service';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { IndexComponent } from './index.component';


@Component({
	selector: 'my-app',
	templateUrl: 'app/html/app.component.html',
    directives: [EnrollmentComponent, ROUTER_DIRECTIVES, IndexComponent],
    providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
		{
			path: '/index',
			name: 'Index',
			component: IndexComponent,
			useAsDefault: true
		},	
		{
			path: '/enrollment/:id',
			name: 'Enrollment',
			component: EnrollmentComponent,
		},
		{
			path: '/report/:id',
			name: 'Report',
			component: ReportComponent
		}
	])
export class AppComponent {
	studentID = 'id';
	constructor(private router: Router) {

	}

	login(input) {
		if ( input.length != 10 ) {
			alert("Please fill in 10 digits student id");
		} else {
			this.studentID = input;
			let link = ['Enrollment', { id: this.studentID }];
			this.router.navigate(link);
		}
	}

	checkLogin() {
		if ( this.studentID.length == 10) {
			return true;
		} else {
			return false;
		}
	}

	gotoReport() {
		let link = ['Report', { id: this.studentID }];
		this.router.navigate(link);
	}

	gotoEnrollment() {
		let link = ['Enrollment', { id: this.studentID }];
		this.router.navigate(link);
	}
}