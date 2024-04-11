import * as httpMocks from 'node-mocks-http';
import { default as orchestratorController } from '../../../src/modules/orchestrator/api/controller';
import { mockLoginRequestBody } from '../../__mocks__';

jest.mock('@sliit-foss/service-connector', () => () => ({
  proxy: jest.fn(),
}));

describe('orchestrator-controller-tests', () => {
  it('01. should login successfully', () => {
    const req = httpMocks.createRequest({
      method: 'post',
      url: '/login',
      body: mockLoginRequestBody,
    });
    const res = httpMocks.createResponse();
    orchestratorController(req, res, jest.fn());
    expect(res.statusCode).toBe(200);
  });
});
