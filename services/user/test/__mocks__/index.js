export const mockCreateUserRequestBody = {
  name: 'Sheronie',
  email: 'sheroniperera20@gmail.com',
  mobile: '94765434567',
  address: 'Dehiwala',
};

export const mockGetAllUsersResponse = [
  {
    _id: '640a2ca3088159d428f598a4',
    ...mockCreateUserRequestBody,
  },
];

export const mockGetUserResponse = {
  _id: '640a2ca3088159d428f598a4',
  ...mockCreateUserRequestBody,
};

export const mockUpdateUserRequestBody = {
  name: 'Sheronie Perera',
};
