import { Component, OnInit } from '@angular/core';
import { Collapse } from './collapse.component';
import { SearchPipe } from './search-pipe';
import { SingletonService } from './singleton.service';

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
		this.courses = SingletonService.getInstance().getCourseList();
	}

	constructor() {
	}


}

interface Map<T> {
    [K: string]: T;
}