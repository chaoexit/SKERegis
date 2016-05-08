import { Component } from '@angular/core';
import { CourseService } from './course.service';
import { EnrollmentComponent } from './enrollment.component';


@Component({
	selector: 'my-app',
	templateUrl: 'app/html/app.component.html',
    directives: [EnrollmentComponent],
    providers: [CourseService]
})

export class AppComponent {

	constructor() {
	}
}