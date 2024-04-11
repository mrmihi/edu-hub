import * as payments from '../../../../src/modules/payments/api/v1/service';
import { mockInitiatePaymentRequestBody, mockTransferPaymentRequestBody, mockCustomer, mockPaymentIntent, mockTransfer } from '../../../__mocks__';

jest.mock('stripe', () => () => ({
  customers: {
    create: () => new Promise((resolve) => resolve(mockCustomer)),
  },
  paymentIntents: {
    create: () => new Promise((resolve) => resolve(mockPaymentIntent)),
    retrieve: () => new Promise((resolve) => resolve(mockPaymentIntent)),
  },
  transfers: {
    create: () => new Promise((resolve) => resolve(mockTransfer)),
  },
}));

describe('payment-service-tests', () => {
  it('01. should create payment intent successfully', () => {
    expect(payments.serviceInitializePayment(mockInitiatePaymentRequestBody)).resolves.toStrictEqual(mockPaymentIntent);
  });
  it('02. should retrieve payment intent successfully', () => {
    expect(payments.serviceRetrievePayment(mockPaymentIntent.id)).resolves.toStrictEqual(mockPaymentIntent);
  });
  it('02. should create payment transfer successfully', () => {
    expect(payments.serviceTransferPayment(mockPaymentIntent.id, mockTransferPaymentRequestBody)).resolves.toStrictEqual(mockTransfer);
  });
});
