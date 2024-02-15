import { PaymentMethods } from 'src/app/models/payment.model'
import { PaymentMethodPipe } from './payment-method.pipe'

describe('PaymentMethodPipe', () => {
	const pipe = new PaymentMethodPipe()

	it('should always return a string description', () => {
		expect(pipe.transform(PaymentMethods.Money)).toBe('Dinheiro')
		expect(pipe.transform(PaymentMethods.Debit)).toBe('Débito')
		expect(pipe.transform(PaymentMethods.Credit)).toBe('Crédito')
	})
})
