import crypto from 'crypto';
import { traced } from '@sliit-foss/functions';
import { createUserInDB, getAllUsers, getUserById, updateUserById, updateMultipleUsers, deleteUserById } from '../../repository';
import { sendEmail } from '../../../../services';
import { hashPasswordIfProvided, handleReviews } from './helpers';
import { constructCredentialEmailPayload } from './mappers';

export const serviceCreateUser = async (user) => {
  let autoGeneratatedPassword;
  if (!user.password) user.password = autoGeneratatedPassword = crypto.randomBytes(20).toString('hex');
  await hashPasswordIfProvided(user);
  return traced(createUserInDB)(user).then((user) => {
    if (user.role === 'admin') {
      // sendEmail(constructCredentialEmailPayload(user.email, user.role, autoGeneratatedPassword));
    }
    return user;
  });
};

export const serviceGetUsers = (filters, sorts, page, limit) => {
  return traced(getAllUsers)({ filters, sorts, page, limit });
};

export const serviceGetUserById = (id) => {
  return traced(getUserById)(id);
};

export const serviceUpdateUserById = async (id, data) => {
  await hashPasswordIfProvided(data);
  traced(handleReviews)(data);
  return traced(updateUserById)(id, data);
};

export const serviceUpdateMultipleUsers = async (filters, data) => {
  await hashPasswordIfProvided(data);
  traced(handleReviews)(data);
  return traced(updateMultipleUsers)(filters, data);
};

export const serviceDeleteUserById = (id) => {
  return traced(deleteUserById)(id);
};
