import { Pipe, type PipeTransform } from '@angular/core'

@Pipe({
	name: 'cpf',
})
export class CpfPipe implements PipeTransform {

	transform(value: string): string {
		if(value.length === 11) {
			return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`
		}

		return ''
	}
}
