import * as httpMocks from 'node-mocks-http';
import * as userService from '../../../../src/modules/users/api/v1/service';
import { default as userController } from '../../../../src/modules/users/api/v1/controller';
import { mockCreateUserRequestBody, mockUpdateUserRequestBody, mockGetAllUsersResponse, mockGetUserResponse } from '../../../__mocks__';

describe('user-controller-tests', () => {
  const next = jest.fn();

  it('01. should add a user successfully', () => {
    jest.spyOn(userService, 'serviceCreateUser').mockResolvedValue(mockGetUserResponse);
    const req = httpMocks.createRequest({
      method: 'post',
      url: '/',
      body: mockCreateUserRequestBody,
    });
    const res = httpMocks.createResponse();
    userController(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  it('02. should get all users successfully', () => {
    jest.spyOn(userService, 'serviceGetUsers').mockResolvedValue(mockGetAllUsersResponse);
    const req = httpMocks.createRequest({
      method: 'get',
      url: '/',
    });
    const res = httpMocks.createResponse();
    userController(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  it('03. should get a user successfully', () => {
    jest.spyOn(userService, 'serviceGetUserById').mockResolvedValue(mockGetUserResponse);
    const req = httpMocks.createRequest({
      method: 'get',
      url: `/${mockGetUserResponse._id}`,
    });
    const res = httpMocks.createResponse();
    userController(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  it('04. should update a user successfully', () => {
    jest.spyOn(userService, 'serviceUpdateUserById').mockResolvedValue(mockGetUserResponse);
    const req = httpMocks.createRequest({
      method: 'patch',
      url: `/${mockGetUserResponse._id}`,
      body: mockUpdateUserRequestBody,
    });
    const res = httpMocks.createResponse();
    userController(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  it('05. should update multiple users successfully', () => {
    jest.spyOn(userService, 'serviceUpdateMultipleUsers').mockResolvedValue(true);
    const req = httpMocks.createRequest({
      method: 'patch',
      url: '/',
      body: mockUpdateUserRequestBody,
    });
    const res = httpMocks.createResponse();
    userController(req, res, next);
    expect(res.statusCode).toBe(200);
  });
});
