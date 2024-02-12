import { RgPipe } from './rg.pipe'

describe('RgPipe', () => {
	const pipe = new RgPipe()

	it('should transform 7777777 value to 7.777.777', () => {
		expect(pipe.transform('7777777')).toBe('7.777.777')
	})

	it('should transform 88888888 value to 88.888.888', () => {
		expect(pipe.transform('88888888')).toBe('88.888.888')
	})

	it('should transform 123 value to empty', () => {
		expect(pipe.transform('123')).toBe('')
	})
})
