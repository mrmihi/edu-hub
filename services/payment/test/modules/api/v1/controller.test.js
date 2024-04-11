import * as httpMocks from 'node-mocks-http';
import * as paymentService from '../../../../src/modules/payments/api/v1/service';
import { default as paymentController } from '../../../../src/modules/payments/api/v1/controller';
import { mockInitiatePaymentRequestBody, mockTransferPaymentRequestBody, mockPaymentIntent } from '../../../__mocks__';

describe('payment-controller-tests', () => {
  const next = jest.fn();
  describe('test-initiate-payment', () => {
    it('01. should initiate payment successfully', () => {
      jest.spyOn(paymentService, 'serviceInitializePayment').mockResolvedValue(true);
      const req = httpMocks.createRequest({
        method: 'post',
        url: '/',
        body: mockInitiatePaymentRequestBody,
      });
      const res = httpMocks.createResponse();
      paymentController(req, res, next);
      expect(res.statusCode).toBe(200);
    });
  });
  describe('test-fetch-payment', () => {
    it('01. should fetch payment successfully', () => {
      jest.spyOn(paymentService, 'serviceRetrievePayment').mockResolvedValue(mockPaymentIntent);
      const req = httpMocks.createRequest({
        method: 'get',
        url: '/pi_3N1Z2KSJ18Jyb28v04h9V4yY',
      });
      const res = httpMocks.createResponse();
      paymentController(req, res, next);
      expect(res.statusCode).toBe(200);
    });
  });
  describe('test-transfer-payment', () => {
    it('01. should transfer payment successfully', () => {
      jest.spyOn(paymentService, 'serviceTransferPayment').mockResolvedValue(true);
      const req = httpMocks.createRequest({
        method: 'post',
        url: '/pi_3N1Z2KSJ18Jyb28v04h9V4yY/transfer',
        body: mockTransferPaymentRequestBody,
      });
      const res = httpMocks.createResponse();
      paymentController(req, res, next);
      expect(res.statusCode).toBe(200);
    });
  });
});
