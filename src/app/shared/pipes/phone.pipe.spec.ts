import { PhonePipe } from './phone.pipe'

describe('PhonePipe', () => {
	const pipe = new PhonePipe()

	it('should transform 11233334444 value to (11) 2 3333-4444', () => {
		expect(pipe.transform('11233334444')).toBe('(11) 2 3333-4444')
	})

	it('should transform 1122223333 value to (11) 2222-3333', () => {
		expect(pipe.transform('1122223333')).toBe('(11) 2222-3333')
	})
})
