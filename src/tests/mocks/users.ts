const token = {
  0: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  1: 'eyJrZXkiOiI4MzgxZjViNS1mNTFmLTQwZjQtOWU3OS0xOWJhMmQ4NjA1N2MiLCJpYXQiOjE2NjU2MDUzNzB9',
  2: '8C6nD3fUIXmIjTbJ_hDYuPApr9jPPebQO8J3pXQO5ag',
};

export const validUserLogin = {
  'email': 'ada.love@hotmail.com',
  'password': 'M2y^f45'
};

export const invalidUserLoginPasswod = {
  'email': 'ada.love@hotmail.com',
  'password': 'M2y^f49'
};

export const invalidUserLoginEmail = {
  'email': 'adalove@hotmail.com',
  'password': 'M2y^f45'
};

export const responseValidLogin = {
  'name': 'Ada Lovelace',
  'token': `${token[0]}.${token[1]}.${token[2]}`,
};

export const user = {
  createdAt: 'Sun Oct 09 2022 09:20:04 GMT-0300 (Brasilia Standard Time)',
  email: 'ada.love@hotmail.com',
  id: '8381f5b5-f51f-40f4-9e79-19ba2d86057c',
  name: 'Ada Lovelace',
  password: '$2b$08$cnX9f4rFQjYEmeIxnsdehu26xPnGi3ifV/tdkeysBsuvD4tqMXrne',
};