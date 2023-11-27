import { Pipe, type PipeTransform } from '@angular/core'

@Pipe({
	name: 'rg',
})
export class RgPipe implements PipeTransform {

	transform(value: string): string {
		if(value.length === 7) {
			return `${value.slice(0, 1)}.${value.slice(1, 4)}.${value.slice(4, 7)}`
		}

		return ''
	}
}
