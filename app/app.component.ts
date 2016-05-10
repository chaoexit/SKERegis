import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { EnrollmentComponent } from './enrollment.component';
import { ReportComponent } from './report.component';
import { CourseService } from './course.service';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { IndexComponent } from './index.component';
import { SingletonService } from './singleton.service';


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
			path: '/enrollment',
			name: 'Enrollment',
			component: EnrollmentComponent,
		},
		{
			path: '/report',
			name: 'Report',
			component: ReportComponent
		}
	])
export class AppComponent {
	studentID = 'id';
	subscriber: any;
	constructor(private router: Router, private http: Http) {
		SingletonService.initialize(http);
		this.subscriber = SingletonService.getInstance().emitter.subscribe(data => {
			if (data == 2) {
				let link = ['Enrollment'];
				this.router.navigate(link);
				this.subscriber.unsubscribe();
			} else if (data == -1) {
				alert('Failed to login, please try again');
			}
		});
	}

	login(input) {
		if ( input.length != 10 ) {
			alert("Please fill in 10 digits student id");
		} else {
			this.studentID = input;
			SingletonService.getInstance().setStudentID(input);
		}
	}

	checkLogin() {
		if ( SingletonService.getInstance().getStudentID().length == 10 ) {
			return true;
		} else {
			return false;
		}
	}

}