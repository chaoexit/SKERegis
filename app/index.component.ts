import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service'
import { Collapse } from './collapse.component';
import { SearchPipe } from './search-pipe';

@Component({
	selector: 'my-index',
	pipes: [SearchPipe],
	templateUrl: 'app/html/index.component.html',
    directives: [Collapse]
})
export class IndexComponent implements OnInit {
	data;
	courses = [];
	collapseList: Map<boolean> = {};

	ngOnInit() {
		this.cService.getAllCourses().then(data => {
			this.data = data;
			for (var x in data) {
				data[x].collapse = true;
				this.courses.push(data[x]);
			}
		});
	}

	constructor(private cService: CourseService) {
	}


}

interface Map<T> {
    [K: string]: T;
}