import * as httpMocks from 'node-mocks-http';
import * as authService from '../../../../src/modules/auth/api/v1/service';
import { default as authController } from '../../../../src/modules/auth/api/v1/controller';
import { mockLoginRequestBody } from '../../../__mocks__';

describe('auth-controller-tests', () => {
  const next = jest.fn();

  it('01. should login successfully', () => {
    jest.spyOn(authService, 'serviceLogin').mockResolvedValue(true);
    const req = httpMocks.createRequest({
      method: 'post',
      url: '/login',
      body: mockLoginRequestBody,
    });
    const res = httpMocks.createResponse();
    authController(req, res, next);
    expect(res.statusCode).toBe(200);
  });
});
