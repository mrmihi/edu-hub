import * as httpMocks from 'node-mocks-http';
import * as dashboardService from '../../../../src/modules/dashboard/api/v1/service';
import { default as dashboardController } from '../../../../src/modules/dashboard/api/v1/controller';
import { mockTotalsResponse } from '../../../__mocks__';

describe('dashboard-controller-tests', () => {
  const next = jest.fn();

  it('01. should get totals successfully', () => {
    jest.spyOn(dashboardService, 'getSystemTotalsSvc').mockResolvedValue(mockTotalsResponse);
    const req = httpMocks.createRequest({
      method: 'get',
      url: '/totals',
    });
    const res = httpMocks.createResponse();
    dashboardController(req, res, next);
    expect(res.statusCode).toBe(200);
  });
});
