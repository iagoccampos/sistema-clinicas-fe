import { Pipe, type PipeTransform } from '@angular/core'

@Pipe({
	name: 'phone',
})
export class PhonePipe implements PipeTransform {
	transform(value: string): string {
		const arr = value.split('')
		const lastChunk = arr.splice(-4).join('')
		const midChunk = arr.splice(-4).join('')

		let startDigit = ''

		if(value.length === 11) {
			startDigit = arr.splice(-1).join('')
		}

		const ddd = arr.splice(-2).join('')

		return `(${ddd}) ${startDigit ? startDigit + ' ': ''} ${midChunk}-${lastChunk}`
	}
}
