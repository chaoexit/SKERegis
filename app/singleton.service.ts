import { EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

export class SingletonService {
	myHttp
	studentID: string = '';
	courseList = [];
	enrolledList = [];
	checkList: number = 0;
	emitter: EventEmitter<number> = new EventEmitter();
	static instance: SingletonService;
	static isCreating: boolean = false;

	constructor(http: Http) {
		if ( !SingletonService.isCreating ) {
			throw new Error("Use getInstance() instead");
		}
		this.myHttp = http;
		this.myHttp.get('https://raw.githubusercontent.com/chinclubi/HCI-webapplication/master/assets/courses.json').subscribe(data => {
			if (data.status == 200) {
				var tempData = data.json();
				for (var x = 0; x < tempData.length; x++) {
					tempData[x].collapse = true;
					tempData[x].collapse2 = true;
					if (tempData[x].sections && tempData[x].sections.length == 2 ) {
						console.log(tempData[x]);
					}
					this.courseList.push(tempData[x]);
				}
				this.emitter.next(++this.checkList);
			} else {
				this.emitter.next(-1);
			}
		});
	}

	static getInstance() {
		return SingletonService.instance;
	}

	static initialize(http: Http) {
		if (SingletonService.instance == null) {
			SingletonService.isCreating = true;
			SingletonService.instance = new SingletonService(http);
			SingletonService.isCreating = false;
		}
	}

	setStudentID(input: string) {
		this.studentID = input;
		this.initializeService();
	}

	getStudentID() {
		return this.studentID;
	}

	private initializeService() {
		this.myHttp.get('http://52.37.98.127:3000/v1/5610546745/?pin=6745').subscribe(data => {
			if (data.status == 200) {
				if ( !data.json()[this.studentID] ) {
					this.enrolledList = [];
				} else {
					this.enrolledList = data.json()[this.studentID];
				}
				this.emitter.next(++this.checkList);
			} else {
				this.emitter.next(-1);
			}
		});
	}

	getCourseList() {
		return this.courseList;
	}

	getEnrolledList() {
		return this.enrolledList;
	}

	sync(returnStatus) {
		this.myHttp.get('http://52.37.98.127:3000/v1/5610546745/?pin=6745').subscribe(data => {
			if (data.status == 200) {
				this.enrolledList = data.json()[this.studentID];
				this.emitter.next(returnStatus);
			} else {
				this.emitter.next(-returnStatus);
			}
		});		
	}

	setEnrolledList(body, returnStatus) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		this.myHttp.post('http://52.37.98.127:3000/v1/5610546745?pin=6745', body, options).subscribe(data => {
			if (data.status == 200) {
				this.sync(returnStatus);
			} else {
				this.emitter.next(-1);
			}
		});	
	}

	speak(input) {
		this.emitter.next(input);
	}
}