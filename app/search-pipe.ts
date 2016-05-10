import { Pipe } from '@angular/core';

@Pipe({
	name: "search"
})
export class SearchPipe {
    transform(value: any, args: string): any {
		if(!args) {
			return value;
		}
		let filter = args.toLowerCase();
		return filter ? value.filter(course => course.name.toLowerCase().indexOf(filter) != -1 || course.id.indexOf(filter) != -1) : value;
    }
}