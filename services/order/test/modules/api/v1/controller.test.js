import * as httpMocks from 'node-mocks-http';
import * as orderService from '../../../../src/modules/orders/api/v1/service';
import { default as orderController } from '../../../../src/modules/orders/api/v1/controller';
import { mockAddOrderRequestBody } from '../../../__mocks__';

describe('order-controller-tests', () => {
  const next = jest.fn();

  it('01. should add an order successfully', () => {
    jest.spyOn(orderService, 'serviceCreateOrder').mockResolvedValue(true);
    const req = httpMocks.createRequest({
      method: 'post',
      url: '/',
      body: mockAddOrderRequestBody,
    });
    const res = httpMocks.createResponse();
    orderController(req, res, next);
    expect(res.statusCode).toBe(200);
  });
});
