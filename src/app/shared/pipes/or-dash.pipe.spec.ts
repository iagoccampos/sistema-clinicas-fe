import { OrDashPipe } from './or-dash.pipe'

describe('OrDashPipe', () => {
	const pipe = new OrDashPipe()

	it('should transform falsy value to -', () => {
		expect(pipe.transform('')).toBe('-')
	})

	it('should not transform a truthy value', () => {
		expect(pipe.transform('123456789')).toBe('123456789')
	})
})
