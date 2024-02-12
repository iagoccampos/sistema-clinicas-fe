import { CpfPipe } from './cpf.pipe'

describe('CpfPipe', () => {
	const pipe = new CpfPipe()

	it('should transform 12345678900 to 123.456.789-00', () => {
		expect(pipe.transform('12345678900')).toBe('123.456.789-00')
	})

	it('should transform 123456789 to be empty', () => {
		expect(pipe.transform('123456789')).toBe('')
	})
})
